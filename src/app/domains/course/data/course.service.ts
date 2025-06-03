import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { Interval } from '../model/interval';
import { Section } from '../model/section';
import { Lesson } from '../model/lesson';
import { Block } from '../model/block';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Course[]> {
    //return this.http.get<Course[]>(this.apiUrl + '/course');
    return of([
      {
        id: 'e9e34d21-7ec1-497a-a5fb-c64261963ebc',
        tenantId: 'blubb',
        title: 'Sicherheitsschulung 1',
        description: 'Die erste ihrer Art',
        status: 'PUBLISHED',
        repeatInterval: { id: '8a2a4f3b-45ae-4132-b89d-fb2d38e6ba00', name: 'Alle 5 Jahre' } as Interval,
        courseImage: '',
        enrolledUsers: [],
        lessons: [
          {
            id: '48154c23-b8b2-45ec-b120-6e45773a3f11',
            title: 'Teil 1',
            description: 'Die erste ihrer Art',
            content: [
              {
                id: '09b7aa23-76a4-4e76-95a6-eb377ee5feae',
                title: 'Schulungsunterlagen 1',
                description: 'Ein paar Unterlagen zum Thema',
                content: [
                  {
                    type: '',
                    value: '',
                  } as Block,
                ],
              } as Section,
              {
                id: '969e4862-28e4-48d4-ae2a-aa5f63361e03',
                title: 'Schulungsunterlagen 2',
                description: 'Mehr Unterlagen',
                content: [
                  {
                    type: '',
                    value: '',
                  } as Block,
                ],
              } as Section,
              {
                id: '3958f428-0251-48b3-b124-d073ebe1191d',
                title: 'Schulungsvideo',
                description: 'Ein erstes Video zum Thema',
                content: [
                  {
                    type: '',
                    value: '',
                  } as Block,
                ],
              } as Section,
              {
                id: '3a12d237-8fb0-4181-ba53-beab4d71708d',
                title: 'Externes Schulungsvideo',
                description: 'Von YouTube',
                content: [
                  {
                    type: '',
                    value: '',
                  } as Block,
                ],
              } as Section,
            ],
          } as Lesson,
          {
            id: 'f55e7616-154a-45b7-abd0-26cf8ec2c02d',
            title: 'Teil 2',
            description: 'Die zweite ihrer Art',
            content: [
              {
                id: '15653324-0f9f-4d7f-9088-0e2af72962e8',
                title: 'Schulungsbild',
                description: 'Ein Schaubild zum Thema',
                content: [
                  {
                    type: '',
                    value: '',
                  } as Block,
                ],
              } as Section,
            ],
          } as Lesson,
        ],
      } as Course,
      {
        id: '1d70ca1e-b61c-4182-8467-ccc860366f37',
        tenantId: 'blubb',
        title: 'Sicherheitsschulung 2',
        description: 'Die zweite ihrer Art',
        status: 'DRAFT',
        repeatInterval: { id: 'ed1ef0fa-6081-4f9c-bb40-65aab221a873', name: 'Alle 6 Monate' } as Interval,
        courseImage: '',
        enrolledUsers: [],
        lessons: [
          {
            id: 'f48255bc-994a-4fc8-bbf3-fa9df656af83',
            title: 'Teil 21',
            description: 'Die erste ihrer Art von Schulung 2',
            content: [],
          } as Lesson,
        ],
      } as Course,
      {
        id: '49a807dc-9ef2-4aba-99b8-8debc9e46e64',
        tenantId: 'blubb',
        title: 'Sicherheitsschulung 3',
        description: 'Die dritte ihrer Art',
        status: 'ARCHIVED',
        repeatInterval: { id: 'ed1ef0fa-6081-4f9c-bb40-65aab221a873', name: 'Alle 6 Monate' } as Interval,
        courseImage: '',
        enrolledUsers: [],
        lessons: [],
      } as Course,
    ]);
  }
}
