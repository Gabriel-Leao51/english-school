require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const contatoRoutes = require("./routes/contatoRoutes");
const artigoRoutes = require("./routes/artigoRoutes");

const app = express();
const PORT = process.env.PORT || 3001; // Porta para a API

const uri = process.env.MONGODB_URI;

// Permite receber dados JSON
app.use(express.json());

// Configurar o middleware cors ANTES das outras rotas
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/professores", professorRoutes);
app.use("/api/mensagens", contatoRoutes);
app.use("api/auth", authRoutes);
app.use("/api/artigos", artigoRoutes);

// Conexão com o MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
