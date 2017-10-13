import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser, User } from '../models/user';
import { IRegistration } from './../models/registration';

@Injectable()
export class AuthService {
  public user: IUser = null;
  
  constructor() {}

  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
	  return Observable.throw(error.message || error);
  }

  authenticate(user: IUser): Observable<void> {
    return new Observable<void>(observer => {
      //this.saveUser(user);

      if (this.findUser(user)) {
        this.user = new User();
        this.user.email = user.email;
        this.user.password = user.password;
        observer.next();
      } else {        
        observer.error("Неверный email или пароль");
      }
    });
  }

  register(registration: IRegistration): Observable<void> {
    return new Observable<void>(observer => {
      this.user = new User();
      this.user.email = registration.email;
      this.user.password = registration.password;
      
      this.saveUser(this.user);
      
      observer.next();
    });
  }

  loadUser(): void {
    let user = window.localStorage.getItem('user');
    if (user !== null) {
      let jsonObject = JSON.parse(user);        

      if (jsonObject.hasOwnProperty("email") && jsonObject.hasOwnProperty("password")) {
        let jUser = jsonObject as IUser;

        this.user = new User();
        this.user.email = jUser.email;
        this.user.password = jUser.password;
      }
    }
  }

  findUser(user: IUser): boolean {
    let userInLocalStorage = window.localStorage.getItem('user');
    if (userInLocalStorage !== null) {
      let jsonObject = JSON.parse(userInLocalStorage);        

      if (jsonObject.hasOwnProperty("email") && jsonObject.hasOwnProperty("password")) {
        let jUser = jsonObject as IUser;

        return jUser.email === user.email && jUser.password === user.password;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  saveUser(user: IUser): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logOut(): void {
    window.localStorage.removeItem('user');
  }
}
