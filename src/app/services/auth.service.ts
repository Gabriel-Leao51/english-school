import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment.prod';

interface LoginResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  private currentUserRole: string | null = null;
  private platformId = inject(PLATFORM_ID);

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  currentUser$: Observable<any | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value; // Retorna o valor atual do BehaviorSubject
  }

  getUserName(): string | null {
    const currentUser = this.currentUserSubject.value; // Obtém o usuário atual
    return currentUser ? currentUser.name : null; // Retorna o nome se o usuário existir, senão null
  }

  getUserId(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser?._id || null;
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
        if (isPlatformBrowser(this.platformId)) {
          const role = this.getRole();
          console.log('role dentro do tap do login', role);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remova o user do localStorage
      localStorage.removeItem('userRole');
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
      localStorage.setItem('userRole', response.user.role);
    }
    console.log('isLoggedInSubject.next(true) chamado');
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(response.user);
    this.currentUserRole = response.user.role;
  }

  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole'); // Lê o role do localStorage
    }
    return null;
  }
}
