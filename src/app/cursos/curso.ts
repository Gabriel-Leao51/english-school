// curso.ts

export interface Curso {
  _id: string;
  titulo: string;
  descricao: string;
  modalidade: string;
  subcategoria: string;
  nivel: string;
  professor: string;
  imagem: string;
  preco: number;
  duracao: string;
  idioma: string;
  vagas: number;
  horario: string;
  materialDidatico: string;
  createdAt: Date;
  updatedAt: Date;
}
