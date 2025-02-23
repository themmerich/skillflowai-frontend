import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member } from '../model/member';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Member[]> {
    //return this.http.get<User[]>(this.apiUrl + '/user');
    return of([
      {
        id: 1,
        firstname: 'Thomas',
        lastname: 'Hemmerich',
        birthdate: new Date(),
        email: 'olt_hemmerich@gmx.de',
        emailVerified: true,
        created: new Date(),
        address: {
          street: 'Bühlstr.',
          number: '16',
          zip: '97506',
          city: 'Grafenrheinnfeld',
          country: 'Germany',
        } as Address,
      } as Member,
      {
        id: 2,
        firstname: 'Christian',
        lastname: 'Hartmann',
        birthdate: new Date(),
        email: 'hartmann.chris@gmx.de',
        emailVerified: true,
        created: new Date(),
        address: {
          street: 'Am Heubühl',
          number: '17',
          zip: '97506',
          city: 'Grafenrheinnfeld',
          country: 'Germany',
        } as Address,
      } as Member,
    ]);
  }
}
