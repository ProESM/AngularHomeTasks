import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TodoItemService } from './../../services/todo-item.service';
import { TodoItemsService } from './../../services/todo-items.service';

import { AppSliderComponent } from './../app-slider/app-slider.component';
import { TodoComponent } from '../../components/todo/todo.component';

import { ITodo } from './../../models/itodo';
import { Todo } from './../../models/todo';
@Component({
  selector: 'task-view-container',
  templateUrl: './task-view-container.component.html',
  styleUrls: ['./task-view-container.component.scss']
})
export class TaskViewContainerComponent implements OnInit, AfterViewInit {
  todos: ITodo[];
  
  editingTodo: ITodo;

  @ViewChild("appSlider")
  private appSlider: AppSliderComponent;

  @ViewChild("editingTodoComponent")
  public editingTodoComponent: TodoComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoItemService: TodoItemService,
    private todoItemsService: TodoItemsService
  ) {
    this.todos = [];
    this.editingTodo = null;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {      
      this.editingTodo = this.todoItemService.getTodo(params.get('id')).clone();
    });
    this.updateTodos();
  }

  ngAfterViewInit(): void {}

  updateTodos(): void {
    while (this.todos.length > 0) {
      this.todos.pop();
    }

    this.todoItemsService.getTodos().forEach(todo => this.todos.push(todo));
  }

  updateOrInsertTodo(todo: ITodo): void {
    this.updateTodos();

    if (this.appSlider !== undefined && this.appSlider !== null) {
      this.appSlider.getVisibleTodos();
    }

    this.router.navigate([`todo/${todo.id}`]);
    
    // let deletedEditingTodoIndex = this.editingTodos.findIndex(t => t.id == todo.id);

    // if (deletedEditingTodoIndex !== -1) {
    //   this.editingTodos.splice(deletedEditingTodoIndex, 1);
    //   this.editingTodosSlider.getVisibleTodos();
    // }
  }

  editTodo(todo: ITodo): void {
    //this.router.navigate(["../",  { id: todo.id }], { relativeTo: this.activatedRoute });
    this.router.navigate([`todo/${todo.id}`]);

    // if (this.editingTodos.length < this.maxEditingTodos) {
    //   let editingTodoIndex = this.editingTodos.findIndex(t => t.id == todo.id);

    //   if (editingTodoIndex === -1) {
    //     this.editingTodos.push(todo);
    //     this.editingTodosSlider.getVisibleTodos();
    //   }
    // }
  }
}
