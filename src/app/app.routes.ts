import { Routes } from '@angular/router';
import { CursoDetalhesComponent } from './cursos/curso-detalhes/curso-detalhes.component';
import { ProfessoresComponent } from './metodo/professores/professores.component';
import { ArtigoDetalhesComponent } from './blog/artigo/artigo-detalhes/artigo-detalhes.component';
import { MatriculaComponent } from './matricula/matricula.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Redireciona para /home quando a rota for vazia ('/')
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'cursos',
    loadComponent: () =>
      import('./cursos/cursos.component').then((c) => c.CursosComponent),
  },
  { path: 'cursos/:id', component: CursoDetalhesComponent },

  {
    path: 'matricula/:id',
    loadComponent: () =>
      import('./matricula/matricula.component').then(
        (c) => c.MatriculaComponent
      ),
  },
  { path: 'matricula', component: MatriculaComponent },

  {
    path: 'metodo',
    loadComponent: () =>
      import('./metodo/metodo.component').then((c) => c.MetodoComponent),
  },
  { path: 'professores', component: ProfessoresComponent },
  {
    path: 'contato',
    loadComponent: () =>
      import('./contato/contato.component').then((c) => c.ContatoComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./blog/blog.component').then((c) => c.BlogComponent),
  },
  { path: 'artigos/:id', component: ArtigoDetalhesComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./auth/cadastro/cadastro.component').then(
        (c) => c.CadastroComponent
      ),
  },
  // { path: '**', component: PaginaNaoEncontradaComponent }, // Rota para página não encontrada (opcional)
];
