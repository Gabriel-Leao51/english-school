import { Component } from '@angular/core';
import { ContatoMainComponent } from './contato-main/contato-main.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ContatoMainComponent],
  templateUrl: './contato.component.html',
})
export class ContatoComponent {}
