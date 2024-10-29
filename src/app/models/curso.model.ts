import { Professor } from './professor.model';

export interface Curso {
  _id: string;
  titulo: string;
  imagem: string;
  descricao: string; // Descrição resumida (já existente)
  descricaoDetalhada: string; // Nova propriedade: Descrição detalhada
  modalidade: string;
  nivel: string;
  professor: Professor;
  duracao: string; // (já existente)
  cargaHoraria: string; // Nova propriedade
  idioma: string;
  vagas: number;
  horario: string;
  materialDidatico: string;
  investimento: number; // Nova propriedade
  conteudoProgramatico: string[]; // Nova propriedade: Array de tópicos
  createdAt: Date;
  updatedAt: Date;
}
