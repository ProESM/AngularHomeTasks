import { Component, OnInit } from '@angular/core';

import { IUser } from './../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'users-generator',
  templateUrl: './users-generator.component.html',
  styleUrls: ['./users-generator.component.scss']
})
export class UsersGeneratorComponent implements OnInit {
  userList: IUser[];
  isProccessing: boolean;
  
  constructor(private userService: UserService) {
    this.userList = [];
    this.isProccessing = false;
  }

  ngOnInit() {}

  private handleError(error: any): Promise<any> {
    console.error('Произошла ошибка', error);
    this.isProccessing = false;
    return Promise.reject(error.message || error);
  }

  getUsers() {
    if (!this.isProccessing) {
      this.isProccessing = true;

      this.userList = [];
      this.userService.getUsers()
        .then(users =>
          {
            this.userList = users;
            
            this.isProccessing = false;
          }
        )
        .catch(this.handleError);
    }  
  }

  onUserDelete(user: IUser) {
    var userIndex = this.userList.indexOf(user, 0);
    if (userIndex > -1) {
      this.userList.splice(userIndex, 1);
    }
  }
}
