import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit{
  numberOfWindows:number = 1;
  realChartData: number[] | undefined;
  predictedChartData: number[] | undefined;
  chartLabels: string[] | undefined;

  // Subscriptions to the changes in previous properties
  private simulationGraphSubscription: Subscription | undefined;



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.simulationGraphSubscription = this.dataService.simulationGraphStruct$.subscribe(simulationGraphStruct => {
      console.log('simulationGraphStruct', simulationGraphStruct)
      if (simulationGraphStruct[0].length !== 0 && simulationGraphStruct[1].length !== 0 && simulationGraphStruct[2].length !== 0) {
        this.realChartData = simulationGraphStruct[0];
        this.predictedChartData = simulationGraphStruct[1];
        this.chartLabels = simulationGraphStruct[2];
      }
    });
  }

  ngOnDestroy(): void {
    this.simulationGraphSubscription?.unsubscribe();
  }
}
