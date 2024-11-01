import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, NgIf],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  @Input() isEditing: boolean = false; // Indica se está em modo edição
  @Input() artigoId: string | null = null; // ID do artigo a ser editado
  @Output() artigoSalvo = new EventEmitter<void>();
  postForm!: FormGroup;
  isOpen = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private blogService: BlogService) {}

  ngOnInit(): void {
    this.createForm();
    if (this.isEditing && this.artigoId) {
      this.carregarDadosArtigo();
    }
  }

  openModal(): void {
    this.isOpen = true;
    if (this.isEditing && this.artigoId) {
      this.carregarDadosArtigo();
    }
  }

  createForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: [''],
    });
  }

  carregarDadosArtigo() {
    this.isLoading = true;
    this.blogService.getArtigo(this.artigoId!).subscribe({
      next: (artigo) => {
        this.postForm.patchValue(artigo);
        this.isLoading = false;
        this.isOpen = true;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erro ao carregar artigo:', error);
      },
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    const artigo: Artigo = this.postForm.value;

    if (this.isEditing && this.artigoId) {
      this.blogService.updateArtigo(this.artigoId, artigo).subscribe({
        next: () => {
          this.artigoSalvo.emit(); // Emite o evento de artigo salvo
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao atualizar artigo:', error);
        },
      });
    } else {
      this.blogService.createArtigo(artigo).subscribe({
        next: () => {
          this.artigoSalvo.emit(); // Emite o evento de artigo salvo
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao criar artigo:', error);
        },
      });
    }
  }

  closeModal(): void {
    this.isOpen = false;
    this.postForm.reset(); // Limpa o formulário depois de fechar
  }
}
