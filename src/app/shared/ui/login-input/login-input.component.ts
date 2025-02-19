import { Component, Input, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-login-input',
  imports: [InputText, FloatLabel, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss',
})
export class LoginInputComponent implements OnInit {
  @Input() fieldName: string | undefined;

  @Input() id: string = 'id';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'off';

  @Input() control!: FormControl;

  ngOnInit() {
    if (this.fieldName) {
      this.id = this.fieldName;
      this.placeholder = 'core.login.' + this.fieldName;
    }
  }
}
