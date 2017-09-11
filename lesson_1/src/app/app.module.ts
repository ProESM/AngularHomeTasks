import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';

import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ 
    { provide: 'ORIGIN_URL', useValue: location.origin },
    UserService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
