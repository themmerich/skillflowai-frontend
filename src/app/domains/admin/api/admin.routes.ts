import { Routes } from '@angular/router';
import { UserListComponent } from '../feat-user/user-list/user-list.component';
import { OrganizationListComponent } from '../feat-orgs/organization-list/organization-list.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserListComponent,
    title: 'User',
  },
  {
    path: 'organizations',
    component: OrganizationListComponent,
    title: 'Organisations',
  },
  {
    path: '**',
    redirectTo: '../not-found',
  },
];
