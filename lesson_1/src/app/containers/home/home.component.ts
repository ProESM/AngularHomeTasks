import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, User } from './../../models/user';
import { IRenderableList, RenderableList } from './../../models/renderable-list';
import { StringToDatePipe } from './../../pipes/string-to-date.pipe';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Главная';
  userList: IUser[];
  renderableUserList: IRenderableList<IUser>;

  constructor(private userService: UserService) { 
    this.userList = [];
    this.renderableUserList = new RenderableList();
  }

  ngOnInit() {
  }

  private handleError(error: any): Promise<any> {
    console.error('Произошла ошибка', error); 
    return Promise.reject(error.message || error);
  }

  getUsers() {
    this.userList = [];
    this.userService.getUsers()
      .then(users =>
        {
          this.userList = users;
        }
      )
      .catch(this.handleError);
  }

  getUsers2() {
    this.renderableUserList = new RenderableList();
    this.userService.getUsers2()
      .then(users =>
        {
          this.renderableUserList = users;
          this.renderableUserList.render();
        }
      )
      .catch(this.handleError);
  }
}
