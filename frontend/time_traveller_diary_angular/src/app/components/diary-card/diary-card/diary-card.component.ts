import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-diary-card',
  standalone: true,
  imports: [MatCardModule],
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


