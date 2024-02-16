import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface Message {
  username: string,
  userId: string, 
  text: string,
  data: Date,
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public messages: Message[] = [
  ];

  constructor(private socket: Socket) {}

  init() {
    this.socket.on("new-message-from-back", (newMessage: Message) => {
      this.messages.push(newMessage);
      console.log(newMessage);
    })
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
}
