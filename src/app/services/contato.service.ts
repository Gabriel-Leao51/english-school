import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para tipagem dos dados do formulário
interface ContatoFormData {
  nome: string;
  email: string;
  telefone?: string; // Opcional
  assunto: string;
  mensagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private apiUrl = 'http://localhost:3001/api/mensagens'; // URL da API

  constructor(private http: HttpClient) {}

  // Método para enviar os dados do formulário para a API
  enviarMensagem(formData: ContatoFormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
