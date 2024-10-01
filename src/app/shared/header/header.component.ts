import { Component, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { CadastroComponent } from '../../auth/cadastro/cadastro.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent, CadastroComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private viewContainerRef: ViewContainerRef) {} // Injete o ViewContainerRef

  abrirModalLogin() {
    // Crie uma instância do componente de login dinamicamente
    const loginComponent =
      this.viewContainerRef.createComponent(LoginComponent);

    // Acesse a instância do componente e chame o método openModal()
    loginComponent.instance.openModal();
  }

  abrirModalCadastro() {
    const cadastroComponent =
      this.viewContainerRef.createComponent(CadastroComponent);
    cadastroComponent.instance.openModal();
  }
}
