import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThreadItemComponent } from './thread/thread-item/thread-item.component';
import { ThreadListComponent } from './thread/thread-list/thread-list.component';
import { ThreadDetailComponent } from './thread/thread-detail/thread-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AlertifyService } from 'src/services/alertify.service';
import { ThreadService } from 'src/services/thread.service';
import { UserService } from 'src/services/user.service';
import { HttpErrorInterceptorService } from 'src/services/httperror-interceptor.service';
import { TokenService } from 'src/services/token.service';
import { PostService } from 'src/services/post.service';
import { CreateThreadComponent } from './thread/create-thread/create-thread.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ThreadItemComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    UserDetailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    CreateThreadComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AlertifyService,
    ThreadService,
    UserService,
    TokenService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
