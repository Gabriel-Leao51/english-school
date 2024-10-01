import { NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isOpen = false; // Controla se a modal está aberta
  @Output() closed = new EventEmitter<void>(); // Emite um evento quando o modal é fechado

  closeModal() {
    this.isOpen = false;
    this.closed.emit();
  }
}
