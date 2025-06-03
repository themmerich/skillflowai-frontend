import { Routes } from '@angular/router';
import { NotFoundComponent } from '@ui/not-found/not-found.component';
import { CourseListComponent } from '../feat-courses/course-list/course-list.component';

export const coursesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: CourseListComponent,
    title: 'Courses',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
