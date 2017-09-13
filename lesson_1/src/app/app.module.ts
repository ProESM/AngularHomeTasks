import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { UserListFormComponent } from './components/user-list-form/user-list-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';

import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListFormComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    //HttpModule
    HttpClientModule
  ],
  providers: [ 
    { provide: 'ORIGIN_URL', useValue: location.origin },
    UserService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
