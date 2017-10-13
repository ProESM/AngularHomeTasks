import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ITodo } from './../models/itodo';
import { Todo } from './../models/todo';

import { TodoItemsService } from './todo-items.service';

@Injectable()
export class TodoItemService {
    constructor(
        private http: HttpClient,
        private todoItemsService: TodoItemsService
    ) { }

    getTodo(id: string): Observable<ITodo> {
        return this.todoItemsService.getTodosAsync()
            .map(todos => {
                let todo = todos.find(t => t.id === id);
                return todo;
            });
    }

    saveTodo(todo: ITodo): Observable<void> {
        let todos = this.todoItemsService.getTodosSync();

        let t = todos.find(t => t.id === todo.id);

        if (t === null || t === undefined) {
            this.addTodo(todo);
        }

        return this.http.patch(`/api/${todo.id}`, 
            {
                title: todo.title,
                order: 1,
                completed: todo.statusId === 3
            })
            .map(() => {
                this.todoItemsService.clearTodos();
            })
            .catch(this.handleErrorObservable);
    }

    addTodo(todo: ITodo): Observable<void> {
        return this.http.post("/api",
            {
                title: todo.title,
                order: 1,
                completed: todo.statusId === 3
            })
            .map(() => {
                this.todoItemsService.clearTodos();
            })
            .catch(this.handleErrorObservable);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}