import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Organization } from '../organizations/shared/organization';
import { OrganizationsService } from '../organizations/shared/organizations.service';
import { SortMeta } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'sf-dashboard',
  imports: [TableModule, IconField, InputIcon, InputText],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  organizations!: Organization[];
  selectedOrganization!: Organization;
  loading: boolean = true;
  multiSortMeta: SortMeta[] = [
    {
      field: 'name',
      order: 1,
    },
  ];
  organizationService = inject(OrganizationsService);

  ngOnInit(): void {
    this.organizationService.getAll().subscribe((organizations) => {
      this.loading = false;
      return (this.organizations = organizations);
    });
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    // @ts-ignore
    element.classList.toggle('my-app-dark');
  }
}
