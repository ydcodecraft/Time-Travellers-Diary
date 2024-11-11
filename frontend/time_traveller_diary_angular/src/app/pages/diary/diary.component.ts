import { Component, OnInit } from '@angular/core';
import { DiaryCardComponent } from '../../components/diary-card/diary-card.component';
import { CommonModule } from '@angular/common';
import { DiaryEntryComponent } from '../../components/diary-entry/diary-entry.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DiaryService, Diary } from '@ydcodecraft/time_travellers_diary_api';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, DiaryCardComponent, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit{
  public diaryData: Diary[] = [];


  constructor(
    public dialog: MatDialog,
    public diaryService: DiaryService
  ) {}


  ngOnInit(): void {
    this.fetchDiaries();
  }

  // return a list of diary dtos
  private fetchDiaries(): void {
    this.diaryService.diaryList().subscribe((diaryData) => {
      this.diaryData = diaryData;
    })

    
  }

  public openDiaryEntry(diaryEntry: any) {
    const dialogRef = this.dialog.open(DiaryEntryComponent, {
      data: diaryEntry,
      minWidth: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      if (result === 'refresh') {
        this.fetchDiaries();
      }
    });
  }
}
