import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
export class SimulationGraphComponent {
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


}
