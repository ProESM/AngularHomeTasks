import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TodoItemService } from './../../services/todo-item.service';
import { TodoItemsService } from './../../services/todo-items.service';

import { AppSliderComponent } from './../app-slider/app-slider.component';
import { TodoComponent } from '../../components/todo/todo.component';

import { ITodo } from './../../models/itodo';
import { Todo } from './../../models/todo';
@Component({
  selector: 'tasks-list-container',
  templateUrl: './tasks-list-container.component.html',
  styleUrls: ['./tasks-list-container.component.scss']
})
export class TasksListContainerComponent implements OnInit, AfterViewInit {
  todos: ITodo[];
  
  @ViewChild("appSlider")
  private appSlider: AppSliderComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoItemService: TodoItemService,
    private todoItemsService: TodoItemsService
  ) {
    this.todos = [];
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

  editTodo(todo: ITodo): void {
    //this.router.navigate(["../",  { id: todo.id }], { relativeTo: this.activatedRoute });

    this.router.navigate([`todo/${todo.id}`]);
  }
}
