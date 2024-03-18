import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MetricsService } from '../home/metrics.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFile: File | null = null;
  loading = false;
  constructor(private http: HttpClient, private metrics : MetricsService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log("FormData" + formData);
    this.http.post<any>(environment.apiUrl + '/upload-file', formData).subscribe(
      response => {
        alert('Successfully uploaded file!');
        this.metrics.getMetrics();
      },
      error => {
        alert(error);
        console.log('Error:' + error);
      }
    );
  }

  startTrainingModel(){
    this.loading = true;
     this.http.get<any>(environment.apiUrl+'train-model').subscribe(
      response => {
        alert(response.content);
         this.loading = false;
         this.metrics.getMetrics();
      },
      error => {
         this.loading = false;
        console.log('Error:' + error);
      }
    );
  }
}
