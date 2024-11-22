import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Curso } from '../models/curso.model'; // Importe a interface Curso

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:3001/api/cursos'; // Substitua pela URL da sua API
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
