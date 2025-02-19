import { Routes } from '@angular/router';
import { NotFoundComponent } from '@ui/not-found/not-found.component';
import { TrainingListComponent } from '../feat-trainings/training-list/training-list.component';

export const trainingRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TrainingListComponent,
    title: 'Trainings',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
