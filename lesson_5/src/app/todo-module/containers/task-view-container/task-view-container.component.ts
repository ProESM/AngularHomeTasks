import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TodoItemService } from './../../../shared/services/todo-item.service';
import { TodoItemsService } from './../../../shared/services/todo-items.service';

import { AppSliderComponent } from './../app-slider/app-slider.component';
import { TodoComponent } from '../../components/todo/todo.component';

import { ITodo } from './../../../shared/models/itodo';
import { Todo } from './../../../shared/models/todo';

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
      let todoId = params.get('id');

      if (todoId === 'new') {
        this.editingTodo = new Todo();    
        this.editingTodo.id = 'new';
        this.editingTodo.tags = [];
        this.editingTodo.statusId = 1;
        this.editingTodo.statusName = "открыто";
      } else {
        this.todoItemService.getTodo(params.get('id'))
          .subscribe(todo => {
            this.editingTodo = todo.clone();
          });
      }
    });
    this.updateTodos();
  }

  ngAfterViewInit(): void {}

  updateTodos(): void {
    this.todoItemsService.getTodosAsync()
      .subscribe(todos => {
        while (this.todos.length > 0) {
          this.todos.pop();
        }
        todos.forEach(todo => this.todos.push(todo));
      });
  }

  updateOrInsertTodo(todo: ITodo): void {
    this.updateTodos();

    if (this.appSlider !== undefined && this.appSlider !== null) {
      this.appSlider.getVisibleTodos();
    }
    this.router.navigate(["todos"]);
  }

  editTodo(todo: ITodo): void {
    //this.router.navigate(["../",  { id: todo.id }], { relativeTo: this.activatedRoute });
    this.router.navigate([`todos/${todo.id}`]);
  }
}
