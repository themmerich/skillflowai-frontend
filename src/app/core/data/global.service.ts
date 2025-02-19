import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Organization } from '../model/organization';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getById(id: number): Observable<Organization> {
    //return this.http.get<Organization>(this.apiUrl + '/organizations/' + id);
    const availableOrgs: Organization[] = [
      { id: 1, name: 'Freiwillige Feuerwehr Grafenrheinfeld' },
      { id: 2, name: 'Freiwillige Feuerwehr Bergrheinfeld' },
      { id: 3, name: 'Freiwillige Feuerwehr Hammelburg' },
    ];
    return of(availableOrgs[id]);
  }
}
