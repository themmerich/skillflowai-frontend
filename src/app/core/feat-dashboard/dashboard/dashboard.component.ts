import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Organization } from '../../../domains/organization/model/organization';
import { OrganizationsService } from '../../../domains/organization/api/organizations.service';
import { SortMeta } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Divider } from 'primeng/divider';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-dashboard',
  imports: [TableModule, IconField, InputIcon, InputText, Divider, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  organizations!: Organization[];
  selectedOrganization!: Organization;
  multiSortMeta: SortMeta[] = [
    {
      field: 'name',
      order: 1,
    },
  ];
  organizationService = inject(OrganizationsService);

  ngOnInit(): void {
    this.organizationService.getAll().subscribe((organizations) => {
      return (this.organizations = organizations);
    });
  }
}
