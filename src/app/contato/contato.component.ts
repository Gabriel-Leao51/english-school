import { Component } from '@angular/core';
import { ContatoMainComponent } from './contato-main/contato-main.component';
import { MapaComponent } from './mapa/mapa.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ContatoMainComponent, MapaComponent],
  templateUrl: './contato.component.html',
})
export class ContatoComponent {}
