import { Component, inject } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { Button } from 'primeng/button';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'sf-user-list',
  imports: [TableComponent, Button, UserCreateComponent, UserEditComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  userService = inject(UserService);
  data: User[] = [];
  showCreateDialog: boolean = false;
  showEditDialog: boolean = false;
  selectedUser?: User;

  columns = [
    { field: 'firstname', header: 'user.firstname', type: 'string' },
    { field: 'lastname', header: 'user.lastname', type: 'string' },
    { field: 'email', header: 'user.email', type: 'string' },
    { field: 'birthdate', header: 'user.birthdate', type: 'date' },
    { field: 'created', header: 'user.created', type: 'date' },
  ];

  constructor() {
    this.userService.getAll().subscribe((data) => (this.data = data));
  }

  addUser() {
    this.showCreateDialog = true;
  }

  onShowCreateDialog(event: boolean) {
    this.showCreateDialog = event;
  }

  onShowEditDialog(event: boolean) {
    this.showEditDialog = event;
  }

  onRowSelect(event: User) {
    this.selectedUser = event;
    this.showEditDialog = true;
  }
}
