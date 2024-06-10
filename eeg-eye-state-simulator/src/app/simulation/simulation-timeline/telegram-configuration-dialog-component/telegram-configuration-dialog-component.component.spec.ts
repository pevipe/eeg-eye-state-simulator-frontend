import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramConfigurationDialogComponentComponent } from './telegram-configuration-dialog-component.component';

describe('TelegramConfigurationDialogComponentComponent', () => {
  let component: TelegramConfigurationDialogComponentComponent;
  let fixture: ComponentFixture<TelegramConfigurationDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelegramConfigurationDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelegramConfigurationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
