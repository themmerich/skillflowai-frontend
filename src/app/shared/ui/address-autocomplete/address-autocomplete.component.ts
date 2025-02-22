import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
//import { google } from 'google-maps';
import { FloatLabel } from 'primeng/floatlabel';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { TranslatePipe } from '@ngx-translate/core';

export enum AddressType {
  ESTABLISHMENT = 'establishment',
  ADDRESS = 'address',
  GEOCODE = 'geocode',
}

export type MappedAddress = Record<string, string>;

@Component({
  selector: 'sf-address-autocomplete',
  imports: [FloatLabel, FormsModule, InputText, ReactiveFormsModule, TranslatePipe],
  templateUrl: './address-autocomplete.component.html',
  styleUrl: './address-autocomplete.component.scss',
})
export class AddressAutocompleteComponent implements OnInit {
  @Input() address?: string;
  @Input() formGroup!: FormGroup;
  @Input() countryRestrictions: string[] = ['US', 'DE'];
  @Input() adressTypes: AddressType[] = [AddressType.ESTABLISHMENT, AddressType.GEOCODE];

  @Output() setAddress: EventEmitter<MappedAddress> = new EventEmitter<MappedAddress>();
  @ViewChild('addressInput', { static: true }) addressInput: any;

  autocompleteInput?: string;
  mappedAddress?: MappedAddress;

  ngOnInit() {
    //this.registerListener();
    this.addressInput.nativeElement.value = this.address ? this.address : '';
  }

  /*registerListener() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, {
      componentRestrictions: { country: this.countryRestrictions },
      types: this.adressTypes,
      fields: ['address_components', 'geometry', 'icon', 'name'],
    });

    // Append the dropdown to the body
    setTimeout(() => {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        pacContainer.setAttribute('style', 'z-index: 10000; position: absolute;');
        document.body.appendChild(pacContainer);
      }
    }, 500);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.addressText = place.address_components;
      this.setAddress.emit(this.addressText);
    });
  }

  set addressText(addressComponents: google.maps.GeocoderAddressComponent[] | undefined) {
    if (addressComponents) {
      this.mappedAddress = addressComponents
        .map((item: google.maps.GeocoderAddressComponent) => {
          return { [item.types[0]]: item.long_name };
        })
        .reduce((prev, curr) => {
          return { ...prev, ...curr };
        });
    }
  }

  get addressText(): MappedAddress | undefined {
    return this.mappedAddress;
  }*/
}
