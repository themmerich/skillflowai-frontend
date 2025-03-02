import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { OrganizationStore } from '../../data/organization.store';
import { Textarea } from 'primeng/textarea';
import { Divider } from 'primeng/divider';
import { Organization } from '../../model/organization';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { Image } from 'primeng/image';

@Component({
  selector: 'sf-organization-details',
  imports: [Button, FloatLabel, InputText, ReactiveFormsModule, TranslatePipe, Textarea, Divider, Toast, FileUpload, Image],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.scss',
  providers: [MessageService],
})
export class OrganizationDetailsComponent implements OnInit {
  orgStore = inject(OrganizationStore);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);

  profileImage: string = '';

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
    const org = this.orgStore.organization();
    this.orgForm.patchValue(org);
    this.profileImage = this.getProfileImage(org);
  }

  getProfileImage(org: Organization): string {
    return org.profileImg ? 'organization/' + org.profileImg : 'organization/noImage.jpg';
  }

  onUpload(event: FileUploadEvent): void {
    console.log(event);
    this.translateService.get(['shared.message.success', 'organization.details.messages.updated']).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['shared.message.success'],
        detail: translations['organization.details.messages.updated'],
      });
    });
  }

  onSubmit() {
    const formValue = this.orgForm.getRawValue();
    const org: Organization = {
      ...formValue,
      profileImg: this.profileImage,
    };
    this.orgStore.update(org);

    this.orgForm.markAsPristine();
    this.orgForm.markAsUntouched();

    this.translateService.get(['shared.message.success', 'organization.details.messages.updated']).subscribe((translations) => {
      this.messageService.add({
        severity: 'success',
        summary: translations['shared.message.success'],
        detail: translations['organization.details.messages.updated'],
      });
    });
  }
}
