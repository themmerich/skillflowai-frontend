import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberStore } from '../../data/member.store';
import { Member } from '../../model/member';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-member-create',
  imports: [MemberFormComponent, Dialog, TranslatePipe],
  templateUrl: './member-create.component.html',
  styleUrl: './member-create.component.scss',
})
export class MemberCreateComponent {
  @Input() visible: boolean = false;
  @Output() showCreateDialog = new EventEmitter<boolean>();
  @Output() showMessage = new EventEmitter<UpdateMessage>();
  @ViewChild(MemberFormComponent) memberFormComponent!: MemberFormComponent;

  memberStore = inject(MemberStore);

  create(member: Member) {
    member.id = this.getRandomInt(3, 100);
    this.memberStore.addMember(member);

    this.visible = false;
    this.showCreateDialog.emit(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'organization.member.messages.created',
    });
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  cancel() {
    this.visible = false;
    this.showCreateDialog.emit(false);
  }

  resetForm() {
    this.memberFormComponent?.form.reset();
  }
}
