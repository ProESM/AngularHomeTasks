import { Component, OnInit } from '@angular/core';

import { IUser, User } from './../../models/user';
import { IRenderableList, RenderableList } from './../../models/renderable-list';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-list-form',
  templateUrl: './user-list-form.component.html',
  styleUrls: ['./user-list-form.component.scss']
})
export class UserListFormComponent implements OnInit {
  isProccessing: boolean;
  isTestProccessing: boolean;
  userList: IUser[];
  renderableUserList: IRenderableList<IUser>;

  constructor(private userService: UserService) { 
    this.userList = [];
    this.renderableUserList = new RenderableList();
    this.isProccessing = false;
    this.isTestProccessing = false;
  }

  ngOnInit() {
  }

  private handleError(error: any): Promise<any> {
    console.error('Произошла ошибка', error);
    this.isProccessing = false;
    return Promise.reject(error.message || error);
  }
  private handleError2(error: any): Promise<any> {
    console.error('Произошла ошибка', error);
    this.isTestProccessing = false;
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

  getUsers2() {
    if (!this.isTestProccessing) {
      this.isTestProccessing = true;

      this.renderableUserList = new RenderableList();
      this.userService.getUsers2()
        .then(users =>
          {
            this.renderableUserList = users;
            this.renderableUserList.render();
            this.isTestProccessing = false;
          }
        )
        .catch(this.handleError2);
    }
  }
}