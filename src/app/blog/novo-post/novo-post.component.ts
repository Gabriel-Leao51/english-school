import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';

import { ModalComponent } from '../../shared/modal/modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-novo-post',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, NgIf],
  templateUrl: './novo-post.component.html',
  styleUrl: './novo-post.component.css',
})
export class NovoPostComponent {
  showModal = false;
  @Output() refresh = new EventEmitter<void>();
  novoPostForm!: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.createForm();
  }

  createForm() {
    this.novoPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: [''],
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit() {
    if (this.novoPostForm.invalid) {
      return;
    }

    const novoArtigo: Artigo = this.novoPostForm.value;

    this.blogService.createArtigo(novoArtigo).subscribe({
      next: (artigoCriado) => {
        console.log('Artigo criado:', artigoCriado);
        this.novoPostForm.reset();
        this.refresh.emit();
      },
      error: (error) => {
        console.error('Erro ao criar artigo:', error);
      },
    });
  }
}
