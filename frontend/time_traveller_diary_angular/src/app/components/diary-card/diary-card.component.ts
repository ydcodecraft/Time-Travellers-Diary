import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-diary-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './diary-card.component.html',
  styleUrl: './diary-card.component.scss'
})
export class DiaryCardComponent implements OnInit{
  // TODO: placeholder, change this to dto soon
  @Input() diaryData: any;
  
  
  ngOnInit(): void {
    console.log(this.diaryData);
  }
}


