import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface Message {
  username: string,
  userId: string, 
  text: string,
  data: Date,
}

export interface User {
  username: string;
  id: string;
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

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public messages: Message[] = [
  ];

  public userId: string = "";
  public connectedUsers: User[] = [];

  public enterForm: EnterForm = {
    isOpen: false,
    username: '',
    error: {
      isEmpty: false,
      tooLong: false
    }
  };

  constructor(private socket: Socket) {}

  init() {
    this.socket.on("new-message-from-back", (newMessage: Message) => {
      this.messages.push(newMessage);
      console.log(newMessage);
    })

    this.socket.on("set-socket-id", (id: string) => {
      this.userId = id;
      console.log(this.userId);
    });
    const username = localStorage.getItem("username");
    if (!username) {
      this.enterForm.isOpen = true;
    } else {
      this.socket.emit("set-username", username);
    }
    this.socket.on('connected-users', (userList: User[]) => {
      console.log(userList);
      this.connectedUsers = userList;
    });
  }

  startGame() {
    this.socket.emit('start-game');
  }

  checkGameStatus() {
    return new Promise((resolve, reject) => {
      this.socket.emit('check-game-status', (gameInfo: any) => {
        resolve(gameInfo)
      });
    });
  }

  stopGame() {
    this.socket.emit('stop-game');
  }
}
