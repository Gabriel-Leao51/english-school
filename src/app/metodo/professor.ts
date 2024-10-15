export interface Professor {
  _id: string; // Certifique-se de que o ID seja uma string
  nome: string;
  biografia: string;
  formacao: string;
  especialidades: string[];
  foto: string;
}
