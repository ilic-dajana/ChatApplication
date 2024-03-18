import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private metricsUrl = environment.apiUrl + '/metrics'; // Replace with your Python app's URL
  private metrics: string[] = [];

  constructor(private http: HttpClient) { }

  getMetrics(){    
    this.http.get<any>(this.metricsUrl).subscribe(
      async response => {
        var data = response.content;
        const regex1 = /http_request_duration_seconds_sum\s+([0-9.]+)/;
        const regex2 = /http_requests_created\{endpoint="([^"]+)",method="([^"]+)"\}/;
        const match1 = data.match(regex1);
        const match2 = data.match(regex2);

        if (match1 && match1[1]) {
            const httpRequestDurationSecondsSum = parseFloat(match1[1]);
            console.log(httpRequestDurationSecondsSum); 
        } 
        
        if (match2 && match2.length === 3) {
            const endpoint = match2[1];
            const method = match2[2];
            console.log( endpoint +  method );
        }

        if(match1 && match2){
            const modifiedContent = 'Method: '+ match2[2] + " Endpoint: " + match2[1] + " lasted: " + match1[1] ;
            console.log(modifiedContent);
            this.saveModifiedContent(modifiedContent);
        }

      },
      error => {
        console.log('Error:' + error);
      }
    );
  }
    saveModifiedContent(content: string): void {
        console.log(content);
        this.metrics.push(content);
    }

    printModifiedContent() : void{
        console.log(this.metrics);
        if(this.metrics.length < 1){
            alert('There is no metrics data!');
            return;
        }

        const content = this.metrics.join('\n'); 

        const blob = new Blob([content], { type: 'text/plain' }); 

        const url = window.URL.createObjectURL(blob); 

        const link = document.createElement('a'); 
        link.href = url;
        link.download = 'metrics.txt'; 

        document.body.appendChild(link); 
        link.click(); 

        document.body.removeChild(link); 
        window.URL.revokeObjectURL(url); 
    }
        
}
