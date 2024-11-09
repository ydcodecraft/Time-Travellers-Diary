import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatIconModule],
  templateUrl: './diary-entry.component.html',
  styleUrl: './diary-entry.component.scss'
})
export class DiaryEntryComponent implements OnInit{
  private readonly dialogRef = inject(MatDialogRef<DiaryEntryComponent>)
  public form: FormGroup;
  public timePeriodSelection: any;
  public moodSelection: any;
  
  // placeholder for now
  public timePeriods: any;
  public moods: any;

  constructor(
    // TODO: update the diaryData to the actual object type
    @Inject(MAT_DIALOG_DATA) public diaryData: any,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      diaryEntries: this.formBuilder.array([
        this.formBuilder.group({
          timePeriod: ['', Validators.required],
          mood: ['', Validators.required],
          description : ['', Validators.required],
        })
      ])
    })
  }

  // helper function to access diaryEntries quickly
  get diaryEntries(): FormArray {
    return this.form.get('diaryEntries') as FormArray;
  }

  ngOnInit(): void {
    this.form.get('date')?.setValue(this.diaryData.date);
    console.log(this.diaryEntries);
    // if (!this.diaryData) {
    //   this.addDiaryEntry();
    // }
  }

  addDiaryEntry(): void {
    const emptyDiaryEntry = this.formBuilder.group({
      timePeriod: ['', Validators.required],
      mood: ['', Validators.required],
      description : ['', Validators.required],
    });

    this.diaryEntries.push(emptyDiaryEntry);

  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    throw('not implemented yet')
  }
}
