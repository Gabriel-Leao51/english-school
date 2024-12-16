import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

import { BlogService } from '../../services/blog.service';
import { Artigo } from '../../models/artigo.model';
import { ModalComponent } from '../../shared/modal/modal.component';

import { Cloudinary } from '@cloudinary/url-gen';
import { environment } from '../../../environments/environment.prod';

declare const cloudinary: any;

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule, NgIf],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  @Input() isEditing: boolean = false;
  @Input() artigoId: string | null = null;
  @Output() artigoSalvo = new EventEmitter<void>();

  postForm!: FormGroup;
  isOpen = false;
  isLoading = false;
  myWidget: any;

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
          this.artigoSalvo.emit();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao atualizar artigo:', error);
        },
      });
    } else {
      this.blogService.createArtigo(artigo).subscribe({
        next: () => {
          this.artigoSalvo.emit();
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
    this.postForm.reset();
  }

  openWidget(): void {
    const uploadOptions = {
      cloudName: 'dxokgmnnc',
      uploadPreset: 'keystone_blog',
      folder: 'images',
      // api_key: environment.cloudinaryApiKey, // Não é necessária para uploads unsigned
    };

    this.myWidget = cloudinary.createUploadWidget(
      uploadOptions,
      (error: any, result: any) => {
        if (error) {
          console.error('Erro no upload:', error);
        } else if (result && result.event === 'success') {
          console.log('Upload bem-sucedido:', result.info);
          this.postForm.patchValue({ imageUrl: result.info.secure_url });
        } else if (result) {
          console.log('Outro evento:', result.event);
        }
      }
    );
    this.myWidget.open();
  }
}
