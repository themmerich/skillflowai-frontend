import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { MultiSelect } from 'primeng/multiselect';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Role } from '../../model/role';
import { User } from '../../model/user';
import { RoleService } from '../../data/role.service';
import { Subject, takeUntil } from 'rxjs';
import { AddressAutocompleteComponent } from '@ui/address-autocomplete/address-autocomplete.component';

@Component({
  selector: 'sf-user-form',
  imports: [
    Button,
    DatePicker,
    FloatLabel,
    InputText,
    Message,
    MultiSelect,
    ReactiveFormsModule,
    TranslatePipe,
    AddressAutocompleteComponent,
  ],
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
    id: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
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
    address: new FormGroup({
      street: new FormControl<string>('', {
        nonNullable: true,
      }),
      number: new FormControl<string>('', {
        nonNullable: true,
      }),
      zip: new FormControl<string>('', {
        nonNullable: true,
      }),
      city: new FormControl<string>('', {
        nonNullable: true,
      }),
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

  getFirstnameErrorMessage(): string {
    const control = this.form.controls.firstname;
    if (control.errors?.['required']) return 'admin.user.error.firstnameRequired';
    return '';
  }

  getLastnameErrorMessage(): string {
    const control = this.form.controls.lastname;
    if (control.errors?.['required']) return 'admin.user.error.lastnameRequired';
    return '';
  }

  getEmailErrorMessage(): string {
    const control = this.form.controls.email;
    if (control.errors?.['required']) return 'admin.user.error.emailRequired';
    if (control.errors?.['email']) return 'admin.user.error.emailInvalid';
    return '';
  }

  getRolesErrorMessage(): string {
    return '';
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

  updateAddress(event: any) {
    this.form.patchValue({
      address: {
        street: event.route,
        number: event.street_number,
        zip: event.postal_code,
        city: event.locality,
      },
    });
  }
}
