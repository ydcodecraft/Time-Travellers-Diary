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
            timePeriod: "Morning",
            description: "Spent the morning at the beach with friends. The weather was perfect!",
            mood: "happy"
          },
          {
            timePeriod: "Afternoon",
            description: "Had lunch at a beachside cafe. Delicious seafood!",
            mood: "satisfied"
          }
        ]
      },
      {
        id: 2,
        date: "2024-06-16",
        entries: [
          {
            timePeriod: "Evening",
            description: "Tried cooking a new pasta recipe. It was a success!",
            mood: "satisfied"
          }
        ]
      },
      {
        id: 3,
        date: "2024-06-17",
        entries: [
          {
            timePeriod: "All Day",
            description: "It rained all day today. I stayed in and read a book.",
            mood: "reflective"
          }
        ]
      },
      {
        id: 4,
        date: "2024-06-18",
        entries: [
          {
            timePeriod: "Morning",
            description: "Completed my workout goals at the gym.",
            mood: "motivated"
          }
        ]
      },
      {
        id: 5,
        date: "2024-06-19",
        entries: [
          {
            timePeriod: "Evening",
            description: "Watched a movie with my family. We laughed so much!",
            mood: "joyful"
          }
        ]
      },
      {
        id: 6,
        date: "2024-06-20",
        entries: [
          {
            timePeriod: "Weekend",
            description: "Went for a weekend getaway to the mountains.",
            mood: "content"
          }
        ]
      },
      {
        id: 7,
        date: "2024-06-21",
        entries: [
          {
            timePeriod: "Afternoon",
            description: "Felt anxious about an upcoming presentation.",
            mood: "anxious"
          }
        ]
      },
      {
        id: 8,
        date: "2024-06-22",
        entries: [
          {
            timePeriod: "Evening",
            description: "Had a deep conversation with a friend.",
            mood: "grateful"
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
      data: diaryEntry
    });
  }
}
