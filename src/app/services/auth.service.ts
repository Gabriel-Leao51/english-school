import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  user: any;
  token: string;
}

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth'; // URL da sua API

  constructor(private http: HttpClient) {}

  // Cadastrar Usuário
  cadastrar(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData);
  }

  // Autenticar Usuário
  login(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData);
  }
}
