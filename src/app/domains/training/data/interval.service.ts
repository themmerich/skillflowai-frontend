import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Interval } from '../model/interval';

@Injectable({
  providedIn: 'root',
})
export class IntervalService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Interval[]> {
    //return this.http.get<Role[]>(this.apiUrl + '/user');
    return of([
      {
        id: '8a2a4f3b-45ae-4132-b89d-fb2d38e6ba00',
        name: 'Alle 5 Jahre',
      } as Interval,
      {
        id: '6b1ccb97-040b-427d-bb34-d12302f01f0e',
        name: 'Alle 3 Jahre',
      } as Interval,
      {
        id: 'b331c754-9929-4395-aa26-a79d4b2b14e7',
        name: 'Alle 12 Monate',
      } as Interval,
      {
        id: '475c9311-0bf5-4c06-9a9b-004e4e436a64',
        name: 'Alle 6 Monate',
      } as Interval,
      {
        id: 'ed1ef0fa-6081-4f9c-bb40-65aab221a873',
        name: 'Alle 3 Monate',
      } as Interval,
    ]);
  }
}
