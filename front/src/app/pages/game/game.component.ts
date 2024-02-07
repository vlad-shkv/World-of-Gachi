import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  id: string;
}

interface Message {
  username: string,
  userid: string, 
  text: string,
  date: Date,
}

interface Error {
  isEmpty: boolean,
  tooLong: boolean
}

interface EnterForm {
  isOpen: boolean,
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
    isOpen: false,
    username: '',
    error: {
      isEmpty: false,
      tooLong: false
    }
  };

  public messages: Message[] = [
    {
      username: "dumbName",
      userid: "wi49wro93", 
      text: "Hello bitches",    
      date: new Date(),
    }
  ];

  public newMessage: string = "";

  constructor(
    private socket: Socket,
    private socketService: SocketService,
  ) {
  }

  ngOnInit(){
    const username = localStorage.getItem("username");
    if (!username) {
      this.enterForm.isOpen = true;
    } else {
      this.socket.emit("set-username", username);
    }
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

    this.socket.on("new-message-from-back", (newMessage: Message) => {
      this.messages.push(newMessage);
    })
  }

  submitName() {
    if (this.enterForm.username === "") {
      this.enterForm.error.isEmpty = true;
      return;
    }
    if (this.enterForm.username.length > 20) {
      this.enterForm.error.tooLong = true;
      return;
    }

    localStorage.setItem("username", this.enterForm.username);
    this.socket.emit("set-username", this.enterForm.username);

    this.enterForm.isOpen = false;
  }

  sendMessage() {
    if (!this.newMessage) return;
    this.socket.emit("new-message", this.newMessage);
    this.newMessage = "";
  }
}
