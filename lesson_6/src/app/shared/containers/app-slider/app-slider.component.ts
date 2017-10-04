import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { ITodo } from './../../models/itodo';

@Component({
    selector: 'app-slider',
    templateUrl: './app-slider.component.html',
    styleUrls: ['./app-slider.component.scss']
  })
  export class AppSliderComponent implements OnInit, AfterViewInit {
    @Input()
    todos: ITodo[];

    @Input()
    maxVisibleCount: number;

    @Input()
    verticalDirection: boolean;

    public visibleTodos: ITodo[];

    public visibleStartIndex: number = 0;

    constructor() {
      
    }

    public getVisibleTodos(): void {
      if (this.visibleTodos !== undefined) {
        while(this.visibleTodos.length > 0) {
          this.visibleTodos.pop();
        }
      } else {
        this.visibleTodos = [];
      }

      let visibleEndIndex = this.visibleStartIndex + this.maxVisibleCount;

      if (visibleEndIndex > this.todos.length) {
        visibleEndIndex = this.todos.length;
      }

      for (let i = this.visibleStartIndex; i < visibleEndIndex; i++) {
        this.visibleTodos.push(this.todos[i]);
      }
    }
  
    ngOnInit() {
      this.getVisibleTodos();
    }

    ngAfterViewInit(): void {
    }

    scrolLeft(): void {
      if (this.visibleStartIndex > 0) {
        this.visibleStartIndex--;
      }
      
      this.getVisibleTodos();
    }

    scrollRight(): void {
      if (this.visibleStartIndex < (this.todos.length - this.maxVisibleCount)) {
        this.visibleStartIndex++;
      }

      this.getVisibleTodos();
    }
  }
  