// backend/index.js
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001; // Porta para a API

const authRoutes = require("./routes/authRoutes"); // Importe as rotas de autenticação
app.use("/api/auth", authRoutes); // Use as rotas de autenticação com o prefixo '/api/auth'

// Conexão com o MongoDB (substitua com sua string de conexão)
mongoose
  .connect("mongodb://localhost:27017/KeystoneEnglish")
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Permite receber dados JSON
app.use(express.json());

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});