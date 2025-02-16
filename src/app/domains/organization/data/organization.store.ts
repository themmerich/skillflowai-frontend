import { Organization } from '../model/organization';
import { User } from '../../admin/model/user';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { OrganizationsService } from '../api/organizations.service';

interface OrganizationState {
  organization: Organization;
  members: User[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}

const initalState: OrganizationState = {
  organization: {} as Organization,
  members: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const OrganizationStore = signalStore(
  { providedIn: 'root' },
  withState(initalState),
  withMethods((state) => {
    const orgService = inject(OrganizationsService);
    return {
      load(): void {
        orgService.getById(1).subscribe((org) => patchState(state, { organization: org }));
      },
      update(updatedOrg: Organization): void {
        patchState(state, { organization: updatedOrg });
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
