import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  constructor(
    private socket: Socket,
    private socketService: SocketService,
  ) {
  }

  ngOnInit(){
    this.socketService.test();
    this.socket.on('connected-users', (data: string) => {
      console.log(data);
    });
  }
}
