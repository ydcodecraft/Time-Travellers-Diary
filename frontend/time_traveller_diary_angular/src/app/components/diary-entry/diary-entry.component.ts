import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
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
      date: ['', Validators.required],
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
      this.form.get('date')?.setValue(this.diaryData.date, { emitEvent: false });
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
    console.log(emptyDiaryEntry);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.diaryEntriesFormArray);

    if (this.diaryEntriesFormArray.dirty){
        // if a diary does not have an id, then it's a newly created entry. Create it
        if (this.form.get('id')?.value === '') {
        // leave diary_entries null for now
        // insert all diary entries later
        // we can also create all diary entries and issue a single http request
        const newDiary: DiaryCreate = {
          date: this.form.get('date')?.value,
          diary_entries: null
        };
        this.diaryService.diaryCreate(newDiary);
      }
        // if a diary has an id, then it's an existing entry. Update it
        else {
        const updatedDiary: PatchedDiary = {
          date: this.form.get('date')?.value
        }

        this.diaryService.diaryPartialUpdate(this.form.get('id')?.value, updatedDiary).subscribe({
          next: (result) => { console.log(result);},
          error: (err) => {
            this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
            console.error(err);
          }
        });
      }
        
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
                console.log(result);
                this.dialogRef.close('refresh');
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
            console.log(entryForm.get('id')?.value);
            console.log(updatedDiaryEntry);
            this.diaryEntryService.diaryEntryPartialUpdate(entryForm.get('id')?.value, updatedDiaryEntry).subscribe({
              next: (result) => { 
                this.dialogRef.close('refresh');
                console.log(result);
              },
              error: (err) => {
                this.snackBar.open("Oops, we have some issue saving your adventure! Please try again later!", "I'll Try Again Later!");
                console.error(err);
              }
            })
          }
          console.log(entryForm);
        }
      }
    }
  }
}
