import { Component, inject, Input, OnInit } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-form-input',
  imports: [FloatLabel, FormsModule, InputText, Message, ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent implements OnInit {
  @Input() id!: string;
  @Input() prefix!: string;

  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'off';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;

  private controlContainer = inject(ControlContainer, { optional: true });

  ngOnInit() {
    if (this.prefix) {
      this.label = this.prefix + '.' + this.id;
    }
  }

  get formGroup(): FormGroup {
    return this.controlContainer?.control as FormGroup;
  }

  get formControl(): FormControl {
    return this.formGroup?.get(this.id) as FormControl;
  }

  getErrorMessage() {
    if (this.formControl.errors?.['required']) return this.prefix + '.error.' + this.id + '.required';
    if (this.formControl.errors?.['email']) return this.prefix + '.error.' + this.id + '.invalid';
    return '';
  }
}
