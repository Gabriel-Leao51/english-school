import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css',
})
export class PaginaNaoEncontradaComponent {}
