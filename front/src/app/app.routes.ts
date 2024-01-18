import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { P404Component } from './pages/p404/p404.component';
import { AboutComponent } from './pages/about/about.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    {path: 'game', loadChildren: () => import('./modules/game/game.module').then(mod => mod.GameModule)},
    {path: '', component: MainComponent},
    {path: 'about', component: AboutComponent},
    {path: 'p404', component: P404Component},
    //{path: 'game', component: GameComponent},
    {path: '**', redirectTo: "/p404"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }