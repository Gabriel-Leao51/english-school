import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Curso } from '../models/curso.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = `${environment.apiUrl}/api/cursos`;
  private cursoSelecionadoSubject = new BehaviorSubject<Curso | null>(null);
  cursoSelecionado$ = this.cursoSelecionadoSubject.asObservable();

  constructor(private http: HttpClient) {}

  obterCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  obterCursoPorId(id: string): Observable<Curso> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Curso>(url);
  }

  selecionarCurso(curso: Curso): void {
    this.cursoSelecionadoSubject.next(curso);
  }

  limparCursoSelecionado(): void {
    // Limpa a seleção após o uso
    this.cursoSelecionadoSubject.next(null);
  }
}
