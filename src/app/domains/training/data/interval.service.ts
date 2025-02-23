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
        id: 1,
        name: 'Alle 5 Jahre',
      } as Interval,
      {
        id: 2,
        name: 'Alle 3 Jahre',
      } as Interval,
      {
        id: 3,
        name: 'Alle 12 Monate',
      } as Interval,
      {
        id: 4,
        name: 'Alle 6 Monate',
      } as Interval,
      {
        id: 5,
        name: 'Alle 3 Monate',
      } as Interval,
    ]);
  }
}
