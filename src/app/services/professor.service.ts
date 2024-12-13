import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private apiUrl = `${environment.apiUrl}/api/professores`; // Ajuste a URL da API

  constructor(private http: HttpClient) {}

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  getProfessor(id: string): Observable<Professor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Professor>(url);
  }
}
