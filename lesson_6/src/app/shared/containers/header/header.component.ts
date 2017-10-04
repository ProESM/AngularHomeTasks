import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ITodo } from './../../models/itodo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  private handleErrorObservable (error: Response | any) {
    console.error("error=", error);
    console.error("error.code", error.code);
    console.error("error.status", error.status);
    
    console.error(error.message || error);
	  return Observable.throw(error.message || error);
  }

  public getById(id: string): any {
    return this.http.get(`http://localhost:8080/get?id=${id}`)
      .map(x => {return x})
      .catch(this.handleErrorObservable)
      .subscribe();
  }
}
