import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

@Component({
  selector: 'sf-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  primeNgConfig = inject(PrimeNG);

  constructor() {
    this.primeNgConfig.theme.set({
      preset: Lara,
      options: {
        darkModeSelector: '.dark',
      },
    });
  }
}
