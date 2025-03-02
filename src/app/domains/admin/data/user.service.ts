import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';
import { Role } from '../model/role';

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
        id: 'e5882d92-d6c8-4128-86cd-4b5736460f7f',
        firstname: 'Thomas',
        lastname: 'Hemmerich',
        birthdate: new Date(),
        email: 'olt_hemmerich@gmx.de',
        emailVerified: true,
        roles: [{ id: 1, name: 'ADMIN' } as Role],
        created: new Date(),
      } as User,
      {
        id: '2627e2f9-fc82-44cc-9389-0103c779f133',
        firstname: 'Christian',
        lastname: 'Hartmann',
        birthdate: new Date(),
        email: 'hartmann.chris@gmx.de',
        emailVerified: true,
        roles: [{ id: 2, name: 'USER' } as Role],
        created: new Date(),
      } as User,
    ]);
  }
}
