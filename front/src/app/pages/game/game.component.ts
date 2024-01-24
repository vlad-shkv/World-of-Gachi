import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  id: string;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  public connectedUsers: User[] = [];
  constructor(
    private socket: Socket,
    private socketService: SocketService,
  ) {
  }

  ngOnInit(){
    this.socketService.test();
    this.socket.on('connected-users', (userList: User[]) => {
      console.log(userList);
      this.connectedUsers = userList;
    });

    this.socket.emit("get-my-info", (userInfo: User) => {
      console.log(userInfo);
      if (userInfo.username === "anonimus") {
        
      }
    });
  }
}
