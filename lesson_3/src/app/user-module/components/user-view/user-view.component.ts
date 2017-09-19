import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

import { IUser, User } from './../../../shared/models/user';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, AfterViewInit {
  @Input() 
  user: IUser;  
  userPictureList: string[];
  
  @Output()
  public onUserDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.userPictureList = this.user.pictures;
  }

  ngAfterViewInit(): void {
    
  }

  deleteUser(user: IUser) {
    this.onUserDelete.emit(user);
  }
}
