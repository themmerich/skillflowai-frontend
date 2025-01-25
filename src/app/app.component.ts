import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sf-root',
  imports: [Menubar, NgIf, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', route: '/dashboard' },
      {
        label: 'General',
        icon: 'pi pi-fw pi-info-circle',
        items: [
          { label: 'About', icon: 'pi pi-fw pi-info-circle', route: '/general/about' },
          { label: 'FAQ', icon: 'pi pi-fw pi-question-circle', route: '/general/faq' },
          { label: '404', icon: 'pi pi-fw pi-envelope', route: '/general/not-found' },
        ],
      },
      { label: 'FAQ', icon: 'pi pi-fw pi-question-circle', route: '/general/faq' },
      { label: '404', icon: 'pi pi-fw pi-envelope', route: '/general/not-found' },
    ];
  }
}
