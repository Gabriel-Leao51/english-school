import { Component, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { CadastroComponent } from '../../auth/cadastro/cadastro.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuOpen = false;
  isLoggedIn: boolean = false;
  currentUser: any = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    public authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe(
      (status) => (this.isLoggedIn = status)
    );
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenuOnLinkClick(event: Event) {
    if (window.innerWidth <= 768 && this.menuOpen) {
      if (event.target instanceof HTMLAnchorElement) {
        this.menuOpen = false;
      }
    }
  }

  abrirModalLogin() {
    this.viewContainerRef.clear();
    const loginComponent =
      this.viewContainerRef.createComponent(LoginComponent);
    loginComponent.instance.openModal();
  }

  abrirModalCadastro() {
    this.viewContainerRef.clear();
    const cadastroComponent =
      this.viewContainerRef.createComponent(CadastroComponent);
    cadastroComponent.instance.openModal();
  }

  logout(): void {
    this.authService.logout();
  }
}
