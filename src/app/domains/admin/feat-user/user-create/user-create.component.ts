import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../model/user';
import { UserStore } from '../../data/user.store';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-user-create',
  imports: [Dialog, TranslatePipe, ReactiveFormsModule, UserFormComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Input() visible: boolean = false;
  @Output() showCreateDialog = new EventEmitter<boolean>();
  @Output() showMessage = new EventEmitter<UpdateMessage>();
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  userStore = inject(UserStore);

  create(user: User) {
    user.id = crypto.randomUUID();
    this.userStore.addUser(user);

    this.visible = false;
    this.showCreateDialog.emit(false);

    this.showMessage.emit({
      severity: 'success',
      message: 'admin.user.messages.created',
    });
  }

  cancel() {
    this.visible = false;
    this.showCreateDialog.emit(false);
  }

  resetForm() {
    this.userFormComponent?.form.reset();
  }
}
