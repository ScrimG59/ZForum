import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ThreadItemComponent } from './thread-item/thread-item.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
