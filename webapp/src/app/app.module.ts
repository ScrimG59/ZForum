import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThreadItemComponent } from './thread/thread-item/thread-item.component';
import { ThreadListComponent } from './thread/thread-list/thread-list.component';
import { ThreadDetailComponent } from './thread/thread-detail/thread-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ThreadItemComponent,
    ThreadListComponent,
    ThreadDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
