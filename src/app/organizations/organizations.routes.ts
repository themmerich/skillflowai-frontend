import { Routes } from '@angular/router';
import { OrganizationListComponent } from './organization-list/organization-list.component';

export const organizationsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: OrganizationListComponent,
    title: 'Organisations',
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
