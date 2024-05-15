import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationTimelineComponent } from './simulation-timeline.component';

describe('SimulationTimelineComponent', () => {
  let component: SimulationTimelineComponent;
  let fixture: ComponentFixture<SimulationTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimulationTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
