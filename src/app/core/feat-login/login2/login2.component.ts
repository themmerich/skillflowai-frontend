import { Component, inject } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/security/service/auth.service';

@Component({
  selector: 'sf-login2',
  imports: [Checkbox, InputText, ButtonDirective, TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.scss',
})
export class Login2Component {
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true,
    }),
    remember: new FormControl(false),
  });

  login() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      console.log(this.loginForm.value);
      this.authService
        .login({
          username: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe((response) => {
          this.authService.saveToken(response.accessToken);
          this.router.navigate(['/']);
        });
    }
  }
}
