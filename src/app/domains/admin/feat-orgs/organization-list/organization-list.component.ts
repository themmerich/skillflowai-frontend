import { Component, inject, OnInit } from '@angular/core';
import { SortMeta } from 'primeng/api';
import { Organization } from '../../model/organization';
import { OrganizationsService } from '../../data/organizations.service';

@Component({
  selector: 'sf-organisation-list',
  imports: [],
  templateUrl: './organisation-list.component.html',
  styleUrl: './organisation-list.component.scss',
})
export class OrganizationListComponent implements OnInit {
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
