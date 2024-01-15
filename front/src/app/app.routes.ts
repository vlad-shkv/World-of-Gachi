import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { P404Component } from './pages/p404/p404.component';
import { AboutComponent } from './pages/about/about.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'about', component: AboutComponent},
    {path: 'p404', component: P404Component},
    {path: 'game', component: GameComponent},
    {path: '**', redirectTo: "/p404"},
];

