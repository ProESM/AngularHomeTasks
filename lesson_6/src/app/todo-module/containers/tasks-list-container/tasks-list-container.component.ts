import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { TodoItemService } from './../../../shared/services/todo-item.service';
import { TodoItemsService } from './../../../shared/services/todo-items.service';

import { AppSliderComponent } from './../app-slider/app-slider.component';
import { TodoComponent } from '../../components/todo/todo.component';

import { ITodo } from './../../../shared/models/itodo';
import { Todo } from './../../../shared/models/todo';
import { ITodoFilter, TodoFilter } from './../../../shared/models/todo-filter';

@Component({
  selector: 'tasks-list-container',
  templateUrl: './tasks-list-container.component.html',
  styleUrls: ['./tasks-list-container.component.scss']
})
export class TasksListContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  private alive: boolean;
  
  todos: ITodo[];

  todoFilter: ITodoFilter;
  
  @ViewChild("appSlider")
  private appSlider: AppSliderComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoItemService: TodoItemService,
    private todoItemsService: TodoItemsService
  ) {
    this.alive = true;

    this.todos = [];

    this.todoFilter = new TodoFilter();
    //this.todoFilter.id = 'Test1';
    //this.todoFilter.title = 'Тест';
    this.todoFilter.tags = [];
  }

  ngOnInit() {
    this.updateTodos();
  }

  ngAfterViewInit(): void {}

  addTodo() {
    this.router.navigate([`todos/new`]);
  }

  updateTodos(): void {
    this.todoItemsService.getTodosAsync(this.todoFilter)
      .takeWhile(() => this.alive)
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

  changeTodoFilter(todoFilter: ITodoFilter): void {
    this.todoFilter = todoFilter;

    this.updateTodos();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
