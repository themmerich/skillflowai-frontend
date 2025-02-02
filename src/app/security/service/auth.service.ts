import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/v3/auth';

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials, {
      withCredentials: true, // Needed to include HttpOnly cookies in requests
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    return this.http
      .post<{ accessToken: string }>(
        `${this.apiUrl}/refresh`,
        { refreshToken },
        {
          withCredentials: true, // Refresh token is sent automatically via HttpOnly cookie
        },
      )
      .pipe(map((response) => response.accessToken));
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
  }

  saveToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken(); // Check if token exists
  }
}
