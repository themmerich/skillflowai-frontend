import { Component, inject, signal, Signal } from '@angular/core';
import { TableComponent } from '@ui/table/table.component';
import { User } from '../../model/user';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserStore } from '../../data/user.store';
import { Divider } from 'primeng/divider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Toast } from 'primeng/toast';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { MessageService } from 'primeng/api';
import { UpdateMessage } from '../../../../shared/model/update-message';

@Component({
  selector: 'sf-user-list',
  imports: [TableComponent, UserCreateComponent, UserEditComponent, Divider, TranslatePipe, Toast, ToolbarComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [MessageService],
})
export class UserListComponent {
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  userStore = inject(UserStore);

  data: Signal<User[]> = this.userStore.users;
  showCreateDialog = signal(false);
  showEditDialog = signal(false);
  selectedUser?: User;

  columns = [
    { field: 'firstname', header: 'admin.user.firstname', type: 'string', sort: true },
    { field: 'lastname', header: 'admin.user.lastname', type: 'string', sort: true },
    { field: 'email', header: 'admin.user.email', type: 'string', sort: true },
    { field: 'birthdate', header: 'admin.user.birthdate', type: 'date', sort: true },
    { field: 'roles', header: 'admin.user.roles', type: 'options', sort: false },
  ];

  onEdit(event: User) {
    this.selectedUser = event;
    this.showEditDialog.set(true);
  }

  onDelete(user: User) {
    this.userStore.removeUser(user?.id);
    this.showSuccessMessage('admin.user.messages.deleted');
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
