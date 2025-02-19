import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalStore } from '../../data/global.store';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-register2',
  imports: [ButtonDirective, FormsModule, InputText, ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './register2.component.html',
  styleUrl: './register2.component.scss',
})
export class Register2Component implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  globalStore = inject(GlobalStore);

  registerForm = new FormGroup({
    organization: new FormControl(
      { value: '', disabled: true },
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
        nonNullable: true,
      },
    ),
    firstname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
    lastname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
  });

  ngOnInit() {
    const organizationId = this.route.snapshot.paramMap.get('organizationId');

    if (organizationId) {
      this.globalStore.loadOrganization(Number(organizationId));
      const orgName = this.globalStore.organization.name();
      this.registerForm.controls.organization.setValue(orgName);
    } else {
      this.registerForm.controls.organization.enable();
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.router.navigateByUrl('/login');
    }
  }
}
