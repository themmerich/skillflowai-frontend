import { Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

export const generalRoutes: Routes = [
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
