import { Injectable } from '@angular/core';

import { ITodo } from './../models/itodo';
import { Todo } from './../models/todo';

import { TodoItemsService } from './todo-items.service';

@Injectable()
export class TodoItemService {
    constructor(private todoItemsService: TodoItemsService) {}

    getTodo(id: string): ITodo {
        let todos = this.todoItemsService.getTodos();
        
        let todo = todos.find(t => t.id === id);

        return todo;
    }

    saveTodo(todo: ITodo): void {
        let todos = this.todoItemsService.getTodos();
        
        let t = todos.find(t => t.id === todo.id);

        if (t === null || t === undefined) {
            t = new Todo();           

            todos.push(t);
        }

        t.id = todo.id;
        t.title = todo.title;
        t.description = todo.description;
        t.tags = todo.tags;
        t.statusId = todo.statusId;
        t.statusName = todo.statusName;
        
        window.localStorage.setItem('todos', JSON.stringify(todos));

        this.todoItemsService.refreshTodos();
    }
}