// models/Curso.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CursoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  modalidade: {
    type: String,
    enum: ["Crianças", "Adolescentes", "Adultos", "Professores"],
    required: true,
  },
  subcategoria: {
    // Subcategorias dentro de cada modalidade
    type: String,
    enum: [
      // Crianças
      "Kids Beginner",
      "Kids Intermediate",
      "Kids Advanced",
      "Inglês para Viagens (Crianças)",
      "Preparatório para Exames (Crianças)",

      // Adolescentes
      "Teen Beginner",
      "Teen Intermediate",
      "Teen Advanced",
      "Conversação para Adolescentes",
      "Inglês para Intercâmbio",

      // Adultos
      "Adult Beginner",
      "Adult Intermediate",
      "Adult Advanced",
      "Business English",
      "Inglês para Viagens",
      "Preparatório para TOEFL/IELTS",

      // Professores
      "Metodologias de Ensino",
      "Inglês para Professores",
      "Técnicas de Conversação",
      "Preparatório para CELTA/TEFL",
    ],
  },
  nivel: {
    type: String,
    enum: ["Básico", "Intermediário", "Avançado"],
  },
  professor: {
    type: Schema.Types.ObjectId,
    ref: "Professor", // Referencia o modelo Professor
    required: true,
  },
  imagem: {
    type: String,
  },
  preco: {
    type: Number,
  },
  duracao: {
    type: String,
  },
  idioma: {
    type: String,
    default: "Inglês", // Valor padrão, você pode alterá-lo se oferecer outros idiomas
  },
  vagas: {
    type: Number,
    default: 20, // Número padrão de vagas, ajuste conforme necessário
  },
  horario: {
    type: String, // Ex: "Segundas e quartas, 19h-21h"
  },
  materialDidatico: {
    // Descrição do material didático incluso
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Curso", CursoSchema);
