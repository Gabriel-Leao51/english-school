import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  private platformId = inject(PLATFORM_ID);

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  currentUser$: Observable<any | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  cadastrar(userData: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap((response) => {
          this.handleLoginSuccess(response);
        })
      );
  }

  login(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData).pipe(
      tap((response) => {
        this.handleLoginSuccess(response);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remova o user do localStorage
    }
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  private checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.isLoggedInSubject.next(!!token);
      if (token) {
        this.currentUserSubject.next(
          JSON.parse(localStorage.getItem('user') || '{}')
        );
      }
    }
  }

  private handleLoginSuccess(response: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    console.log('isLoggedInSubject.next(true) chamado');
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(response.user);
  }
}
