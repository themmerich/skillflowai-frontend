import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Training } from '../model/training';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Training[]> {
    //return this.http.get<Training[]>(this.apiUrl + '/training');
    return of([
      {
        id: 1,
        name: 'Sicherheitsschulung 1',
        description: 'Die erste ihrer Art',
        interval: 'Alle 2 Wochen',
        created: new Date(),
      } as Training,
      {
        id: 2,
        name: 'Sicherheitsschulung 2',
        description: 'Die zweite ihrer Art',
        interval: 'Alle 3 Wochen',
        created: new Date(),
      } as Training,
    ]);
  }
}
