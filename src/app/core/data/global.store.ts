import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState({
    themeMode: 'dark',
    language: 'de',
    color: 'emerald',
  }),
  withMethods((state) => {
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
    };
  }),
);
