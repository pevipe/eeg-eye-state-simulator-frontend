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
  buttonsDisabled = true;

  customParamsAvailable = false;
  checkedCustomParams = false;
  optimizing = false;


  constructor(private classifiersService: ClassifiersApiService, 
              private dataService: DataService) { }
  ngOnInit(): void {
    this.updateCheckboxEnabling();
    this.updateButtonsEnabling();

    this.selectedSubjectSubscription = this.dataService.selectedSubject$.subscribe(subject => {
      this.selectedSubject = subject;
      this.updateCheckboxEnabling();
      this.updateButtonsEnabling();
    });

    this.selectedWindowSubscription = this.dataService.selectedWindow$.subscribe(window => {
      this.selectedWindow = window;
      this.updateCheckboxEnabling();
    });

    this.selectedTrainSizeSubscription = this.dataService.selectedTrainSize$.subscribe(trainSize => {
      this.selectedTrainSize = trainSize;
    });
  }
  ngOnDestroy(): void {
    // Free subscriptions
    this.selectedSubjectSubscription?.unsubscribe();
    this.selectedWindowSubscription?.unsubscribe();
    this.selectedTrainSizeSubscription?.unsubscribe();
  }

  updateCheckboxEnabling(): void{
    const subject = this.selectedSubject ?? '';
    const window = this.selectedWindow ?? 10;
    this.classifiersService.isOptimized(subject, this.selectedAlgorithm, window).subscribe(data =>{
      this.customParamsAvailable = data;
    });
  }

  updateButtonsEnabling(): void{
    this.buttonsDisabled = (this.selectedSubject == "" || this.selectedAlgorithm == "");
  }

  onAlgorithmSelected(algorithm: string): void {
    this.selectedAlgorithm = algorithm;
    this.updateCheckboxEnabling();
    this.updateButtonsEnabling();
  }

  onOptimizeClicked(): void {
    this.buttonsDisabled = true;
    this.optimizing = true;
    this.classifiersService.optimize(this.selectedSubject ?? '', this.selectedAlgorithm, this.selectedWindow ?? 10).subscribe(data => {
      console.log(data);
      this.buttonsDisabled = false;
      this.optimizing = false;
      this.updateCheckboxEnabling();
    });
  }

  onTrainClicked(): void{
    console.log("Train clicked")
    this.buttonsDisabled = true;
    this.customParamsAvailable = false;
    this.classifiersService.train(this.selectedSubject ?? '', this.selectedAlgorithm, this.selectedWindow ?? 10, 
                                  this.selectedTrainSize ?? 80, this.checkedCustomParams).subscribe(data => {
      console.log(data);
      this.dataService.updateGraphData([data.precision_opened, data.precision_closed, data.accuracy])
      this.buttonsDisabled = false;
      this.updateCheckboxEnabling();
      let newList: string[] = [];
      for (let i = 0; i < data.predicted_tags_in_test.length; i++) {
        newList.push((i*2).toString());
      }
      this.dataService.updateSimulationGraphData(data.real_tags_in_test, data.predicted_tags_in_test, newList);
    });
  }
}
