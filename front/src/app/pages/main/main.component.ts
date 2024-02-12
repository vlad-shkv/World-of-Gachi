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

  constructor(
    private router: Router,
    private socketService: SocketService,
  ) {

  }

  async ngOnInit() {
    setInterval(async () => {
      const gameInfo: any = await this.socketService.checkGameStatus();
      console.log(gameInfo);
      this.isGameStarted = gameInfo.isStarted;
    },
    1000)
  }

  startGame() {
    this.socketService.startGame();
    this.router.navigate(['game']);
  }
}
