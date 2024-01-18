import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front2';
  constructor(private socket: Socket) { }


  onInit(){
    this.socket.emit("chat-message-add", 'info')
  }
}
