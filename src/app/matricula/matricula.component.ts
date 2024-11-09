import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CursoService } from '../services/curso.service';
import { Curso } from '../models/curso.model';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css'],
})
export class MatriculaComponent implements OnInit {
  matriculaForm!: FormGroup;
  cursos: Curso[] = [];
  cursoSelecionadoId: string | null = null;
  cursoSelecionado: Curso | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.matriculaForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      curso: ['', Validators.required],
      termos: [false, Validators.requiredTrue],
    });

    this.route.paramMap.subscribe((params) => {
      this.cursoSelecionadoId = params.get('id');

      this.cursoService.obterCursos().subscribe((cursos) => {
        this.cursos = cursos;

        if (this.cursoSelecionadoId) {
          this.cursoSelecionado = this.cursos.find(
            (c) => c._id === this.cursoSelecionadoId
          );

          if (this.cursoSelecionado) {
            this.matriculaForm.patchValue({ curso: this.cursoSelecionado._id });
          }
        }
      });
    });
  }

  onSubmit() {
    if (this.matriculaForm.valid) {
      console.log(this.matriculaForm.value);
      this.stripeService
        .createCheckoutSession(this.matriculaForm.value.curso)
        .then(() => {
          // ... (lógica após o checkout, como redirecionar ou exibir mensagem)
        })
        .catch((error) => {
          console.error('Erro no checkout:', error);
        });
    }
  }
}
