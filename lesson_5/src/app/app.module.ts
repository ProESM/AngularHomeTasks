
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// import { TodoModule } from './todo-module/todo.module';

import { LayoutComponent } from './shared/containers/layout/layout.component';
import { HeaderComponent } from './shared/containers/header/header.component';
import { FooterComponent } from './shared/containers/footer/footer.component';
import { HomeComponent } from './shared/containers/home/home.component';


import { AlertComponent } from './shared/components/alert/alert.component';

import { LoginComponent } from './shared/containers/login/login.component';

import { routes } from './app.routing';

import { TagService } from './shared/services/tag.service';
import { TodoItemService } from './shared/services/todo-item.service';
import { TodoItemsService } from './shared/services/todo-items.service';
import { VersionInterceptorService } from './shared/services/version-interceptor.service';

export function loadTags(tagService: TagService) {
  return () => {
    return tagService.loadTags();
  }
}

import { AlertService } from './shared/services/alert.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { LeaveGuardService } from './shared/services/leave-guard.service';

export function loadUser(auth: AuthService) {
  return () => {
    return auth.loadUser();
  }
}

@NgModule({
  declarations: [
    AppComponent,    
    AlertComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //TodoModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    //{ provide: 'ORIGIN_URL', useValue: location.origin },
    AlertService,
    AuthService,
    AuthGuardService,
    LeaveGuardService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadUser,
      deps: [AuthService],
      multi: true
    },
    TagService,
    TodoItemService,
    TodoItemsService,    
    {
      provide: APP_INITIALIZER,
      useFactory: loadTags,
      deps: [TagService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: VersionInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
