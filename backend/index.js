// backend/index.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Importe as rotas de autenticação

const app = express();
const PORT = process.env.PORT || 3001; // Porta para a API

// Permite receber dados JSON
app.use(express.json());

// Configurar o middleware cors ANTES das outras rotas
app.use(
  cors({
    origin: "http://localhost:4200", // Permita requisições de http://localhost:4200
  })
);

app.use("/api/auth", authRoutes); // Use as rotas de autenticação com o prefixo '/api/auth'

// Conexão com o MongoDB (substitua com sua string de conexão)
mongoose
  .connect("mongodb://localhost:27017/KeystoneEnglish")
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
