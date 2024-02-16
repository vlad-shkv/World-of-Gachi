import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front2';
  constructor(
    private socket: Socket,
    private socketService: SocketService, 
  ) { }


ngOnInit(){
  this.socketService.init();
  }
}
