import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Role } from './role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Role[]> {
    //return this.http.get<Role[]>(this.apiUrl + '/user');
    return of([
      {
        id: 1,
        name: 'ADMIN',
      } as Role,
      {
        id: 2,
        name: 'USER',
      } as Role,
    ]);
  }
}
