import { Component } from '@angular/core';
import { ClassifiersApiService } from '../classifiers-api.service';
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

  constructor(private classifiersService: ClassifiersApiService, 
    private dataService: DataService) { }

  onSliderChange(event:any) : void{
    this.dataService.updateTrainSize(event.target.value);
  }
}
