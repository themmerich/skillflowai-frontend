import { TestBed } from '@angular/core/testing';

import { OrganizationsService } from './organizations.service';

describe('OrganisationsService', () => {
  let service: OrganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
