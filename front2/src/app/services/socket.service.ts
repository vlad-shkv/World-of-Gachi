import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) {

  }

  test() {
    this.socket.emit("chat-message-add", 'info');
  }
}
