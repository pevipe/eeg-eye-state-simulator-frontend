import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ClassifiersApiService } from '../classifiers-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
  // Selector of an existent subject
  subject_list: string[] = [];
  subjectDefaultText = "Select loaded subject...";
  selectedSubject: string = "";
  loadDisabled = this.selectedSubject == "";

  // File uploader
  fileName = '';
  requiredFileType = '.csv';

  //Window selector
  windowDefaultText = "Select a time window (default 10s)";
  windowList: string[] = ["10s with 8s overlap", "8s with 5s overlap", "5s with 3s overlap"];
  selectedWindow: number = 10;

  constructor(private classifiersService: ClassifiersApiService,
              private dataService: DataService) { }

  updateSubjectList(): void {
    this.classifiersService.getUploadedSubjects().subscribe(subject_list => {
      this.subject_list = subject_list;
    });
  }

  ngOnInit(): void {
    this.updateSubjectList();
  }

  onSubjectSelected(subject: string): void {
    this.selectedSubject = subject;
    this.loadDisabled = this.selectedSubject == "";
    this.dataService.updateSelectedSubject(this.selectedSubject);
  }

  onFileSelected(event: any): void {
    const file:File = event.target.files[0];
    if (file){
      this.classifiersService.uploadSubject(file).subscribe(
        response => {this.updateSubjectList(); this.fileName = file.name;},
      );
    }
  }

  retrieveWindow(window_string: string): number {
    if (window_string == this.windowList[1]) {
      return 8;
    }
    else if (window_string == this.windowList[2]) {
      return 5;
    }
    else{
      return 10;
    }
  }

  onWindowSelected(window: string): void {
    this.selectedWindow = this.retrieveWindow(window);
    this.dataService.updateSelectedWindow(this.selectedWindow);
  }

  onLoadClicked(): void {
    this.loadDisabled = true;  //Temporarily disable button

    this.classifiersService.windowSubject(this.selectedSubject, this.selectedWindow).subscribe(
      response => {this.loadDisabled = false;}
    );
  }
}
