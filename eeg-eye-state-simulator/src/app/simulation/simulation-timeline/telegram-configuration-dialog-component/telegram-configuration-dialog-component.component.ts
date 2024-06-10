import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-telegram-configuration-dialog-component',
  templateUrl: './telegram-configuration-dialog-component.component.html',
  styleUrl: './telegram-configuration-dialog-component.component.scss'
})
export class TelegramConfigurationDialogComponentComponent {
  constructor(public dialogRef: MatDialogRef<TelegramConfigurationDialogComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  onCancel(): void {
    this.dialogRef.close();
  }
}
