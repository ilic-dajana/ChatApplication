import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { MetricsService } from '../home/metrics.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  inputText: string = '';
  loading = false;
  constructor(private renderer: Renderer2, private elementRef: ElementRef,private http: HttpClient, private metrics:MetricsService) { }

  sendMessage(textInput: HTMLInputElement) {
  
    if (!textInput.value) return;
    this.loading = true;
    const chatContainer = this.elementRef.nativeElement.querySelector('#chatContainer');    
  
    const newDiv = this.renderer.createElement('div');
    newDiv.textContent  = textInput.value;
    newDiv.classList.add('message');
    newDiv.classList.add('incoming');
    this.renderer.appendChild(chatContainer, newDiv);
    const formData = new FormData();
    formData.append('message', textInput.value);
    textInput.value = "";
    this.http.post<any>(environment.apiUrl + 'get-reply', formData).subscribe(
      response => {
          this.loading = false;
          const newDiv2 = this.renderer.createElement('div');   
          const startingIndex = response.content[0].generated_text.indexOf('<|assistant|>'); 
          const desiredSubstring = response.content[0].generated_text.substring(startingIndex+13);
          newDiv2.textContent  = desiredSubstring;
          newDiv2.classList.add('message');
          newDiv2.classList.add('outgoing');
          this.renderer.appendChild(chatContainer, newDiv2);
          this.metrics.getMetrics();
      },
      error => {
        this.loading = false;
        alert('An error occurred! ');
      }
    );

   
  }
}
