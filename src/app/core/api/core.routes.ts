import { Routes } from '@angular/router';
import { FaqComponent } from '../feat-about/faq/faq.component';
import { NotFoundComponent } from '../feat-about/not-found/not-found.component';
import { AboutComponent } from '../feat-about/about/about.component';

export const coreRoutes: Routes = [
  {
    path: 'faq',
    component: FaqComponent,
    title: 'FAQ',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: '404 - Page not found',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
