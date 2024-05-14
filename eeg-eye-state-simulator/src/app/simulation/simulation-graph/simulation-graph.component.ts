import { Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { DataService } from '../../data.service';
import { ClassifiersApiService } from '../../classifiers-api.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-simulation-graph',
  templateUrl: './simulation-graph.component.html',
  styleUrl: './simulation-graph.component.scss'
})
export class SimulationGraphComponent implements OnChanges{
  isBrowser: boolean;
  showGraph = false;

  //Graph variables
  public lineChartLegend = false;
  // public barChartPlugins = [];

  // Graph data
  @Input() realChartDataset: any;
  @Input() predictedChartDataset: any;
  @Input() chartLabels: any;

  // Chart initialization
  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      y: { max: 1.2,  },  
    },
    maintainAspectRatio: false
  };

  public realChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      // { data: this.graphData }, //TODO: poner en función de los datos
      data: [],
      stepped: true
    }]
  };
    
  public predictedChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      // { data: this.graphData }, //TODO: poner en función de los datos
      data: [],
      stepped: true
    }]
  };
  
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private dataService: DataService,
              private classifiersApiService: ClassifiersApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.realChartDataset && this.predictedChartDataset && this.chartLabels){
      if (this.realChartDataset.length !== 0 && this.predictedChartDataset.length !== 0 && this.chartLabels.length !== 0){

        this.updateCharts();
        this.showGraph = true;
      }
    }
  }

  updateCharts(){
    this.realChartData = {
      datasets: [{
        data: this.realChartDataset,
        stepped: true
      }],
      labels: this.chartLabels
    }
    this.predictedChartData = {
      datasets: [{
        data: this.predictedChartDataset,
        stepped: true
      }],
      labels: this.chartLabels
    }

  }

}
