import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Member } from '../../model/member';
import { FormInputComponent } from '@ui/form-input/form-input.component';
import { FormAddressComponent } from '@ui/form-address/form-address.component';
import { FormDateComponent } from '@ui/form-date/form-date.component';

@Component({
  selector: 'sf-member-form',
  imports: [Button, ReactiveFormsModule, TranslatePipe, FormInputComponent, FormAddressComponent, FormDateComponent],
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
    title: new FormControl<string>('', {
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
    phoneWork: new FormControl<string>('', {
      nonNullable: true,
    }),
    phonePrivate: new FormControl<string>('', {
      nonNullable: true,
    }),
    mobile: new FormControl<string>('', {
      nonNullable: true,
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
