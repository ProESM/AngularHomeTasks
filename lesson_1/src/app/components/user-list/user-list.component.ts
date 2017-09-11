import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../models/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() userList: User[];

  constructor() {

  }
}