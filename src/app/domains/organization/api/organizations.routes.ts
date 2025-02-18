import { Routes } from '@angular/router';
import { OrganizationDetailsComponent } from '../feat-details/organization-details/organization-details.component';
import { NotFoundComponent } from '@ui/not-found/not-found.component';
import { MemberListComponent } from '../feat-members/member-list/member-list.component';

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
    component: MemberListComponent,
    title: 'Members',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
