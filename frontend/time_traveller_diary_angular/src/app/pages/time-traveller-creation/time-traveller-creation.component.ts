import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-time-traveller-creation',
  standalone: true,
  imports: [ MatStepperModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './time-traveller-creation.component.html',
  styleUrl: './time-traveller-creation.component.scss'
})
export class TimeTravellerCreationComponent {
  private formBuilder = inject(FormBuilder);
  
  bioFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    age: ['', Validators.required]
  });
}
