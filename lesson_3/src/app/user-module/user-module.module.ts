import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UsersGeneratorComponent } from './containers/users-generator/users-generator.component';
import { UserViewComponent } from './components/user-view/user-view.component';

import { UserService } from '../shared/services/user.service';

import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ChangePictureDirective } from '../shared/directives/change-picture.directive';
import { ConfirmDirective } from '../shared/directives/confirm.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    UsersGeneratorComponent, 
    UserViewComponent,
    DateFormatPipe,
    ChangePictureDirective,
    ConfirmDirective
  ],
  providers: [UserService],
  exports: [UsersGeneratorComponent]
})
export class UserModuleModule { }
