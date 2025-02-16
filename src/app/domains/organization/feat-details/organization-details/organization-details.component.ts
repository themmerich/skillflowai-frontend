import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { OrganizationStore } from '../../data/organization.store';
import { AddressAutocompleteComponent } from '../../../../shared/components/address-autocomplete/address-autocomplete.component';
import { Textarea } from 'primeng/textarea';
import { Divider } from 'primeng/divider';
import { Organization } from '../../model/organization';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'sf-organization-details',
  imports: [Button, FloatLabel, InputText, ReactiveFormsModule, TranslatePipe, AddressAutocompleteComponent, Textarea, Divider, Toast],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.scss',
  providers: [MessageService],
})
export class OrganizationDetailsComponent implements OnInit {
  orgStore = inject(OrganizationStore);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);

  orgForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    website: new FormControl('', {
      nonNullable: true,
    }),
    phone: new FormControl('', {
      nonNullable: true,
    }),
    email: new FormControl('', {
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
    notes: new FormControl('', {
      nonNullable: true,
    }),
  });

  ngOnInit() {
    this.orgForm.patchValue(this.orgStore.organization());
  }

  updateAddress(event: any) {
    this.orgForm.patchValue({
      address: {
        street: event.route,
        number: event.street_number,
        zip: event.postal_code,
        city: event.locality,
      },
    });
  }

  onSubmit() {
    const formValue = this.orgForm.getRawValue();
    const org: Organization = {
      ...formValue,
    };
    this.orgStore.update(org);

    this.translateService.get(['message.success', 'organization.messages.updated']).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['message.success'],
        detail: translations['organization.messages.updated'],
      });
    });
  }
}
