// stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment'; // Importe sua chave pública

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<any>;

  constructor() {
    this.stripePromise = loadStripe(environment.stripePublicKey); // Use sua chave pública aqui
  }

  async createCheckoutSession(courseId: string): Promise<any> {
    // courseId para identificar o curso
    const stripe = await this.stripePromise;

    try {
      const response = await fetch('/create-checkout-session', {
        // Rota do seu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }), // Envie o ID do curso para o backend
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        // Trate o erro adequadamente (ex: exibir uma mensagem para o usuário)
      }
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      // Trate o erro
    }
  }
}
