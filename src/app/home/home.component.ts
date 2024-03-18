import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsService } from './metrics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private metricsService: MetricsService, private router: Router) { }
 
  redirectToUploadPage() {
    this.router.navigateByUrl('/file-upload');
  }
  redirectToChatPage() {
    this.router.navigateByUrl('/chat');
  }
  
  ngOnInit(): void {
  }

  createFile():void{
    this.metricsService.printModifiedContent();
  }
}
