import { Routes } from '@angular/router';
import { OrganizationListComponent } from '../../admin/feat-orgs/organization-list/organization-list.component';
import { OrganizationDetailsComponent } from '../feat-details/organization-details/organization-details.component';

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
