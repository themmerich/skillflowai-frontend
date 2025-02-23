import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Training } from '../model/training';
import { Interval } from '../model/interval';
import { Material } from '../model/material';

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
        interval: { id: 1, name: 'Alle 5 Jahre' } as Interval,
        materials: [
          {
            id: 1,
            name: 'Schulungsunterlagen 1',
            description: 'Ein paar Unterlagen zum Thema',
            type: 'pdf',
          } as Material,
          {
            id: 2,
            name: 'Schulungsunterlagen 2',
            description: 'Mehr Unterlagen',
            type: 'word',
          } as Material,
          {
            id: 3,
            name: 'Schulungsvideo',
            description: 'Ein erstes Video zum Thema',
            type: 'avi',
          } as Material,
          {
            id: 4,
            name: 'Externes Schulungsvideo',
            description: 'Von YouTube',
            type: 'youtube',
          } as Material,
          {
            id: 5,
            name: 'Schulungsbild',
            description: 'Ein Schaubild zum Thema',
            type: 'jpg',
          } as Material,
        ],
        numberOfQuestions: 5,
        numberOfCorrectQuestions: 3,
        notes: 'Dies ist eine standardmäßige Sicherheitsüberprüfung, die regelmäßig durchgeführt werden sollte.',
        created: new Date(),
      } as Training,
      {
        id: 2,
        name: 'Sicherheitsschulung 2',
        description: 'Die zweite ihrer Art',
        interval: { id: 4, name: 'Alle 6 Monate' } as Interval,
        numberOfQuestions: 10,
        numberOfCorrectQuestions: 7,
        notes: 'Dies ist eine erweiterte Sicherheitsüberprüfung, die nur der Einsatzleiter durchführen muss.',
        created: new Date(),
      } as Training,
    ]);
  }
}
