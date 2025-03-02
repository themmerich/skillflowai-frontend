import { Component, inject, signal, Signal } from '@angular/core';
import { Divider } from 'primeng/divider';
import { TableComponent } from '@ui/table/table.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Member } from '../../model/member';
import { MemberStore } from '../../data/member.store';
import { MemberCreateComponent } from '../member-create/member-create.component';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { UpdateMessage } from '../../../../shared/model/update-message';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'sf-member-list',
  imports: [Divider, TableComponent, TranslatePipe, MemberCreateComponent, MemberEditComponent, ToolbarComponent, Toast],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
  providers: [MessageService],
})
export class MemberListComponent {
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  memberStore = inject(MemberStore);

  data: Signal<Member[]> = this.memberStore.members;
  showCreateDialog = signal(false);
  showEditDialog = signal(false);
  selectedMember?: Member;

  columns = [
    { field: 'firstname', header: 'organization.member.firstname', type: 'string', sort: true },
    { field: 'lastname', header: 'organization.member.lastname', type: 'string', sort: true },
    { field: 'email', header: 'organization.member.email', type: 'string', sort: true },
    { field: 'birthdate', header: 'organization.member.birthdate', type: 'date', sort: true },
  ];

  onEdit(event: Member) {
    this.selectedMember = event;
    this.showEditDialog.set(true);
  }

  onDelete(member: Member) {
    this.memberStore.removeMember(member?.id);
    this.showSuccessMessage('organization.member.messages.deleted');
  }

  showMessage(event: UpdateMessage) {
    if (event.severity === 'success') {
      this.showSuccessMessage(event.message);
    }
  }

  private showSuccessMessage(detailMessage: string) {
    this.translateService.get(['shared.message.success', detailMessage]).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['shared.message.success'],
        detail: translations[detailMessage],
      });
    });
  }
}
