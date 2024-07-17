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
