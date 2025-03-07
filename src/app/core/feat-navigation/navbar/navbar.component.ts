import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../shared/security/service/auth.service';
import { MenuItem } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sf-navbar',
  imports: [RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  authService = inject(AuthService);
  router = inject(Router);
  translationService = inject(TranslateService);

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', route: 'dashboard' },
      {
        label: 'Core',
        icon: 'pi pi-fw pi-info-circle',
        items: [
          { label: 'About', icon: 'pi pi-fw pi-info-circle', route: 'core/about' },
          { label: 'Organisations', icon: 'pi pi-fw pi-question-circle', route: 'organizations' },
          { label: '404', icon: 'pi pi-fw pi-envelope', route: 'core/not-found' },
        ],
      },
      { label: 'FAQ', icon: 'pi pi-fw pi-question-circle', route: 'core/faq' },
      { label: '404', icon: 'pi pi-fw pi-envelope', route: 'core/not-found' },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
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
}
