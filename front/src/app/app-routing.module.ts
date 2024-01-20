import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../../../front/src/app/pages/main/main.component';
import { P404Component } from '../../../front/src/app/pages/p404/p404.component';
import { AboutComponent } from '../../../front/src/app/pages/about/about.component';
import { GameComponent } from '../../../front/src/app/pages/game/game.component';

export const routes: Routes = [
    //{path: 'game', loadChildren: () => import('./modules/game/game.module').then(mod => mod.GameModule)},
    {path: '', component: MainComponent},
    {path: 'about', component: AboutComponent},
    {path: 'p404', component: P404Component},
    {path: 'game', component: GameComponent},
    {path: '**', redirectTo: "/p404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
