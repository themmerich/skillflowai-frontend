import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  public apiUrl = '';
  private http = inject(HttpClient);

  getAll(): Observable<Organization[]> {
    let org1: Organization = {
      id: 1234,
      name: 'Freuerwehr Grafenrheinfeld',
      description: 'Die freiwillige Feuerwehr in Grafenrheinfeld.',
      members: 15,
      created: new Date(),
    };
    let org2: Organization = {
      id: 2345,
      name: 'Freuerwehr Bergrheinfeld',
      description: 'Die freiwillige Feuerwehr in Bergrheinfeld.',
      members: 5,
      created: new Date(),
    };
    return of([org1, org2]);
  }
}
