import { Routes } from '@angular/router';
import { UserListComponent } from '../feat-user/user-list/user-list.component';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: UserListComponent,
    title: 'User',
  },
  {
    path: '**',
    redirectTo: '../not-found',
  },
];
