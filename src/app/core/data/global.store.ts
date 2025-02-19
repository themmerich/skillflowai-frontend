import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { GlobalService } from './global.service';
import { Organization } from '../model/organization';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState({
    themeMode: 'dark',
    language: 'de',
    color: 'emerald',
    organization: {
      id: 1,
      name: '',
    } as Organization,
  }),
  withMethods((state) => {
    const globalService = inject(GlobalService);
    return {
      switchTheme(mode: string): void {
        patchState(state, { themeMode: mode });
      },
      switchLanguage(language: string): void {
        patchState(state, { language: language });
      },
      switchColor(color: string): void {
        patchState(state, { color: color });
      },
      loadOrganization(id: number): void {
        globalService.getById(id).subscribe((organization) => patchState(state, { organization: organization }));
      },
    };
  }),
);
