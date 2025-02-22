import { Component, inject, Input, OnInit } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'sf-form-date',
  imports: [FloatLabel, FormsModule, Message, TranslatePipe, DatePicker, ReactiveFormsModule],
  templateUrl: './form-date.component.html',
  styleUrl: './form-date.component.scss',
})
export class FormDateComponent implements OnInit {
  @Input() id!: string;
  @Input() prefix!: string;

  @Input() label: string = '';
  @Input() placeholder: string = '';
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
