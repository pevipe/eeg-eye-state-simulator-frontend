import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ClassifiersApiService } from '../classifiers-api.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
  // Selector of an existent subject
  subject_list: string[] = [];
  defaultText = "Select loaded subject...";

  // File uploader
  fileName = '';

  constructor(private classifiersService: ClassifiersApiService) { }

  ngOnInit(): void {
    this.classifiersService.getUploadedSubjects().subscribe(subject_list => {
      this.subject_list = subject_list;
    });
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

}
