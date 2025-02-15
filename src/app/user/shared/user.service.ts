import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { Address } from '../../shared/model/address';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<User[]> {
    //return this.http.get<User[]>(this.apiUrl + '/user');
    return of([
      {
        id: 1,
        firstname: 'Thomas',
        lastname: 'Hemmerich',
        birthdate: new Date(),
        email: 'olt_hemmerich@gmx.de',
        emailVerified: true,
        roles: [{ id: 1, name: 'ADMIN' } as Role],
        created: new Date(),
        address: {
          street: 'Bühlstr.',
          number: '16',
          zip: '97506',
          city: 'Grafenrheinnfeld',
          country: 'Germany',
        } as Address,
      } as User,
      {
        id: 2,
        firstname: 'Christian',
        lastname: 'Hartmann',
        birthdate: new Date(),
        email: 'hartmann.chris@gmx.de',
        emailVerified: true,
        roles: [{ id: 2, name: 'USER' } as Role],
        created: new Date(),
        address: {
          street: 'Am Heubühl',
          number: '17',
          zip: '97506',
          city: 'Grafenrheinnfeld',
          country: 'Germany',
        } as Address,
      } as User,
    ]);
  }
}
