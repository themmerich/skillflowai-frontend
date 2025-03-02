import { Component, inject, Input, OnInit } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sf-form-checkbox',
  imports: [Checkbox, TranslatePipe],
  templateUrl: './form-checkbox.component.html',
  styleUrl: './form-checkbox.component.scss',
})
export class FormCheckboxComponent implements OnInit {
  @Input() id!: string;
  @Input() prefix!: string;
  @Input() value: boolean = false;
  @Input() label: string = '';

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
}
