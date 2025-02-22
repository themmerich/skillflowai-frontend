import { Component, inject } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-form-address',
  imports: [FloatLabel, FormsModule, InputText, ReactiveFormsModule, TranslatePipe],
  templateUrl: './form-address.component.html',
  styleUrl: './form-address.component.scss',
})
export class FormAddressComponent {
  private controlContainer = inject(ControlContainer, { optional: true });

  get address(): FormGroup {
    return this.controlContainer?.control?.get('address') as FormGroup;
  }
}
