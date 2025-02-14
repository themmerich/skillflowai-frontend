import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LoginInputComponent } from '../../shared/components/login-input/login-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'sf-register',
  imports: [ReactiveFormsModule, TranslatePipe, LoginInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  router = inject(Router);

  registerForm = new FormGroup({
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
    organization: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
  });

  register() {
    if (this.registerForm.valid) {
      this.router.navigateByUrl('/login');
    }
  }
}
