import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Diary, DiaryEntry } from '@ydcodecraft/time_travellers_diary_api';

@Component({
  selector: 'app-diary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './diary-card.component.html',
  styleUrl: './diary-card.component.scss'
})
export class DiaryCardComponent implements OnInit{
  // TODO: placeholder, change this to dto soon
  @Input() diaryData!: Diary;
  
  
  ngOnInit(): void {
    console.log(this.diaryData);
  }


  get latestDiaryEntry(): DiaryEntry | null {
    if (this.diaryData.diary_entries?.length === undefined || this.diaryData.diary_entries?.length === null ||this.diaryData.diary_entries?.length === 0){
      return null;
    }
    return this.diaryData.diary_entries[this.diaryData.diary_entries.length- 1];
  }
}


