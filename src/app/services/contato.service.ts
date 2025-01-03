import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/api/mensagens`; // URL da API
  private googleMapsApiKeyUrl = `${environment.apiUrl}/api/mensagens/google-maps-api-key`; // URL para obter a chave do Google Maps

  constructor(private http: HttpClient) {}

  // Método para enviar os dados do formulário para a API
  enviarMensagem(formData: ContatoFormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  getGoogleMapsApiKey(): Observable<{ apiKey: string }> {
    return this.http.get<{ apiKey: string }>(this.googleMapsApiKeyUrl);
  }
}
