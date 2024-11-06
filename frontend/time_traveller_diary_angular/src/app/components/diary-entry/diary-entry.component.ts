import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './diary-entry.component.html',
  styleUrl: './diary-entry.component.scss'
})
export class DiaryEntryComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  onClose() {
    this.closePopup.emit();
  }
}
