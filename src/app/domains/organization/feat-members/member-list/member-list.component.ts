import { Component, inject, Signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { TableComponent } from '@ui/table/table.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Member } from '../../model/member';
import { MemberStore } from '../../data/member.store';
import { MemberCreateComponent } from '../member-create/member-create.component';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Component({
  selector: 'sf-member-list',
  imports: [Button, Divider, TableComponent, TranslatePipe, MemberCreateComponent, MemberEditComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent {
  memberStore = inject(MemberStore);
  data: Signal<Member[]> = this.memberStore.members;
  showCreateDialog: boolean = false;
  showEditDialog: boolean = false;
  selectedMember?: Member;

  columns = [
    { field: 'firstname', header: 'member.firstname', type: 'string', sort: true },
    { field: 'lastname', header: 'member.lastname', type: 'string', sort: true },
    { field: 'email', header: 'member.email', type: 'string', sort: true },
    { field: 'birthdate', header: 'member.birthdate', type: 'date', sort: true },
  ];

  onEdit(event: Member) {
    this.selectedMember = event;
    this.showEditDialog = true;
  }

  onDelete(member: Member) {
    this.memberStore.removeMember(member?.id);
  }

  addMember() {
    this.showCreateDialog = true;
  }

  onHideCreateDialog(event: boolean) {
    this.showCreateDialog = event;
  }

  onHideEditDialog(event: boolean) {
    this.showEditDialog = event;
  }
}
