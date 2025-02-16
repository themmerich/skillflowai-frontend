import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LoginInputComponent } from '@components/login-input/login-input.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sf-register',
  imports: [ReactiveFormsModule, TranslatePipe, LoginInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  registerForm = new FormGroup({
    organization: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
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
      // TODO: load oranization, set value in form and disable field
      this.registerForm.controls.organization.setValue(organizationId);
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.router.navigateByUrl('/login');
    }
  }
}
