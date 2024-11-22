import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarregarImagemDirective } from '../../directives/imgLoader.directive';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CarregarImagemDirective],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
