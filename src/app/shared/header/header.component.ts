import { Component, ViewContainerRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { CadastroComponent } from '../../auth/cadastro/cadastro.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuOpen = false;

  constructor(private viewContainerRef: ViewContainerRef) {} // Injete o ViewContainerRef

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenuOnLinkClick(event: Event) {
    if (window.innerWidth <= 768 && this.menuOpen) {
      if (event.target instanceof HTMLAnchorElement) {
        // verifica se o clique foi em um link
        this.menuOpen = false;
      }
    }
  }

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
