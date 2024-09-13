/* Copyright 2024 Pelayo Vieites Pérez
 * 
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * 
 */

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
