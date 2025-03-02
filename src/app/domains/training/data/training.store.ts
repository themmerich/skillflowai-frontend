import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Training } from '../model/training';
import { TrainingService } from './training.service';
import { Lesson } from '../model/lesson';

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
      loadById(id: string): Training | undefined {
        return state.trainings().find((training) => training.id === id);
      },
      loadLessonById(id: string): Lesson | undefined {
        return state
          .trainings()
          .flatMap((training) => training.lessons)
          .find((lesson) => lesson.id === id);
      },
      addTraining(training: Training): void {
        patchState(state, { trainings: [...state.trainings(), training] });
      },
      removeTraining(trainingId: string | undefined): void {
        if (trainingId) {
          patchState(state, { trainings: state.trainings().filter((training) => training.id !== trainingId) });
        }
      },
      removeLesson(lessonId: string | undefined, trainingId: string | undefined): void {
        if (trainingId && lessonId) {
          const training = this.loadById(trainingId);
          if (training) {
            training.lessons = training.lessons.filter((lesson) => lesson.id !== lessonId);
            this.updateTraining(training);
          }
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
