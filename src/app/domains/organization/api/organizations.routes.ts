import { Routes } from '@angular/router';
import { OrganizationDetailsComponent } from '../feat-details/organization-details/organization-details.component';
import { NotFoundComponent } from '@ui/not-found/not-found.component';

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
    path: '**',
    component: NotFoundComponent,
  },
];
