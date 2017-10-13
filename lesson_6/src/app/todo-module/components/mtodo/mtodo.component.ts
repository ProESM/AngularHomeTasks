import { Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import { TodoItemService } from './../../../shared/services/todo-item.service';
import { TagService } from './../../../shared/services/tag.service';

import { ITodo } from './../../../shared/models/itodo';

import { statuses } from './../../../shared/data/status';

@Component({
    selector: 'mtodo',
    templateUrl: './mtodo.component.html',
    styleUrls: ['./mtodo.component.scss'],
    providers: [TodoItemService]
})
export class MTodoComponent implements OnInit, AfterViewInit, OnDestroy {
    private alive: boolean;

    addTagText: string;

    @Input()
    todo: ITodo;

    @Output()
    onSaved = new EventEmitter();

    previousTodo: ITodo;
    validationMessage: string;

    statuses = statuses;
    tags: string[];

    isCanceled: boolean = false;

    public mtodoForm: FormGroup;

    constructor(
        private tagService: TagService,
        private formBuilder: FormBuilder,
        private todoItemService: TodoItemService        
    ) {
        this.alive = true;
        this.tags = this.tagService.tags;
    }

    ngOnInit() {
        let allTags: FormArray = new FormArray([]);

        for (let i = 0; i < this.tags.length; i++) {
            let fg = new FormGroup({});
            fg.addControl(this.tags[i], new FormControl(false))
            allTags.push(fg)
        }

        this.mtodoForm = this.formBuilder.group({
            todoTitle: [this.todo.title, [Validators.required]],
            todoDescription: this.todo.description,
            todoStatus: [this.todo.statusId, [Validators.required]],
            todoTags: allTags
        });

        this.mtodoForm.valueChanges
            //.takeWhile(() => this.alive)
            .subscribe(data => {
                this.todo.title = data.todoTitle;
                this.todo.description = data.todoDescription;
                this.todo.statusId = data.todoStatus;

                this.clearSelectedTags();
                data.todoTags.forEach(tag => {
                    this.onTagChange(Object.keys(tag)[0], tag[Object.keys(tag)[0]]);
                });
            });
    }

    ngAfterViewInit(): void {
        this.previousTodo = this.todo.clone();
    }

    clearSelectedTags() {
        while (this.todo.tags.length > 0) {
            this.todo.tags.pop();
        }
    }

    onTagChange(tag: string, isChecked: boolean): void {
        if (isChecked) {
            this.todo.tags.push(tag);
        } else {
            let index = this.todo.tags.findIndex(x => x == tag);
            if (index >= 0) {
                this.todo.tags.splice(index, 1);
            }
        }
    }

    isChecked(tag: string): boolean {
        let index = this.todo.tags.findIndex(x => x == tag)

        return index >= 0;
    }

    addTag(tag: any): void {
        this.tagService.addTag(tag);

        this.ngOnInit();
    }

    save(event: Event): void {
        event.preventDefault();

        if (!this.isCanceled) {
            if (this.mtodoForm.valid) {
                this.validationMessage = null;

                if (this.todo.id === 'new') {
                    this.todoItemService.addTodo(this.todo).subscribe(() => {
                        this.mtodoForm.reset();
                        this.onSaved.emit(this.todo);
                    });
                } else {
                    this.todoItemService.saveTodo(this.todo)
                        .subscribe(() => {
                            this.mtodoForm.reset();
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

    ngOnDestroy() {
        this.alive = false;
    }
}
