import { Injectable } from '@angular/core';

import { ITodo } from './../models/itodo';
import { Todo } from './../models/todo';

@Injectable()
export class TodoItemsService {
    constructor() {}

    getTodos(): ITodo[] {
      let todos = window.localStorage.getItem('todos');
      if (todos !== null) {
        let todosJson = JSON.parse(todos);

        return todosJson as ITodo[];
      } else {
        return [];
      };
    }
}