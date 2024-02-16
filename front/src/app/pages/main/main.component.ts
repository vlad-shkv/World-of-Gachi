import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

public isGameStarted: boolean = false;

 public gameStatusInt: number = window.setInterval(this.check.bind(this), 1000);

  constructor(
    private router: Router,
    private socketService: SocketService,
  ) {

  }

  async check(){
      const gameInfo: any = await this.socketService.checkGameStatus();
      console.log(gameInfo);
      this.isGameStarted = gameInfo.isStarted;
  }

  async ngOnInit() {

  }

  ngOnDestroy() {
    clearInterval(this.gameStatusInt)
  }

  startGame() {
    this.socketService.startGame();
    this.router.navigate(['game']);
  }
}
