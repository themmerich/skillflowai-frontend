import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Organization } from '../organizations/shared/organization';
import { OrganizationsService } from '../organizations/shared/organizations.service';

@Component({
  selector: 'sf-dashboard',
  imports: [TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  organizations!: Organization[];
  organizationService = inject(OrganizationsService);

  ngOnInit(): void {
    this.organizationService.getAll().subscribe((organizations) => (this.organizations = organizations));
  }
}
