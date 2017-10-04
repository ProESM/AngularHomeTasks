import { Injectable } from '@angular/core';

import { ITodo } from './../models/itodo';
import { Todo } from './../models/todo';

@Injectable()
export class TodoItemsService {
    private todos: ITodo[];
  
    constructor() {
      this.todos = [];
    }

    getTodos(): ITodo[] {
      if (this.todos.length === 0) {
        this.refreshTodos();
      }

      return this.todos.copyWithin(0, 0);
    }

    refreshTodos(): void {
      while (this.todos.length > 0) {
        this.todos.pop();
      }

      let todos = window.localStorage.getItem('todos');
      if (todos !== null) {
        let todosJson = JSON.parse(todos);

        (todosJson as ITodo[]).forEach(todo => {
          let newTodo = new Todo();

          newTodo.copyValuesFrom(todo);

          // newTodo.id = todo.id;
          // newTodo.title = todo.title;
          // newTodo.description = todo.description;
          // newTodo.tags = [];
          // todo.tags.forEach(tag => newTodo.tags.push(tag));
          // newTodo.statusId = todo.statusId;
          // newTodo.statusName = todo.statusName;
          this.todos.push(newTodo);
        });
      };
    }
}