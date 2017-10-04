import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { TodoItemService } from './../../services/todo-item.service';
import { TodoItemsService } from './../../services/todo-items.service';

import { AppSliderComponent } from './../app-slider/app-slider.component';

import { ITodo } from './../../models/itodo';
import { Todo } from './../../models/todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  title = 'home';

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
  }

  ngOnInit() { 
    this.updateTodos();
  }

  ngAfterViewInit(): void {}

  updateTodos(): void {
    while (this.todos.length > 0) {
      this.todos.pop();
    }

    this.todoItemsService.getTodos().forEach(todo => this.todos.push(todo));
  }

  addTodo() {
    let todo = new Todo();    
    todo.id = (Math.random() * 1000).toString();
    //todo.title = null;
    //todo.description = null;
    todo.tags = [];
    todo.statusId = 1;
    todo.statusName = "открыто";
    this.editingTodos.push(todo);

    this.editingTodosSlider.getVisibleTodos();
  }

  updateOrInsertTodo(todo: ITodo): void {
    this.updateTodos();

    if (this.appSlider !== undefined && this.appSlider !== null) {
      this.appSlider.getVisibleTodos();
    }
    
    let deletedEditingTodoIndex = this.editingTodos.findIndex(t => t.id == todo.id);

    if (deletedEditingTodoIndex !== -1) {
      this.editingTodos.splice(deletedEditingTodoIndex, 1);
      this.editingTodosSlider.getVisibleTodos();
    }
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
