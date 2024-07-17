import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-telegram-configuration-dialog',
  templateUrl: './telegram-configuration-dialog.component.html',
  styleUrl: './telegram-configuration-dialog.component.scss'
})

export class TelegramConfigurationDialogComponent {
  constructor(public dialogRef: MatDialogRef<TelegramConfigurationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  onCancel(): void {
    this.dialogRef.close();
  }
  
}
