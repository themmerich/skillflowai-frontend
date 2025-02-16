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

@Component({
  selector: 'sf-navbar2',
  imports: [RouterOutlet, NgFor, NgClass, InputText, ButtonDirective, Avatar, TranslatePipe, InputGroup, InputGroupAddon],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.scss',
})
export class Navbar2Component implements OnInit {
  translationService = inject(TranslateService);
  authService = inject(AuthService);
  router = inject(Router);

  selectedNav?: string = 'nav.dashboard';
  bottomNavs: MenuItem[] = [];
  navs: MenuItem[] = [];

  ngOnInit() {
    this.bottomNavs = [
      {
        icon: 'pi pi-question-circle',
        label: 'nav.faq',
        routerLink: 'home/general/faq',
      },
      {
        icon: 'pi pi-cog',
        label: 'nav.admin',
        routerLink: 'home/user/list',
      },
    ];

    this.navs = [
      {
        icon: 'pi pi-home',
        label: 'nav.dashboard',
        routerLink: 'home/dashboard',
      },
      {
        icon: 'pi pi-home',
        label: 'nav.organization',
        routerLink: 'home/organization',
      },
      {
        icon: 'pi pi-users',
        label: 'nav.members',
        routerLink: 'home/user/list',
      },
      {
        icon: 'pi pi-comments',
        label: 'nav.not-found',
        routerLink: 'home/general/not-found',
      },
      {
        icon: 'pi pi-arrow-right-arrow-left',
        label: 'nav.theme-switch',
      },
      {
        icon: 'pi pi-language',
        label: 'nav.language-switch',
      },
      {
        icon: 'pi pi-power-off',
        label: 'nav.logout',
      },
    ];
  }

  onButtonClick(item: MenuItem) {
    this.selectedNav = item.label;
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    } else if (item.label === 'nav.theme-switch') {
      this.onThemeSwitch();
    } else if (item.label === 'nav.language-switch') {
      this.onLanguageChange();
    } else if (item.label === 'nav.logout') {
      this.logout();
    }
  }

  toggleSidebar() {
    // TODO: this!
  }

  onThemeSwitch() {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
  }

  onLanguageChange() {
    const currentLang = this.translationService.currentLang;
    if (currentLang === 'de') {
      this.translationService.use('en');
    } else {
      this.translationService.use('de');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
