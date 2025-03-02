import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Role } from '../../model/role';
import { User } from '../../model/user';
import { RoleService } from '../../data/role.service';
import { Subject, takeUntil } from 'rxjs';
import { FormDateComponent } from '@ui/form-date/form-date.component';
import { FormInputComponent } from '@ui/form-input/form-input.component';
import { FormMultiselectComponent } from '@ui/form-multiselect/form-multiselect.component';

@Component({
  selector: 'sf-user-form',
  imports: [Button, ReactiveFormsModule, TranslatePipe, FormDateComponent, FormInputComponent, FormMultiselectComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() user?: User;
  @Output() submitUser = new EventEmitter<User>();
  @Output() cancelUser = new EventEmitter<void>();

  roleService = inject(RoleService);
  availableRoles: Role[] = [];
  private destroy$ = new Subject<void>();

  form = new FormGroup({
    firstname: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    lastname: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    birthdate: new FormControl<Date | null>(null),
    roles: new FormControl<Role[]>([], {
      nonNullable: true,
    }),
  });

  ngOnChanges() {
    if (this.user) {
      this.form.reset();
      this.form.patchValue(this.user);
    } else {
      this.form.reset();
      this.form.controls.firstname.markAsPristine();
      this.form.controls.firstname.markAsUntouched();
    }
  }

  ngOnInit(): void {
    this.roleService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles) => {
        this.availableRoles = roles;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const newUser: User = {
      ...formValue,
    };
    this.submitUser.emit(newUser);
  }

  onCancel() {
    this.cancelUser.emit();
  }
}
