import { Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/takeWhile';

import { TodoItemService } from './../../../shared/services/todo-item.service';
import { TagService } from './../../../shared/services/tag.service';

import { ITodo } from './../../../shared/models/itodo';
import { ITodoFilter, TodoFilter } from './../../../shared/models/todo-filter';

import { statuses } from './../../../shared/data/status';

@Component({
    selector: 'todo-filter',
    templateUrl: './todo-filter.component.html',
    styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit, AfterViewInit, OnDestroy {
    private alive: boolean;

    @Input()
    todoFilter: ITodoFilter;

    @Output()
    onApplied = new EventEmitter();

    validationMessage: string;

    @ViewChild('todoFilterForm', { read: NgForm })
    public todoFilterForm: NgForm;

    constructor() {
        this.alive = true;
    }

    ngOnInit() {}

    ngAfterViewInit(): void {
        
    }

    apply(event: Event): void {
        event.preventDefault();

        if (this.todoFilterForm.valid) {
            this.validationMessage = null;

            let newTodoFilter = new TodoFilter();
            newTodoFilter.id = this.todoFilter.id;
            newTodoFilter.title = this.todoFilter.title;
            newTodoFilter.tags = [];

            if (this.todoFilter.tags !== undefined && this.todoFilter.tags !== null) {
                this.todoFilter.tags.forEach(tag => {
                    newTodoFilter.tags.push(tag);
                });
            }

            //this.todoFilterForm.reset();
            this.onApplied.emit(newTodoFilter);
        } else {
            this.validationMessage = "Не все поля заполнены!";
        }
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
