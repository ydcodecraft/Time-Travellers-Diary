import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-diary-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './diary-card.component.html',
  styleUrl: './diary-card.component.scss'
})
export class DiaryCardComponent {
  @Input() cardTitle: string = '';
  @Input() cardSubtitle: string = '';

}
