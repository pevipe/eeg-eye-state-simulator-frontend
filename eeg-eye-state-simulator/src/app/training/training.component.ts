import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ClassifiersApiService } from '../classifiers-api.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {
  // Selector of an existent subject
  algorithm_list: string[] = [
    "AdaBoost",
    "Decision Tree",
    "k-Nearest Neighbors",
    "Linear Discriminant Analysis",
    "Random Forest",
    "Quadratic Discriminant Analysis",
    "Support Vector Machine"
  ];
  subjectDefaultText = "Select loaded subject...";
  selectedAlgorithm = "";

  customParamsUnav=false;
  checkedCustomParams = false;


  // File uploader
  fileName = '';
  requiredFileType = '.csv';

  //Window selector
  windowDefaultText = "Select a time window (default 10s)";
  windowList: string[] = ["10s with 8s overlap", "8s with 5s overlap", "5s with 3s overlap"];
  selectedWindow = "";

  constructor(private classifiersService: ClassifiersApiService) { }
  ngOnInit(): void {
    
  }
  // ngOnInit(): void {
  //   this.classifiersService.getUploadedSubjects().subscribe(subject_list => {
  //     this.subject_list = subject_list;
  //   });
  // }

  onAlgorithmSelected(algorithm: string): void {
    this.selectedAlgorithm = algorithm;
  }

  onFileSelected(event: any): void {
    const file:File = event.target.files[0];
    if (file){
      this.fileName = file.name;

      const formData = new FormData();
      formData.append("thumbnail", file);

      this.classifiersService.uploadSubject(file.name, formData).subscribe();
    }
  }

  onWindowSelected(window: string): void {
    this.selectedWindow = window;
  }

  onLoadClicked(): void {
    console.log("Loaded");  //TODO: replace with API call
    var selectedWindow = null;

    // If window is null -> no window is selected
    if (this.selectedWindow == null) {
      console.log("No selected window");
      return;
    }

    if (this.selectedWindow == this.windowList[0]) {
      selectedWindow = 10;
    }
    else if (this.selectedWindow == this.windowList[1]) {
      selectedWindow = 8;
    }
    else if (this.selectedWindow == this.windowList[2]) {
      selectedWindow = 5;
    }
    else{
      console.log("Invalid window selection");
      return;
    }

    this.classifiersService.windowSubject(this.fileName, selectedWindow).subscribe();
  }

}
