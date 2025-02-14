import { Routes } from '@angular/router';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';

export const organizationsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full',
  },
  {
    path: 'details',
    component: OrganizationDetailsComponent,
    title: 'Organisation',
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
