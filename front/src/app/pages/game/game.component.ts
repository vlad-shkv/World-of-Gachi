import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService, User } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {

  public newMessage: string = "";

  constructor(
    private socket: Socket,
    public socketService: SocketService,
  ) {
  }

  ngOnInit(){

    this.socket.emit("get-my-info", (userInfo: User) => {
      console.log(userInfo);
      if (userInfo.username === "anonimus") {
        
      }
    });
  }

  submitName() {
    if (this.socketService.enterForm.username === "") {
      this.socketService.enterForm.error.isEmpty = true;
      return;
    }
    if (this.socketService.enterForm.username.length > 20) {
      this.socketService.enterForm.error.tooLong = true;
      return;
    }

    localStorage.setItem("username", this.socketService.enterForm.username);
    this.socket.emit("set-username", this.socketService.enterForm.username);

    this.socketService.enterForm.isOpen = false;
  }

  sendMessage() {
    if (!this.newMessage) return;
    this.socket.emit("new-message", this.newMessage);
    this.newMessage = "";
  }
}
