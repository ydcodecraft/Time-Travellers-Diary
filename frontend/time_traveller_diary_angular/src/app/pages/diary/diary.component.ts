import { Component, OnInit } from '@angular/core';
import { DiaryCardComponent } from '../../components/diary-card/diary-card.component';
import { CommonModule } from '@angular/common';
import { DiaryEntryComponent } from '../../components/diary-entry/diary-entry.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, DiaryCardComponent, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit{
  constructor(
    public dialog: MatDialog
  ) {}

  public diaryData: any;
  

  ngOnInit(): void {
    const mockDiaryData = [
      {
        id: 1,
        date: "2024-06-15",
        entries: [
          {
            timePeriod: { id: 1, value: "Morning" },
            description: "Spent the morning at the beach with friends. The weather was perfect!",
            mood: { id: 1, value: "happy" }
          },
          {
            timePeriod: { id: 2, value: "Afternoon" },
            description: "Had lunch at a beachside cafe. Delicious seafood!",
            mood: { id: 2, value: "satisfied" }
          }
        ]
      },
      {
        id: 2,
        date: "2024-06-16",
        entries: [
          {
            timePeriod: { id: 3, value: "Evening" },
            description: "Tried cooking a new pasta recipe. It was a success!",
            mood: { id: 2, value: "satisfied" }
          }
        ]
      },
      {
        id: 3,
        date: "2024-06-17",
        entries: [
          {
            timePeriod: { id: 4, value: "All Day" },
            description: "It rained all day today. I stayed in and read a book.",
            mood: { id: 3, value: "reflective" }
          }
        ]
      },
      {
        id: 4,
        date: "2024-06-18",
        entries: [
          {
            timePeriod: { id: 1, value: "Morning" },
            description: "Completed my workout goals at the gym.",
            mood: { id: 4, value: "motivated" }
          }
        ]
      },
      {
        id: 5,
        date: "2024-06-19",
        entries: [
          {
            timePeriod: { id: 3, value: "Evening" },
            description: "Watched a movie with my family. We laughed so much!",
            mood: { id: 5, value: "joyful" }
          }
        ]
      },
      {
        id: 6,
        date: "2024-06-20",
        entries: [
          {
            timePeriod: { id: 5, value: "Weekend" },
            description: "Went for a weekend getaway to the mountains.",
            mood: { id: 6, value: "content" }
          }
        ]
      },
      {
        id: 7,
        date: "2024-06-21",
        entries: [
          {
            timePeriod: { id: 2, value: "Afternoon" },
            description: "Felt anxious about an upcoming presentation.",
            mood: { id: 7, value: "anxious" }
          }
        ]
      },
      {
        id: 8,
        date: "2024-06-22",
        entries: [
          {
            timePeriod: { id: 3, value: "Evening" },
            description: "Had a deep conversation with a friend.",
            mood: { id: 8, value: "grateful" }
          }
        ]
      }
    ];
    
    this.diaryData = mockDiaryData;


  }

  // return a list of diary dtos
  private fetchDiaries(): void {
    throw("not implemented")
  }

  public openDiaryEntry(diaryEntry: any) {
    const dialogRef = this.dialog.open(DiaryEntryComponent, {
      data: diaryEntry,
      minWidth: '60vw',
    });
  }
}
