import { Component, inject, Signal } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { User } from '../../model/user';
import { Button } from 'primeng/button';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserStore } from '../../data/user.store';
import { Divider } from 'primeng/divider';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-user-list',
  imports: [TableComponent, Button, UserCreateComponent, UserEditComponent, Divider, TranslatePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  userStore = inject(UserStore);
  data: Signal<User[]> = this.userStore.users;
  showCreateDialog: boolean = false;
  showEditDialog: boolean = false;
  selectedUser?: User;

  columns = [
    { field: 'firstname', header: 'user.firstname', type: 'string', sort: true },
    { field: 'lastname', header: 'user.lastname', type: 'string', sort: true },
    { field: 'email', header: 'user.email', type: 'string', sort: true },
    { field: 'birthdate', header: 'user.birthdate', type: 'date', sort: true },
    { field: 'roles', header: 'user.roles', type: 'roles', sort: false },
  ];

  onEdit(event: User) {
    this.selectedUser = event;
    this.showEditDialog = true;
  }

  onDelete(user: User) {
    this.userStore.removeUser(user?.id);
  }

  addUser() {
    this.showCreateDialog = true;
  }

  onHideCreateDialog(event: boolean) {
    this.showCreateDialog = event;
  }

  onHideEditDialog(event: boolean) {
    this.showEditDialog = event;
  }
}
