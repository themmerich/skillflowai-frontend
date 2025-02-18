import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Member } from '../model/member';
import { MemberService } from './member.service';

interface MemberState {
  members: Member[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}

const initalState: MemberState = {
  members: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const MemberStore = signalStore(
  { providedIn: 'root' },
  withState(initalState),
  /*withEntities({
    entity: type<User>(),
    collection: 'user',
  }),*/
  withMethods((state) => {
    const memberService = inject(MemberService);
    return {
      load(): void {
        memberService.getAll().subscribe((members) => patchState(state, { members: members }));
      },
      addMember(member: Member): void {
        patchState(state, { members: [...state.members(), member] });
      },
      removeMember(memberId: number | undefined): void {
        if (memberId) {
          patchState(state, { members: state.members().filter((user) => user.id !== memberId) });
        }
      },
      updateMember(updatedMember: Member): void {
        patchState(state, {
          members: state.members().map((member) => (member.id === updatedMember.id ? updatedMember : member)),
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
