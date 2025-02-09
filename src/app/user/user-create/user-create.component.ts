import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../shared/user';

@Component({
  selector: 'sf-user-create',
  imports: [Dialog, TranslatePipe, ReactiveFormsModule, UserFormComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  @Input() visible: boolean = false;
  @Output() showCreateDialog = new EventEmitter<boolean>();

  create(user: User) {
    // TODO: save to signals store
    this.visible = false;
    this.showCreateDialog.emit(false);
  }

  cancel() {
    this.visible = false;
    this.showCreateDialog.emit(false);
  }
}
