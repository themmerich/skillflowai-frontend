import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  // add authorization header if token exists
  if (accessToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return refreshTokenAndRetry(req, next);
      }
      return throwError(() => error);
    }),
  );
};

// Function to Handle Token Refresh
const refreshTokenAndRetry = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.error('No refresh token available. Logging out...');
    return throwError(() => new Error('Refresh token missing'));
  }

  return authService.refreshToken().pipe(
    switchMap((newToken: string) => {
      localStorage.setItem('accessToken', newToken);
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${newToken}` },
      });
      return next(clonedRequest);
    }),
    catchError((error) => {
      console.error('Refresh token failed, logging out...');
      inject(AuthService).logout();
      return throwError(() => error);
    }),
  );
};
