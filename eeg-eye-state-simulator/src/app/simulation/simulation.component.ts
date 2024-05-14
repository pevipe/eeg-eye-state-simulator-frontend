import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  minNumberOfWindows:number = 1;
  maxNumberOfWindows:number = 10;
  numberOfWindows:number = 1;
  realChartData: number[] | undefined;
  predictedChartData: number[] | undefined;
  predictedDataFromAPi: number[] | undefined;
  chartLabels: string[] | undefined;

  // Subscriptions to the changes in previous properties
  private simulationGraphSubscription: Subscription | undefined;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.simulationGraphSubscription = this.dataService.simulationGraphStruct$.subscribe(simulationGraphStruct => {
      if (simulationGraphStruct[0].length !== 0 && simulationGraphStruct[1].length !== 0 && simulationGraphStruct[2].length !== 0) {
        this.realChartData = simulationGraphStruct[0];
        this.predictedDataFromAPi = simulationGraphStruct[1];
        this.updatePredictedDataWithWindow(this.predictedDataFromAPi);  // Update predictedChartData
        this.chartLabels = simulationGraphStruct[2];
      }
    });
  }

  ngOnDestroy(): void {
    this.simulationGraphSubscription?.unsubscribe();
  }

  onNumberOfWindowsChange(newValue: number): void {
    this.updatePredictedDataWithWindow(this.predictedDataFromAPi ?? []);
  }

  updatePredictedDataWithWindow(predictedData: number[]): void {
    if (this.numberOfWindows < this.minNumberOfWindows || this.numberOfWindows > this.maxNumberOfWindows) {
      console.log('The number of windows is out of range');
      this.numberOfWindows = 1;
      return;
    }
    
    var changing = false;
    var changingCount = 0;
    var temporalList = [predictedData[0]];
    // Start at second window
    for (let i = 1; i < predictedData.length; i++) {
      if (changing){
        if (predictedData[i-1] === predictedData[i]){
          changingCount++;
          if (changingCount === this.numberOfWindows){
            // If the number of windows is reached, the value is changed
            changing = false;
            changingCount = 0;
            temporalList.push(predictedData[i]);
          }
          else{
            // Otherwise, the value is still the same as the previous one
            temporalList[i] = temporalList[i-1];
          }
        }
        else{
          // Cancel change, keep previous value and restart count
          changingCount = 0;
          changing = false;
          temporalList.push(temporalList[i-1]);
        }
      }
      else{
        if (predictedData[i-1] !== predictedData[i]){
          changing = true;
          changingCount++;
          if(changingCount === this.numberOfWindows){
            changing = false;
            changingCount = 0;
            temporalList.push(predictedData[i]);
          }
          else{
            temporalList.push(temporalList[i-1]);
          }  
        }
        else{
          temporalList.push(temporalList[i-1]);
        }
      }
    }
    this.predictedChartData = temporalList;
  }
}
