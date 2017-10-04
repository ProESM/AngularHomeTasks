import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ITodo } from './../models/itodo';
import { Todo } from './../models/todo';

@Injectable()
export class TodoItemsService {
  private todos: ITodo[];
  
  constructor(
    private http: HttpClient
  ) {
    this.todos = [];
  }

  getTodosSync(): ITodo[] {
    if (this.todos.length > 0) {
      return this.todos.copyWithin(0, 0); 
    } else {
      this.getTodosRequest()
        .subscribe(todos => {
          while (this.todos.length > 0) {
            this.todos.pop();
          }

          if (todos !== null && todos !== undefined) {
            todos.forEach(todo => {
              let newTodo = new Todo();

              newTodo.id = todo.id;
              newTodo.title = todo.title;
              newTodo.description = `Описание к ${todo.title}`; //todo.description;
              newTodo.tags = [];
              //todo.tags.forEach(tag => newTodo.tags.push(tag));
              newTodo.statusId = todo.completed? 3 : 1;
              //newTodo.statusName = todo.statusName;
              this.todos.push(newTodo);
            });
          }
          return this.todos.copyWithin(0, 0);
        });
    }
  }

  getTodosAsync(): Observable<ITodo[]> {    
    if (this.todos.length > 0) {
      return new Observable(observer => {
        observer.next(this.todos.copyWithin(0, 0));
      });
    } else {      
      return this.getTodosRequest()
        .map(todos => {
          while (this.todos.length > 0) {
            this.todos.pop();
          }

          if (todos !== null && todos !== undefined) {
            todos.forEach(todo => {
              let newTodo = new Todo();

              newTodo.id = todo.id;
              newTodo.title = todo.title;
              newTodo.description = `Описание к ${todo.title}`; //todo.description;
              newTodo.tags = [];
              //todo.tags.forEach(tag => newTodo.tags.push(tag));
              newTodo.statusId = todo.completed? 3 : 1;
              //newTodo.statusName = todo.statusName;
              this.todos.push(newTodo);
            });
          }
          return this.todos.copyWithin(0, 0);
        });
    }
  }

  getTodosRequest(): Observable<any> {
    return this.http.get(`/api`)
      .catch(this.handleErrorObservable);
  }

  updateTodosSync(): void {
    while (this.todos.length > 0) {
      this.todos.pop();
    }

    this.getTodosRequest()
      .subscribe(todos => {
        if (todos !== null && todos !== undefined) {
          todos.forEach(todo => {
            let newTodo = new Todo();

            newTodo.id = todo.id;
            newTodo.title = todo.title;
            newTodo.description = `Описание к ${todo.title}`; //todo.description;
            newTodo.tags = [];
            //todo.tags.forEach(tag => newTodo.tags.push(tag));
            newTodo.statusId = todo.completed? 3 : 1;
            //newTodo.statusName = todo.statusName;
            this.todos.push(newTodo);
          });
        }
      });
  }

  clearTodos(): void {
    while (this.todos.length > 0) {
      this.todos.pop();
    }
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}