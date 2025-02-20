import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/security/service/auth.service';

@Component({
  selector: 'sf-sidebar',
  imports: [NgForOf, TranslatePipe, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  selectedNav?: string = 'core.nav.dashboard';
  bottomNavs: MenuItem[] = [];
  navs: MenuItem[] = [];

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
