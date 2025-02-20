import { Routes } from '@angular/router';
import { DashboardComponent } from './core/feat-dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from '@ui/not-found/not-found.component';
import { authGuard } from './shared/security/guards/auth.guard';
import { ShellComponent } from './core/feat-navigation/shell/shell.component';
import { Login2Component } from './core/feat-login/login2/login2.component';
import { Register2Component } from './core/feat-login/register2/register2.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ShellComponent,
    title: 'SkillFlowAI',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        title: 'Dashboard',
      },
      {
        path: 'core',
        canActivate: [authGuard],
        loadChildren: () => import('./core/api/core.routes').then((m) => m.coreRoutes),
      },
      {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/admin/api/admin.routes').then((m) => m.adminRoutes),
      },
      {
        path: 'organization',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/organization/api/organizations.routes').then((m) => m.organizationsRoutes),
      },
      {
        path: 'training',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/training/api/training.routes').then((m) => m.trainingRoutes),
      },
    ],
  },
  {
    path: 'register/:organizationId',
    component: Register2Component,
    title: 'Register',
  },
  {
    path: 'register',
    component: Register2Component,
    title: 'Register',
  },
  {
    path: 'login',
    component: Login2Component,
    title: 'Login',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404',
  },
];
