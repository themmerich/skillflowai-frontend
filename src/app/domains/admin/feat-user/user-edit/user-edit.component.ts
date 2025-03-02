import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../model/user';
import { UserStore } from '../../data/user.store';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-user-edit',
  imports: [Dialog, TranslatePipe, UserFormComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent {
  @Input() visible: boolean = false;
  @Input() user?: User;
  @Output() showEditDialog = new EventEmitter<boolean>();
  @Output() showMessage = new EventEmitter<UpdateMessage>();

  userStore = inject(UserStore);

  update(user: User) {
    this.userStore.updateUser(user);

    this.visible = false;
    this.showEditDialog.emit(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'admin.user.messages.updated',
    });
  }

  cancel() {
    this.visible = false;
    this.showEditDialog.emit(false);
  }
}
