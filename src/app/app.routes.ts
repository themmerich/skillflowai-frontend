import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './general/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'organizations',
    loadChildren: () => import('./organizations/organizations.routes').then((m) => m.organizationsRoutes),
  },
  {
    path: 'general',
    loadChildren: () => import('./general/general.routes').then((m) => m.generalRoutes),
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404',
  },
];
