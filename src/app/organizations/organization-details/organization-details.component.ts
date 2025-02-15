import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { OrganizationStore } from '../shared/organization.store';
import { AddressAutocompleteComponent, MappedAddress } from '../../shared/components/address-autocomplete/address-autocomplete.component';
import { Textarea } from 'primeng/textarea';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'sf-organization-details',
  imports: [Button, FloatLabel, InputText, ReactiveFormsModule, TranslatePipe, AddressAutocompleteComponent, Textarea, Divider],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.scss',
})
export class OrganizationDetailsComponent implements OnInit {
  orgStore = inject(OrganizationStore);

  orgForm = new FormGroup({
    name: new FormControl('', Validators.required),
    website: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
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
    notes: new FormControl(''),
  });

  ngOnInit() {
    this.orgForm.patchValue(this.orgStore.organization());
  }

  updateAddress(event: MappedAddress) {}
}
