import { Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1.5,
        backgroundColor:'rgba(99, 255, 198, 0.2)',
        borderColor: 'rgba(99, 255, 198, 1)',
      }
    }
  };

  public realChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      stepped: true
    }]
  };
    
  public predictedChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      stepped: true
    }]
  };
  
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
        stepped: true,
        borderColor: 'rgba(99, 255, 198, 1)',
      }],
      labels: this.chartLabels
    }
    this.predictedChartData = {
      datasets: [{
        data: this.predictedChartDataset,
        stepped: true,
        borderColor: 'rgba(245, 169, 71, 1)',
      }],
      labels: this.chartLabels
    }

  }

}
