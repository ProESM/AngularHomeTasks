import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { TodoItemService } from './../../services/todo-item.service';
import { TagService } from './../../services/tag.service';

import { ITodo } from './../../models/itodo';
import { Todo } from './../../models/todo';

import { statuses } from './../../data/status';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoItemService]
})
export class TodoComponent implements OnInit, AfterViewInit {
  @Input()
  todo: ITodo;

  @Output()
  onSaved = new EventEmitter();

  statuses = statuses;
  tags: string[];

  constructor(
    private todoItemService: TodoItemService,
    private tagService: TagService
  ) {
    this.tags = this.tagService.tags;
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    
  }

  save(event: Event): void {
    event.preventDefault();
    
    // let todo = new Todo();

    // todo.id = (Math.random() * 1000).toFixed().toString();
    // todo.title = this.todoTitle.value;
    // todo.description = this.todoDescription.value;
    // todo.tags = [];
    // todo.statusId = "1";
    // todo.statusName = "открыто";

    this.todoItemService.saveTodo(this.todo)
    this.onSaved.emit(this.todo);
  }
}
