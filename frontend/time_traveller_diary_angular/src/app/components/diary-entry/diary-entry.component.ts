import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DiaryService, TimePeriodService, TimePeriod, MoodService, Mood, Diary, DiaryEntryService, DiaryEntryUpdateCreate, DiaryEntry, PatchedDiary, DiaryCreate, PatchedDiaryEntryUpdateCreate } from '@ydcodecraft/time_travellers_diary_api'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, 
    MatNativeDateModule, MatInputModule, MatSelectModule, MatIconModule, MatSnackBarModule],
  templateUrl: './diary-entry.component.html',
  styleUrl: './diary-entry.component.scss'
})
export class DiaryEntryComponent implements OnInit{
  


  private readonly dialogRef = inject(MatDialogRef<DiaryEntryComponent>);
  private readonly snackBar = inject(MatSnackBar);

  public form: FormGroup;

  public timePeriods: TimePeriod[] = [];
  public moods: Mood[] = [];

  constructor(
    // TODO: update the diaryData to the actual object type
    @Inject(MAT_DIALOG_DATA) public diaryData: Diary,
    private formBuilder: FormBuilder,
    private diaryService: DiaryService,
    private diaryEntryService: DiaryEntryService,
    private timePeriodService: TimePeriodService,
    private moodService: MoodService) {
    this.form = this.formBuilder.group({
      id: [''],
      date: ['', [ Validators.required, this.dateFormatValidator() ]],
      diaryEntries: this.formBuilder.array([])
    })
  }
  
  // helper function to access diaryEntries quickly
  get diaryEntriesFormArray(): FormArray {
    return this.form.get('diaryEntries') as FormArray;
  }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData(): void{

    this.loadDropdownSelectionData();
    this.loadDiaryEntryFormData();

  }
  
  // load dropdown/ selection option data
  private loadDropdownSelectionData(): void {
    // load time period listing
    this.timePeriodService.timePeriodList().subscribe((timePeriods) => {
      this.timePeriods = timePeriods;
    })

    // load mood listing
    this.moodService.moodList().subscribe((moods) => {
      this.moods = moods;
    })
  }

  // load the input data and map them to the ag form
  // dynamically generate any component if needed
  private loadDiaryEntryFormData(): void {
    if (this.diaryData?.id) {
      this.form.get('id')?.setValue(this.diaryData.id , { emitEvent: false });
    }
    if (this.diaryData?.date) {
      const date = new Date(this.parseLocalTime(this.diaryData.date));
      this.form.get('date')?.setValue(date, { emitEvent: false });
    }
    // becasue a diary can contain multiple diary entries
    // iterate through the diary entries array and generate n number of diary entry formGroup
    // then add each diary entry formGroup to the formArray
    
    if (this.diaryData?.diary_entries) {
      for (let entry of this.diaryData?.diary_entries) {
        const entryFormGroup = this.formBuilder.group({
          id: [entry.id, Validators.required],
          time_period: [entry.time_period?.id, Validators.required],
          mood: [entry.mood?.id, Validators.required],
          description : [entry.description, Validators.required],
        });

        this.diaryEntriesFormArray?.push(entryFormGroup);
      }
    }
    else {
      this.addDiaryEntry();
    }
  }

  
  // helper function to add an empty diary entry
  addDiaryEntry(): void {
    const emptyDiaryEntry = this.formBuilder.group({
      id: [''],
      time_period: ['', Validators.required],
      mood: ['', Validators.required],
      description : ['', Validators.required],
    });
    this.diaryEntriesFormArray.push(emptyDiaryEntry);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.dirty){
      // if a diary does not have an id, then it's a newly created entry. Create it
      if (this.form.get('id')?.value === '') {
        // leave diary_entries null for now
        // insert all diary entries later
        // we can also create all diary entries and issue a single http request
        this.createDiary();
      }
      // if a diary has an id, then it's an existing entry. Update it
      else {
        this.updateDiary();
      }
        
      
    }
  }

  private createDiary(): void{
    // create diary
    const newDiary: DiaryCreate = {
      date: this.convertToShortDateFormat(this.form.get('date')?.value),
    };
    this.diaryService.diaryCreate(newDiary).subscribe({
      next: (result) => {
        // once diary is created, pull the id from the response body
        // use the diary id to create diary entries
        for (let entryForm of this.diaryEntriesFormArray.controls) {
          const newDiaryEntry: DiaryEntryUpdateCreate = {
            diary: result.id,
            description: entryForm.get('description')?.value,
            mood: entryForm.get('mood')?.value,
            time_period: entryForm.get('time_period')?.value
          };
          this.diaryEntryService.diaryEntryCreate(newDiaryEntry).subscribe({
            next: (result) => { 
              this.dialogRef.close('refresh');
            },
            error: (err) => {
              this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
              console.error(err);
            }
          });
        }
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
      }
    }); 
  }


  private updateDiary(): void{
    // iterate through all the diary entries and check if they are dirty and valid
    // submit any dirty diary entries
    for (let entryForm of this.diaryEntriesFormArray.controls) {
      if (entryForm.dirty) {
        // if a diary entry does not have an id, then it's a newly created entry. Create it
        if (entryForm.get('id')?.value === "") {
          const newDiaryEntry: DiaryEntryUpdateCreate = {
            diary: this.form.get('id')?.value,
            description: entryForm.get('description')?.value,
            mood: entryForm.get('mood')?.value,
            time_period: entryForm.get('time_period')?.value
          };

          this.diaryEntryService.diaryEntryCreate(newDiaryEntry).subscribe({
            next: (result) => { 
            },
            error: (err) => {
              this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
              console.error(err);
            }
          });
        }
        // if a diary entry has an id, then it's an existing entry. Update it
        else {
          const updatedDiaryEntry: PatchedDiaryEntryUpdateCreate = {
            description: entryForm.get('description')?.value,
            mood: entryForm.get('mood')?.value,
            time_period: entryForm.get('time_period')?.value
          };

          this.diaryEntryService.diaryEntryPartialUpdate(entryForm.get('id')?.value, updatedDiaryEntry).subscribe({
            next: (result) => { 
            },
            error: (err) => {
              this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
              console.error(err);
            }
          })
        }
      }
    }

    // update diary object
    const updatedDiary: PatchedDiary = {
      date: this.convertToShortDateFormat(this.form.get('date')?.value)
    }

    this.diaryService.diaryPartialUpdate(this.form.get('id')?.value, updatedDiary).subscribe({
      next: (result) => { 
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
        console.error(err);
      }
    });
  }


  // convert date from YYYY-MM-DDThh:mm:ss.msZ to YYYY-MM-DD for API
  private convertToShortDateFormat(date: string): string {
    if (!date) {
      return '';
    }
    
    const formattedDate = new Date(date).toISOString().split('T')[0];

    return formattedDate;
  }

  // convert string into an Date object in local time
  private parseLocalTime(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    let localDate =  new Date(year, month - 1);
    localDate.setDate(day);

    return localDate;
  }

  dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === undefined) {
        return { invalidDateFormat: true };
      }
      const valueDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (valueDate > today) {
        return { dateGreaterThanToday: true };
      }

      return null;
    }
  }
}
