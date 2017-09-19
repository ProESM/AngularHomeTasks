import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IUser, User } from '../models/user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    private _serviceUrl = "https://randomuser.me/api/";
    
    constructor(private http: HttpClient) {}

    private handleError(error: any): Promise<any> {
        console.error('Произошла ошибка', error); 
        return Promise.reject(error.message || error);
    }

    private getUserRequest(seed: string) : Promise<IUser> {
        let serviceMethodUrl = seed ? `${this._serviceUrl}?seed=${seed}` : this._serviceUrl;
        
        return this.http.get(
            serviceMethodUrl
            )            
            .toPromise()
            .then(response => 
                {   
                    let user = new User();

                    console.log('response=', response["results"][0]);

                    user.name = `${response["results"][0].name.title} ${response["results"][0].name.first} ${response["results"][0].name.last}`;                    
                    user.email = response["results"][0].email;
                    user.phone = response["results"][0].phone;
                    user.dob = new Date(response["results"][0].dob);
                    user.pictures = [response["results"][0].picture.large, response["results"][0].picture.medium, response["results"][0].picture.thumbnail];

                    console.log('user=', user);

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
}