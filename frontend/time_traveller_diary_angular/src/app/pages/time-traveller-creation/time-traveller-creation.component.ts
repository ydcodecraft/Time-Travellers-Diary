import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { TimeTravellerService, TimeTravellerCreate } from '@ydcodecraft/time_travellers_diary_api';

@Component({
  selector: 'app-time-traveller-creation',
  standalone: true,
  imports: [ MatStepperModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './time-traveller-creation.component.html',
  styleUrl: './time-traveller-creation.component.scss'
})
export class TimeTravellerCreationComponent {
  private formBuilder = inject(FormBuilder);
  
  constructor(
    private timeTravellerService: TimeTravellerService,
    private router: Router
  ) {}

  bioFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(8), Validators.max(120)]]
  });

  


  onSubmit():void {
    // create new time traveller on form submission
    const timeTraveller: TimeTravellerCreate = {
      character_name: this.bioFormGroup.get('name')?.value ?? `adventure-${Math.floor(Math.random() * 999999)}`,
      age: Number(this.bioFormGroup.get('age')?.value) ?? Math.floor(Math.random() * 99)
    }
    this.timeTravellerService.timeTravellerCreate(timeTraveller).subscribe({
      next: (result) => {
        this.router.navigate(['/diary-dashboard']);
      },
      error: (err) => {
        
        console.error(err);
      }
    });
  }
}
