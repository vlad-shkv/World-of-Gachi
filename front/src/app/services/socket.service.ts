import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

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
