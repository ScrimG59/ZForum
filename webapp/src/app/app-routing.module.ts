import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreadDetailResolverService } from './thread/thread-detail/thread-detail-resolver.service';
import { ThreadDetailComponent } from './thread/thread-detail/thread-detail.component';
import { ThreadListComponent } from './thread/thread-list/thread-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  {path: '', component: ThreadListComponent},
  {path: 'thread-detail/:id', component: ThreadDetailComponent,
  resolve: {threads: ThreadDetailResolverService}},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'user/detail/:id', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
