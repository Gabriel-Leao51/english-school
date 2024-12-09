import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artigo, Comment } from '../models/artigo.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3001/api/artigos'; // URL da API

  constructor(private http: HttpClient) {}

  // Obter todos os artigos
  getArtigos(): Observable<Artigo[]> {
    return this.http.get<Artigo[]>(this.apiUrl);
  }

  // Obter um artigo específico
  getArtigo(id: string): Observable<Artigo> {
    return this.http.get<Artigo>(`${this.apiUrl}/${id}`);
  }

  // Criar um novo artigo (opcional)
  createArtigo(artigo: Artigo): Observable<Artigo> {
    return this.http.post<Artigo>(this.apiUrl, artigo);
  }

  // Atualizar um artigo (opcional)
  updateArtigo(id: string, artigo: Artigo): Observable<Artigo> {
    return this.http.put<Artigo>(`${this.apiUrl}/${id}`, artigo);
  }

  // Deletar um artigo (opcional)
  deleteArtigo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Adicionar um comentário a um artigo
  addComment(artigoId: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/${artigoId}/comentarios`,
      comment
    );
  }

  // Obter comentários de um artigo
  getComments(artigoId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${artigoId}/comentarios`);
  }

  // Deletar um comentário (opcional)
  deleteComment(artigoId: string, comentarioId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${artigoId}/comentarios/${comentarioId}`
    );
  }
}
