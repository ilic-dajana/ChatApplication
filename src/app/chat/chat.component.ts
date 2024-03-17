import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  inputText: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef,private http: HttpClient) { }

  sendMessage(textInput: HTMLInputElement) {
    const chatContainer = this.elementRef.nativeElement.querySelector('#chatContainer');    
  
    const newDiv = this.renderer.createElement('div');
    newDiv.textContent  = textInput.value;
    newDiv.classList.add('message');
    newDiv.classList.add('incoming');
    this.renderer.appendChild(chatContainer, newDiv);
    textInput.value = "";
    const formData = new FormData();
    formData.append('message', textInput.value);
    this.http.post<any>('http://127.0.0.1:5000/get-reply', formData).subscribe(
      response => {
          
          const newDiv2 = this.renderer.createElement('div');   
          const startingIndex = response.content.indexOf(' <|assistant|>'); // Find the index of the starting point
          const desiredSubstring = response.content.substring(startingIndex);
          newDiv2.textContent  = desiredSubstring;
          newDiv2.classList.add('message');
          newDiv2.classList.add('outgoing');
          this.renderer.appendChild(chatContainer, newDiv2);
      },
      error => {
        console.log('Error:' + error);
      }
    );

   
  }
}
