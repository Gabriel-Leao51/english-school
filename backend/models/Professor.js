const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const professorSchema = new Schema(
  {
    nome: { type: String, required: true },
    biografia: { type: String },
    formacao: { type: String },
    especialidades: [{ type: String }],
    foto: { type: String }, // URL da foto do professor
  },
  { collection: "professores" }
);

module.exports = mongoose.model("Professor", professorSchema);
