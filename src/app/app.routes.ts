import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './general/not-found/not-found.component';
import { authGuard } from './security/guards/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { RegisterComponent } from './security/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: NavbarComponent,
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
        loadChildren: () => import('./organizations/organizations.routes').then((m) => m.organizationsRoutes),
      },
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () => import('./user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'general',
        canActivate: [authGuard],
        loadChildren: () => import('./general/general.routes').then((m) => m.generalRoutes),
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
