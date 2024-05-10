import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSetSliderComponent } from './training-set-slider.component';

describe('TrainingSetSliderComponent', () => {
  let component: TrainingSetSliderComponent;
  let fixture: ComponentFixture<TrainingSetSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingSetSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingSetSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
