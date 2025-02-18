import { Routes } from '@angular/router';
import { DashboardComponent } from './core/feat-dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from '@ui/not-found/not-found.component';
import { authGuard } from './shared/security/guards/auth.guard';
import { RegisterComponent } from './core/feat-login/register/register.component';
import { Navbar2Component } from './core/feat-navigation/navbar2/navbar2.component';
import { Login2Component } from './core/feat-login/login2/login2.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Navbar2Component,
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
        path: 'organization',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/organization/api/organizations.routes').then((m) => m.organizationsRoutes),
      },
      {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/admin/api/admin.routes').then((m) => m.adminRoutes),
      },
      {
        path: 'core',
        canActivate: [authGuard],
        loadChildren: () => import('./core/api/core.routes').then((m) => m.coreRoutes),
      },
    ],
  },
  {
    path: 'register/:organizationId',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'register',
    component: RegisterComponent,
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
