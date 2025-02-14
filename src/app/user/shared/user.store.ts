import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { User } from './user';
import { inject } from '@angular/core';
import { UserService } from './user.service';

type UserState = {
  users: User[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initalState: UserState = {
  users: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initalState),
  /*withEntities({
    entity: type<User>(),
    collection: 'user',
  }),*/
  withMethods((state) => {
    const userService = inject(UserService);
    return {
      load(): void {
        userService.getAll().subscribe((users) => patchState(state, { users: users }));
      },
      addUser(user: User): void {
        patchState(state, { users: [...state.users(), user] });
      },
      removeUser(userId: number | undefined): void {
        if (userId) {
          patchState(state, { users: state.users().filter((user) => user.id !== userId) });
        }
      },
      updateUser(updatedUser: User): void {
        patchState(state, {
          users: state.users().map((user) => (user.id === updatedUser.id ? updatedUser : user)),
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
