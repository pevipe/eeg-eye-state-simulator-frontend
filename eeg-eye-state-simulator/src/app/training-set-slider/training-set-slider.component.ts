/* Copyright 2024 Pelayo Vieites Pérez
 * 
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * 
 */

import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-training-set-slider',
  templateUrl: './training-set-slider.component.html',
  styleUrl: './training-set-slider.component.scss'
})
export class TrainingSetSliderComponent {
  max=80;
  min=20;
  step=10;
  thumbLabel=true;
  showTicks=true;
  value:number=70;

  constructor(private dataService: DataService) { }

  onSliderChange(event:any) : void{
    this.dataService.updateTrainSize(event.target.value);
  }
}
