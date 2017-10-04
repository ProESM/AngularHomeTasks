import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { NgForm } from "@angular/forms";

import { TodoItemService } from './../../../shared/services/todo-item.service';
import { TagService } from './../../../shared/services/tag.service';

import { ITodo } from './../../../shared/models/itodo';
import { Todo } from './../../../shared/models/todo';

import { statuses } from './../../../shared/data/status';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoItemService]
})
export class TodoComponent implements OnInit, AfterViewInit {
  @ViewChild('todoForm', { read: NgForm })
  public todoForm: NgForm;
  
  @Input()
  todo: ITodo;

  previousTodo: ITodo;
  validationMessage: string;

  @Output()
  onSaved = new EventEmitter();

  statuses = statuses;
  tags: string[];

  isCanceled: boolean = false;

  constructor(
    private todoItemService: TodoItemService,
    private tagService: TagService
  ) {
    this.tags = this.tagService.tags;    
  }

  ngOnInit() {}

  ngAfterViewInit(): void { 
    this.previousTodo = this.todo.clone();
  }

  onTagChange(tag:string, isChecked: boolean): void {
    if(isChecked) {
      this.todo.tags.push(tag);
    } else {
      let index = this.todo.tags.findIndex(x => x == tag)
      this.todo.tags.splice(index, 1);
    }
  }

  isChecked(tag:string): boolean {    
    let index = this.todo.tags.findIndex(x => x == tag)
      
    return index >= 0;
  }

  save(event: Event): void {    
    event.preventDefault();
    
    if (!this.isCanceled) {
      if (this.todoForm.valid) {
        this.validationMessage = null;

        if (this.todo.id === 'new') {
          this.todoItemService.addTodo(this.todo).subscribe(() => {
            this.todoForm.reset();
            this.onSaved.emit(this.todo);
          });
        } else {
          this.todoItemService.saveTodo(this.todo)
            .subscribe(() => {
              this.todoForm.reset();
              this.onSaved.emit(this.todo);
            });
        }
      } else {
        this.validationMessage = "Не все поля заполнены!";        
      }
    } else {
      this.validationMessage = null;
      this.previousTodo.copyValuesTo(this.todo);
      event.preventDefault();
      this.onSaved.emit(this.todo);
    }
  }

  rejectCancel(): void {
    this.isCanceled = false;
  }

  cancel(): void {    
    this.isCanceled = true;
  }
}
