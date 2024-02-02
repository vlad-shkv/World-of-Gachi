import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  id: string;
}

interface Error {
  isEmpty: boolean,
  tooLong: boolean
}

interface EnterForm {
  username: string,
  error: Error
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  public connectedUsers: User[] = [];
  public enterForm: EnterForm = {
    username: '',
    error: {
      isEmpty: false,
      tooLong: false
    }
  };

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

  submitName() {
    let input = document.getElementById("inputName") as HTMLInputElement;
    let err = document.querySelector(".error") as HTMLElement;
    if (input.value === "") {
      err.style.opacity = "1";
    }
  }
}
