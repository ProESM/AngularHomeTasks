import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TodoItemService } from './../../../shared/services/todo-item.service';
import { TodoItemsService } from './../../../shared/services/todo-items.service';

import { AppSliderComponent } from './../app-slider/app-slider.component';
import { TodoComponent } from '../../components/todo/todo.component';

import { ITodo } from './../../../shared/models/itodo';
import { Todo } from './../../../shared/models/todo';

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

  addTodo() {
    this.router.navigate([`todos/new`]);
  }

  updateTodos(): void {
    this.todoItemsService.getTodosAsync()
      .subscribe(todos => {
        while (this.todos.length > 0) {
          this.todos.pop();
        }

        todos.forEach(todo => this.todos.push(todo));
      });
  }

  editTodo(todo: ITodo): void {
    this.router.navigate([`todos/${todo.id}`]);
  }
}
