import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTravellerCreationComponent } from './time-traveller-creation.component';

describe('TimeTravellerCreationComponent', () => {
  let component: TimeTravellerCreationComponent;
  let fixture: ComponentFixture<TimeTravellerCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTravellerCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTravellerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
