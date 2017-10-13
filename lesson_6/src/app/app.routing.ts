import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/containers/layout/layout.component';
import { LoginComponent } from './shared/containers/login/login.component';
import { RegistrationComponent } from './shared/containers/registration/registration.component';
import { HomeComponent } from './shared/containers/home/home.component';
//import { TaskViewContainerComponent } from './shared/containers/task-view-container/task-view-container.component';
//import { TasksListContainerComponent } from './shared/containers/tasks-list-container/tasks-list-container.component';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { LeaveGuardService } from './shared/services/leave-guard.service';

export const routes : Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: '',
                component: LayoutComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: '',
                        redirectTo: 'home',
                        pathMatch: 'full'
                    },
                    {
                        path: 'home',
                        component: HomeComponent
                    },
                    {
                        path: 'todos',
                        loadChildren: './todo-module/todo.module#TodoModule'
                    }
                    // {
                    //     path: 'todo/:id',
                    //     component: TaskViewContainerComponent,
                    //     canDeactivate: [LeaveGuardService]
                    // },
                    // {
                    //     path: 'todos',
                    //     component: TasksListContainerComponent
                    // }
                ]
            }
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
]