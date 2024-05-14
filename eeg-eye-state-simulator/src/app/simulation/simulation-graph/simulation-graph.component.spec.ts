import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationGraphComponent } from './simulation-graph.component';

describe('SimulationGraphComponent', () => {
  let component: SimulationGraphComponent;
  let fixture: ComponentFixture<SimulationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimulationGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
