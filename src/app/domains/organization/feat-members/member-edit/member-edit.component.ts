import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { MemberFormComponent } from '../member-form/member-form.component';
import { Member } from '../../model/member';
import { MemberStore } from '../../data/member.store';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-member-edit',
  imports: [Dialog, TranslatePipe, MemberFormComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss',
})
export class MemberEditComponent {
  @Input() visible: boolean = false;
  @Input() member?: Member;
  @Output() showEditDialog = new EventEmitter<boolean>();
  @Output() showMessage = new EventEmitter<UpdateMessage>();

  memberStore = inject(MemberStore);

  update(member: Member) {
    this.memberStore.updateMember(member);

    this.visible = false;
    this.showEditDialog.emit(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'organization.member.messages.updated',
    });
  }

  cancel() {
    this.visible = false;
    this.showEditDialog.emit(false);
  }
}
