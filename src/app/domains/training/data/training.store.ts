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
      loadOrCreateTraining(id: string | undefined): Training {
        const newTraining = {
          name: '',
          description: '',
          defaultInterval: null,
          lessons: [],
        } as Training;

        if (id) {
          const training = state.trainings().find((training) => training.id === id);
          return training ? training : newTraining;
        }
        return newTraining;
      },
      updateTraining(updatedTraining: Training): void {
        patchState(state, {
          trainings: state.trainings().map((training) => (training.id === updatedTraining.id ? updatedTraining : training)),
        });
      },
      addTraining(training: Training): void {
        patchState(state, { trainings: [...state.trainings(), training] });
      },
      removeTraining(trainingId: string | undefined): void {
        if (trainingId) {
          patchState(state, { trainings: state.trainings().filter((training) => training.id !== trainingId) });
        }
      },
      loadOrCreateLesson(id: string | undefined): Lesson {
        const newLesson = {
          name: '',
          description: '',
          materials: [],
        } as Lesson;

        if (id) {
          const lesson = state
            .trainings()
            .flatMap((training) => training.lessons)
            .find((lesson) => lesson.id === id);
          return lesson ? lesson : newLesson;
        }
        return newLesson;
      },
      updateLessons(trainingId: string | undefined, lessons: Lesson[]): void {
        if (trainingId) {
          const training = this.loadOrCreateTraining(trainingId);
          training.lessons = lessons;
          this.updateTraining(training);
        }
      },
      removeLesson(lessonId: string | undefined, trainingId: string | undefined): void {
        if (trainingId && lessonId) {
          const training = this.loadOrCreateTraining(trainingId);
          if (training) {
            training.lessons = training.lessons.filter((lesson) => lesson.id !== lessonId);
            this.updateTraining(training);
          }
        }
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
