import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  public apiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);

  getAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl + '/organizations');
  }
}
