import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JokeComponent } from './joke/joke.component';

const routes: Routes = [ 
  { path: '', component: JokeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
