import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { LeaveGuardService } from '../shared/services/leave-guard.service';
import { TagService } from '../shared/services/tag.service';
import { TodoItemService } from '../shared/services/todo-item.service';
import { TodoItemsService } from '../shared/services/todo-items.service';

import { AppSliderComponent } from './containers/app-slider/app-slider.component';
import { ItemComponent } from './components/item/item.component';
import { TodoComponent } from './components/todo/todo.component';

import { TaskViewContainerComponent } from './containers/task-view-container/task-view-container.component';
import { TasksListContainerComponent } from './containers/tasks-list-container/tasks-list-container.component';

export const routes: Route[] = [
  {
    path: '',
    component: TasksListContainerComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: TaskViewContainerComponent,
    canDeactivate: [LeaveGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AppSliderComponent,
    ItemComponent,
    TodoComponent,
    TaskViewContainerComponent,
    TasksListContainerComponent
  ],
  providers: [
    AuthGuardService,
    LeaveGuardService,
    TagService,
    TodoItemService,
    TodoItemsService,
  ]
})
export class TodoModule { }
