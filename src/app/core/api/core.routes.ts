import { Routes } from '@angular/router';
import { FaqComponent } from '../feat-faq/faq/faq.component';
import { NotFoundComponent } from '@ui/not-found/not-found.component';
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
