import { Professor } from './professor.model';

export interface Curso {
  _id: string;
  titulo: string;
  imagem: string;
  descricao: string;
  descricaoDetalhada: string;
  modalidade: string;
  nivel: string;
  professor: Professor;
  duracao: string;
  cargaHoraria: string;
  idioma: string;
  vagas: number;
  horario: string;
  materialDidatico: string;
  investimento: number;
  conteudoProgramatico: string[];
  createdAt: Date;
  updatedAt: Date;
}
