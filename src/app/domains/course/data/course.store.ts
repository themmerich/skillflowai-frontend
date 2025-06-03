import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from './course.service';
import { Lesson } from '../model/lesson';

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  filter: { query: string; order: string };
}

const initialState: CourseState = {
  courses: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const CourseStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  /*withEntities({
    entity: type<User>(),
    collection: 'user',
  }),*/
  withMethods((state) => {
    const courseService = inject(CourseService);
    return {
      load(): void {
        courseService.getAll().subscribe((courses) => patchState(state, { courses: courses }));
      },
      loadOrCreateCourse(id: string | undefined): Course {
        const newCourse = {
          tenantId: 'blubb',
          title: '',
          description: '',
          repeatInterval: undefined,
          status: 'DRAFT',
          lessons: [],
          enrolledUsers: [],
        } as Course;

        if (id) {
          const course = state.courses().find((course) => course.id === id);
          return course ? course : newCourse;
        }
        return newCourse;
      },
      updateCourse(updatedCourse: Course): void {
        patchState(state, {
          courses: state.courses().map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
        });
      },
      addCourse(course: Course): void {
        patchState(state, { courses: [...state.courses(), course] });
      },
      removeCourse(courseId: string | undefined): void {
        if (courseId) {
          patchState(state, { courses: state.courses().filter((course) => course.id !== courseId) });
        }
      },
      loadOrCreateLesson(id: string | undefined): Lesson {
        const newLesson = {
          title: '',
          description: '',
          content: [],
        } as Lesson;

        if (id) {
          const lesson = state
            .courses()
            .flatMap((course) => course.lessons)
            .find((lesson) => lesson.id === id);
          return lesson ? lesson : newLesson;
        }
        return newLesson;
      },
      updateLessons(courseId: string | undefined, lessons: Lesson[]): void {
        if (courseId) {
          const course = this.loadOrCreateCourse(courseId);
          course.lessons = lessons;
          this.updateCourse(course);
        }
      },
      removeLesson(lessonId: string | undefined, courseId: string | undefined): void {
        if (courseId && lessonId) {
          const course = this.loadOrCreateCourse(courseId);
          if (course) {
            course.lessons = course.lessons.filter((lesson) => lesson.id !== lessonId);
            this.updateCourse(course);
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
