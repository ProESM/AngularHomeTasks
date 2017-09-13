import { Component, Input } from '@angular/core';

import { IUser, User } from './../../models/user';
//import { IUser, User } from '@models/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: IUser;
}