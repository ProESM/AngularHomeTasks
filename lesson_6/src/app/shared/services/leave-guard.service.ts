import { Injectable } from '@angular/core';
import { Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskViewContainerComponent } from './../../todo-module/containers/task-view-container/task-view-container.component';

@Injectable()
export class LeaveGuardService implements CanDeactivate<TaskViewContainerComponent> {
  constructor(
    private router: Router
  ) {
    
  }

  canDeactivate(component: TaskViewContainerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('component=', component);
    // console.log('component.editingTodoComponent=', component.editingTodoComponent);
    // console.log('component.editingTodoComponent.todoForm=', component.editingTodoComponent.todoForm);
    // console.log('component.todoForm.dirty=', component.todoForm.dirty);

    if (component.editingTodoComponent !== undefined && component.editingTodoComponent !== null) {
      if (component.editingTodoComponent.mtodoForm.dirty) {
        return window.confirm('У вас есть несохраненные изменения. Вы уверены, что хотите выйти?');
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}