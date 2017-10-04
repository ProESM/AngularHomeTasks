import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser, User } from '../models/user';

@Injectable()
export class AuthService {
  public user: IUser = null;
  
  constructor() {}

  private handleErrorObservable (error: Response | any) {
    console.error("error=", error);
    console.error("error.code", error.code);
    console.error("error.status", error.status);
    
    console.error(error.message || error);
	  return Observable.throw(error.message || error);
  }

  authenticate(user: IUser): Observable<void> {
    return new Observable<void>(observer => {
      this.saveUser(user);
      this.user = new User();
      this.user.login = user.login;
      this.user.password = user.password;
      observer.next();
    });
  }

  loadUser() : void {
    let user = window.localStorage.getItem('user');
    if (user !== null) {
      let jsonObject = JSON.parse(user);        

      if (jsonObject.hasOwnProperty("login") && jsonObject.hasOwnProperty("password")) {
        let jUser = jsonObject as IUser;

        this.user = new User();
        this.user.login = jUser.login;
        this.user.password = jUser.password;
      }
    }
  }

  saveUser(user: IUser): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logOut(): void {
    window.localStorage.removeItem('user');
  }
}
