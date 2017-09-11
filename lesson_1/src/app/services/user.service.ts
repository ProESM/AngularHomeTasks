import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IUser, User } from '../models/user';
import { IRenderableList, RenderableList } from '../models/renderable-list';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    private _serviceUrl = "https://randomuser.me/api/";
    
    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('Произошла ошибка', error); 
        return Promise.reject(error.message || error);
    }

    private getUserRequest(seed: string) : Promise<IUser> {
        let serviceMethodUrl = seed ? `${this._serviceUrl}?seed=${seed}` : this._serviceUrl;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(
            serviceMethodUrl,
            { headers: headers })
            .toPromise()
            .then(response => 
                {   
                    let user = new User();
                    user.name = `${response.json().results[0].name.title} ${response.json().results[0].name.first} ${response.json().results[0].name.last}`;
                    user.email = response.json().results[0].email;
                    user.phone = response.json().results[0].phone;
                    user.dob = new Date(response.json().results[0].dob);
                    user.picture = response.json().results[0].picture.medium;
                    return user;
                })
            .catch(this.handleError);
    }

    getUsers() : Promise<IUser[]> {
        let userList: IUser[] = [];

        return new Promise<IUser[]>((resolve) =>
            {
                const checkUser = (user: IUser) => {
                    userList.push(user);
        
                    if (user.dob.getFullYear() <= 1975) {
                        resolve(userList);
                    } else {
                        this.getUserRequest(user.email)
                            .then(checkUser)
                            .catch(this.handleError);
                    }
                }
        
                this.getUserRequest(null)
                    .then(checkUser)
                    .catch(this.handleError);
            }
        );
    }

    getUsers2() : Promise<IRenderableList<IUser>> {
        let renderableUserList: IRenderableList<IUser> = new RenderableList();

        return new Promise<IRenderableList<IUser>>((resolve) =>
            {
                const checkUser = (user: IUser) => {
                    renderableUserList.push(user);
        
                    if (user.dob.getFullYear() <= 1975) {
                        resolve(renderableUserList);
                    } else {
                        this.getUserRequest(user.email)
                            .then(checkUser)
                            .catch(this.handleError);
                    }
                }
        
                this.getUserRequest(null)
                    .then(checkUser)
                    .catch(this.handleError);
            }
        );
    }
}