import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './diary-entry.component.html',
  styleUrl: './diary-entry.component.scss'
})
export class DiaryEntryComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public diaryData: any,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      diaryEntries: this.formBuilder.array([])
    })
  }
  
  ngOnInit(): void {

  }

  public addDiaryEntry(): void {
    const entry = this.formBuilder.group({
      timePeriod: ['', Validators.required],
      mood: ['', Validators.required],
      description : ['', Validators.required],      
    })
  }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    throw('not implemented yet')
  }
}
