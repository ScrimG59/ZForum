import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreadListComponent } from './thread-list/thread-list.component';

const routes: Routes = [
  {path: '', component: ThreadListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
