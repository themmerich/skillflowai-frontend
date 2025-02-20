import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { TranslateService } from '@ngx-translate/core';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { GlobalStore } from '../../data/global.store';
import { updatePrimaryPalette } from '@primeng/themes';
import { Drawer } from 'primeng/drawer';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'sf-shell',
  imports: [RouterOutlet, InputText, ButtonDirective, Avatar, InputGroup, InputGroupAddon, Drawer, SidebarComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  translationService = inject(TranslateService);
  globalStore = inject(GlobalStore);

  showDrawer = false;

  colors: string[] = [
    'emerald',
    'green',
    'lime',
    'red',
    'orange',
    'amber',
    'yellow',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
  ];
  colorIndex = 0;
  currentLanguage = this.globalStore.language;
  currentThemeMode = this.globalStore.themeMode;

  toggleSidebar() {
    this.showDrawer = true;
  }

  onThemeSwitch() {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');

    if (this.currentThemeMode() === 'dark') {
      this.globalStore.switchTheme('light');
    } else {
      this.globalStore.switchTheme('dark');
    }
  }

  onLanguageChange() {
    const currentLang = this.translationService.currentLang;
    if (currentLang === 'de') {
      this.translationService.use('en');
      this.globalStore.switchLanguage('en');
    } else {
      this.translationService.use('de');
      this.globalStore.switchLanguage('de');
    }
  }

  onColorChange() {
    if (this.colorIndex < this.colors.length - 1) {
      this.colorIndex++;
    } else {
      this.colorIndex = 0;
    }

    const currentColor = this.colors[this.colorIndex];
    this.globalStore.switchColor(currentColor);

    updatePrimaryPalette({
      50: '{' + currentColor + '.50}',
      100: '{' + currentColor + '.100}',
      200: '{' + currentColor + '.200}',
      300: '{' + currentColor + '.300}',
      400: '{' + currentColor + '.400}',
      500: '{' + currentColor + '.500}',
      600: '{' + currentColor + '.600}',
      700: '{' + currentColor + '.700}',
      800: '{' + currentColor + '.800}',
      900: '{' + currentColor + '.900}',
      950: '{' + currentColor + '.950}',
    });
  }
}
