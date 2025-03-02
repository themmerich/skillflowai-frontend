import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Training } from '../model/training';
import { Interval } from '../model/interval';
import { Material } from '../model/material';
import { Lesson } from '../model/lesson';

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
        id: 'e9e34d21-7ec1-497a-a5fb-c64261963ebc',
        name: 'Sicherheitsschulung 1',
        description: 'Die erste ihrer Art',
        defaultInterval: { id: '8a2a4f3b-45ae-4132-b89d-fb2d38e6ba00', name: 'Alle 5 Jahre' } as Interval,
        lessons: [
          {
            id: '48154c23-b8b2-45ec-b120-6e45773a3f11',
            name: 'Teil 1',
            description: 'Die erste ihrer Art',
            materials: [
              {
                id: '09b7aa23-76a4-4e76-95a6-eb377ee5feae',
                name: 'Schulungsunterlagen 1',
                description: 'Ein paar Unterlagen zum Thema',
                type: 'pdf',
              } as Material,
              {
                id: '969e4862-28e4-48d4-ae2a-aa5f63361e03',
                name: 'Schulungsunterlagen 2',
                description: 'Mehr Unterlagen',
                type: 'word',
              } as Material,
              {
                id: '3958f428-0251-48b3-b124-d073ebe1191d',
                name: 'Schulungsvideo',
                description: 'Ein erstes Video zum Thema',
                type: 'avi',
              } as Material,
              {
                id: '3a12d237-8fb0-4181-ba53-beab4d71708d',
                name: 'Externes Schulungsvideo',
                description: 'Von YouTube',
                type: 'youtube',
              } as Material,
            ],
            notes: 'some notes to lesson 1',
          } as Lesson,
          {
            id: 'f55e7616-154a-45b7-abd0-26cf8ec2c02d',
            name: 'Teil 2',
            description: 'Die zweite ihrer Art',
            materials: [
              {
                id: '15653324-0f9f-4d7f-9088-0e2af72962e8',
                name: 'Schulungsbild',
                description: 'Ein Schaubild zum Thema',
                type: 'jpg',
              } as Material,
            ],
            notes: 'some notes to lesson 1',
          } as Lesson,
        ],
        notes: 'Dies ist eine standardmäßige Sicherheitsüberprüfung, die regelmäßig durchgeführt werden sollte.',
        created: new Date(),
      } as Training,
      {
        id: '1d70ca1e-b61c-4182-8467-ccc860366f37',
        name: 'Sicherheitsschulung 2',
        description: 'Die zweite ihrer Art',
        defaultInterval: { id: 'ed1ef0fa-6081-4f9c-bb40-65aab221a873', name: 'Alle 6 Monate' } as Interval,
        lessons: [
          {
            id: 'f48255bc-994a-4fc8-bbf3-fa9df656af83',
            name: 'Teil 21',
            description: 'Die erste ihrer Art von Schulung 2',
            materials: [],
            notes: '',
            created: new Date(),
          } as Lesson,
        ],
        notes: 'Dies ist eine erweiterte Sicherheitsüberprüfung, die nur der Einsatzleiter durchführen muss.',
        created: new Date(),
      } as Training,
      {
        id: '49a807dc-9ef2-4aba-99b8-8debc9e46e64',
        name: 'Sicherheitsschulung 3',
        description: 'Die dritte ihrer Art',
        defaultInterval: { id: 'ed1ef0fa-6081-4f9c-bb40-65aab221a873', name: 'Alle 6 Monate' } as Interval,
        lessons: [],
        notes: 'Dies ist eine erweiterte Sicherheitsüberprüfung, die nur der Einsatzleiter durchführen muss.',
        created: new Date(),
      } as Training,
    ]);
  }
}
