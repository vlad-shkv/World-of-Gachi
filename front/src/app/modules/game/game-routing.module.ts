import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayComponent } from './pages/play/play.component';

const routes: Routes = [
  { path: '', component: PlayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GameRoutingModule { }