import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NgClass, NgFor } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { AuthService } from '../../../shared/security/service/auth.service';
import { GlobalStore } from '../../data/global.store';
import { updatePrimaryPalette } from '@primeng/themes';

@Component({
  selector: 'sf-navbar2',
  imports: [RouterOutlet, NgFor, NgClass, InputText, ButtonDirective, Avatar, TranslatePipe, InputGroup, InputGroupAddon],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.scss',
})
export class Navbar2Component implements OnInit {
  translationService = inject(TranslateService);
  authService = inject(AuthService);
  globalStore = inject(GlobalStore);
  router = inject(Router);

  selectedNav?: string = 'core.nav.dashboard';
  bottomNavs: MenuItem[] = [];
  navs: MenuItem[] = [];

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

  navigationMap: Record<string, string> = {
    '/home/dashboard': 'core.nav.dashboard',
    '/home/organization/details': 'core.nav.organization',
    '/home/organization/list': 'core.nav.members',
    '/home/training/list': 'core.nav.trainings',
    '/home/core/faq': 'core.nav.faq',
    '/home/admin/users': 'core.nav.admin',
  };

  ngOnInit() {
    this.selectedNav = this.navigationMap[this.router.url];

    this.bottomNavs = [
      {
        icon: 'pi pi-question-circle',
        label: 'core.nav.faq',
        routerLink: 'home/core/faq',
      },
      {
        icon: 'pi pi-cog',
        label: 'core.nav.admin',
        routerLink: 'home/admin',
      },
      {
        icon: 'pi pi-power-off',
        label: 'core.nav.logout',
      },
    ];

    this.navs = [
      {
        icon: 'pi pi-gauge',
        label: 'core.nav.dashboard',
        routerLink: 'home/dashboard',
      },
      {
        icon: 'pi pi-home',
        label: 'core.nav.organization',
        routerLink: 'home/organization',
      },
      {
        icon: 'pi pi-users',
        label: 'core.nav.members',
        routerLink: 'home/organization/list',
      },
      {
        icon: 'pi pi-stopwatch',
        label: 'core.nav.trainings',
        routerLink: 'home/training/list',
      },
    ];
  }

  onButtonClick(item: MenuItem) {
    this.selectedNav = item.label;
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    } else if (item.label === 'core.nav.logout') {
      this.logout();
    }
  }

  toggleSidebar() {
    // TODO: this!
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
