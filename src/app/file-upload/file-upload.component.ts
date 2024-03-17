import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFile: File | null = null;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    console.log("1");
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {

    console.log("1");
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log("FormData" + formData);
    this.http.post<any>('http://127.0.0.1:5000/get-file', formData).subscribe(
      response => {
        alert('Successfully uploaded file!');
        console.log('File content:' + response.content);
      },
      error => {
        alert('wtf');
        console.log('Error:' + error);
      }
    );
  }
}
