import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Training } from '../model/training';
import { TrainingService } from './training.service';

export const TrainingStore = signalStore(
  { providedIn: 'root' },
  withState({
    trainings: [] as Training[],
    isLoading: false,
    filter: { query: '', order: 'asc' },
  }),
  /*withEntities({
    entity: type<User>(),
    collection: 'user',
  }),*/
  withMethods((state) => {
    const trainingService = inject(TrainingService);
    return {
      load(): void {
        trainingService.getAll().subscribe((trainings) => patchState(state, { trainings: trainings }));
      },
      addTraining(training: Training): void {
        patchState(state, { trainings: [...state.trainings(), training] });
      },
      removeTraining(trainingId: number | undefined): void {
        if (trainingId) {
          patchState(state, { trainings: state.trainings().filter((training) => training.id !== trainingId) });
        }
      },
      updateTraining(updatedTraining: Training): void {
        patchState(state, {
          trainings: state.trainings().map((training) => (training.id === updatedTraining.id ? updatedTraining : training)),
        });
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
