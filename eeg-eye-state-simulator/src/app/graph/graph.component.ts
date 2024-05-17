import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DataService } from '../data.service';
import { ClassifiersApiService } from '../classifiers-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit{
  //Control variables
  isBrowser: boolean;
  showGraph = false;

  //Graph variables
  public barChartLegend = false;
  public barChartPlugins = [];

  // Graph data
  graphData: [number, number, number] = [-1, -1, -1];
  private graphDataSubscription: Subscription | undefined;

  // Chart initialization
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Opened', 'Closed', 'Total' ],
    datasets: [
      { data: this.graphData },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: false, max: 1, min: .50,  },  //TODO: poner en función de los datos
    },
  };


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private dataService: DataService,
              private classifiersApiService: ClassifiersApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.graphDataSubscription = this.dataService.graphData$.subscribe(graphData => {
      if (graphData[0] != -1 && graphData[1] != -1 && graphData[2] != -1) {
        this.graphData = graphData;
        this.updateChart();
        this.showGraph = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.graphDataSubscription?.unsubscribe();
  }

  updateChart() {
    this.barChartData = {
      labels: [ 'Opened', 'Closed', 'Total' ],
      datasets: [
        { data: this.graphData,
          backgroundColor: [ 'rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)', 'rgba(255, 206, 86, 0.4)' ],
          borderColor: [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)' ],
         },
      ]
    }
  }

}
