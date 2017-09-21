import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { TodoItemService } from './shared/services/todo-item.service';
import { TodoItemsService } from './shared/services/todo-items.service';

import { AppSliderComponent } from './shared/containers/app-slider/app-slider.component';

import { ITodo } from './shared/models/itodo';
import { Todo } from './shared/models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  todos: ITodo[];
  editingTodos: ITodo[];

  private maxEditingTodos: number = 3;

  @ViewChild("appSlider")
  private appSlider: AppSliderComponent;

  @ViewChild("editingTodosSlider")
  private editingTodosSlider: AppSliderComponent;

  constructor(
    private todoItemService: TodoItemService,
    private todoItemsService: TodoItemsService
  ) {
    this.todos = [];
    this.editingTodos = [];

    // let todo1 = new Todo();    
    // todo1.id = "111";
    // todo1.title = "Задача 1";
    // todo1.description = "Описание задачи 1";
    // todo1.tags = ["awesome"];
    // todo1.statusId = "1";
    // todo1.statusName = "открыто";
    // this.todos.push(todo1);

    // let todo2 = new Todo();
    // todo2.id = "222";
    // todo2.title = "Задача 2";
    // todo2.description = "Описание задачи 2";
    // todo2.tags = ["awesome", "funny"];
    // todo2.statusId = "2";
    // todo2.statusName = "в процессе";
    // this.todos.push(todo2);

    // let todo3 = new Todo();
    // todo3.id = "333";
    // todo3.title = "Задача 3";
    // todo3.description = "Описание задачи 3";
    // todo3.tags = ["awesome"];
    // todo3.statusId = "3";
    // todo3.statusName = "выполнено";
    // this.todos.push(todo3);

    // this.todos.forEach(todo => {
    //   this.todoItemService.saveTodo(todo);
    // });

    // let todo1 = new Todo();    
    // todo1.id = "111";
    // todo1.title = "Задача 1";
    // todo1.description = "Описание задачи 1";
    // todo1.tags = ["awesome"];
    // todo1.statusId = "1";
    // todo1.statusName = "открыто";
    // this.editingTodos.push(todo1);
  }

  ngOnInit() { 
    this.updateTodos();
  }

  ngAfterViewInit(): void {
    
  }

  updateTodos(): void {
    this.todos = this.todoItemsService.getTodos();
  }

  addTodo() {
    let todo = new Todo();    
    todo.id = (Math.random() * 1000).toString();
    todo.title = null;
    todo.description = null;
    todo.tags = [];
    todo.statusId = 1;
    todo.statusName = "открыто";
    this.editingTodos.push(todo);

    this.editingTodosSlider.getVisibleTodos();
  }

  updateOrInsertTodo(todo: ITodo): void {
    let deletedTodoIndex = this.todos.findIndex(t => t.id == todo.id);

    if (deletedTodoIndex === -1) {
      this.todos.push(todo);
      this.appSlider.getVisibleTodos();
    } else {
      //this.todos.splice(deletedTodoIndex, 1);
      //this.todos.splice(deletedTodoIndex, 0, todo);
    }
    
    let deletedEditingTodoIndex = this.editingTodos.findIndex(t => t.id == todo.id);

    if (deletedEditingTodoIndex !== -1) {
      this.editingTodos.splice(deletedEditingTodoIndex, 1);
      this.editingTodosSlider.getVisibleTodos();
    }

    //this.appSlider.getVisibleTodos();
  }

  editTodo(todo: ITodo): void {
    if (this.editingTodos.length < this.maxEditingTodos) {
      let editingTodoIndex = this.editingTodos.findIndex(t => t.id == todo.id);

      if (editingTodoIndex === -1) {
        this.editingTodos.push(todo);
        this.editingTodosSlider.getVisibleTodos();
      }
    }
  }
}
