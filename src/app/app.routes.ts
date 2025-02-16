import { Routes } from '@angular/router';
import { DashboardComponent } from './core/feat-dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from './core/feat-about/not-found/not-found.component';
import { authGuard } from './shared/security/guards/auth.guard';
import { LoginComponent } from './core/feat-login/login/login.component';
import { RegisterComponent } from './core/feat-register/register/register.component';
import { Navbar2Component } from './core/feat-navigation/navbar2/navbar2.component';

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
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () => import('./domains/admin/api/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'general',
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
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404',
  },
];
