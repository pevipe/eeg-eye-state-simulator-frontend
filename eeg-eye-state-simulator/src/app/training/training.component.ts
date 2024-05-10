import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassifiersApiService } from '../classifiers-api.service';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit, OnDestroy{
  // Properties from SubjectComponent
  selectedSubject: string | undefined;
  selectedWindow: number | undefined;

  //Property from TrainingSetComponent
  selectedTrainSize: number | undefined;

  // Subscriptions to the changes in previous properties
  private selectedSubjectSubscription: Subscription | undefined;
  private selectedWindowSubscription: Subscription | undefined;
  private selectedTrainSizeSubscription: Subscription | undefined;
  

  // Selector of the algorithm
  algorithm_list: string[] = [
    "AdaBoost",
    "Decision Tree",
    "k-Nearest Neighbors",
    "Linear Discriminant Analysis",
    "Random Forest",
    "Quadratic Discriminant Analysis",
    "Support Vector Machine"
  ];
  algorithmDefaultText = "Select an algorithm...";
  selectedAlgorithm = "";

  customParamsAvailable = false;
  checkedCustomParams = false;


  constructor(private classifiersService: ClassifiersApiService, 
              private dataService: DataService) { }
  ngOnInit(): void {
    this.updateCheckboxEnabling();

    this.selectedSubjectSubscription = this.dataService.selectedSubject$.subscribe(subject => {
      this.selectedSubject = subject;
      this.updateCheckboxEnabling();
    });

    this.selectedWindowSubscription = this.dataService.selectedWindow$.subscribe(window => {
      this.selectedWindow = window;
      this.updateCheckboxEnabling();
    });

    this.selectedTrainSizeSubscription = this.dataService.selectedTrainSize$.subscribe(trainSize => {
      this.selectedTrainSize = trainSize;
      console.log("CHANGING SELECTED TRAIN SET SIZE TO: " + trainSize + "%");
    });
  }
  ngOnDestroy(): void {
    // Free subscriptions
    this.selectedSubjectSubscription?.unsubscribe();
    this.selectedWindowSubscription?.unsubscribe();
  }

  updateCheckboxEnabling(): void{
    const subject = this.selectedSubject ?? '';
    const window = this.selectedWindow ?? 10;
    this.classifiersService.isOptimized(subject, this.selectedAlgorithm, window).subscribe(data =>{
      this.customParamsAvailable = data;
    });
  }

  onAlgorithmSelected(algorithm: string): void {
    this.selectedAlgorithm = algorithm;
    this.updateCheckboxEnabling();
  }

  onCheckboxClicked(): void{

  }
}
