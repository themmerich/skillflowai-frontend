import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AddressAutocompleteComponent } from '@ui/address-autocomplete/address-autocomplete.component';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Member } from '../../model/member';

@Component({
  selector: 'sf-member-form',
  imports: [AddressAutocompleteComponent, Button, DatePicker, FloatLabel, InputText, Message, ReactiveFormsModule, TranslatePipe],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss',
})
export class MemberFormComponent implements OnChanges {
  @Input() member?: Member;
  @Output() submitMember = new EventEmitter<Member>();
  @Output() cancelMember = new EventEmitter<void>();

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
    if (this.member) {
      this.form.reset();
      this.form.patchValue(this.member);
    } else {
      this.form.reset();
      this.form.controls.firstname.markAsPristine();
      this.form.controls.firstname.markAsUntouched();
    }
  }

  getFirstnameErrorMessage(): string {
    const control = this.form.controls.firstname;
    if (control.errors?.['required']) return 'organization.member.error.firstnameRequired';
    return '';
  }

  getLastnameErrorMessage(): string {
    const control = this.form.controls.lastname;
    if (control.errors?.['required']) return 'organization.member.error.lastnameRequired';
    return '';
  }

  getEmailErrorMessage(): string {
    const control = this.form.controls.email;
    if (control.errors?.['required']) return 'organization.member.error.emailRequired';
    if (control.errors?.['email']) return 'organization.member.error.emailInvalid';
    return '';
  }

  getRolesErrorMessage(): string {
    return '';
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const newMember: Member = {
      ...formValue,
    };
    this.submitMember.emit(newMember);
  }

  onCancel() {
    this.cancelMember.emit();
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
