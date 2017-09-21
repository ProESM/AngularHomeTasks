import { Injectable } from '@angular/core';

import { ITodo } from './../models/itodo';
import { Todo } from './../models/todo';

@Injectable()
export class TodoItemService {
    constructor() {}

    getTodo(id: string): ITodo {        
        let todo: ITodo = null;
        
        let todos = window.localStorage.getItem('todos');
        if (todos !== null) {
            let todosJson = JSON.parse(todos);        
            
            if (todosJson !== null) {
                let todoList = todosJson as ITodo[];
            
                if (todoList !== null) {
                    todo = todoList.find(t => t.id === id);
                }
            }
        }
        return todo;
    }

    saveTodo(todo: ITodo): void {
        let t: ITodo = null;
        
        let todoList: ITodo[] = [];

        let todos = window.localStorage.getItem('todos');
        if (todos !== null) {
            let todosJson = JSON.parse(todos);
            
            if (todosJson !== null) {
                todoList = todosJson as ITodo[];
                
                if (todoList !== null) {
                    t = todoList.find(t => t.id === todo.id);
                }
            }
        }

        if (t === null || t === undefined) {
            t = new Todo();           

            todoList.push(t);
        }
        t.id = todo.id;
        t.title = todo.title;
        t.description = todo.description;
        t.tags = todo.tags;
        t.statusId = todo.statusId;
        t.statusName = todo.statusName;
        
        window.localStorage.setItem('todos', JSON.stringify(todoList));
    }
}