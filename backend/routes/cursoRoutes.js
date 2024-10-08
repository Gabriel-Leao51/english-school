// routes/cursoRoutes.js

const express = require("express");
const router = express.Router();
const Curso = require("../models/Curso"); // Importe o modelo do curso

router.get("/", async (req, res) => {
  try {
    const cursos = await Curso.find(); // Busca todos os cursos no banco de dados
    res.send(cursos); // Envia a lista de cursos como resposta
  } catch (err) {
    res.status(500).send({ error: "Erro ao buscar cursos." }); // Trata erros e envia um status 500
  }
});

router.get("/:id", async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id); // Busca o curso pelo ID

    if (!curso) {
      return res.status(404).send({ error: "Curso não encontrado." }); // Retorna 404 se o curso não for encontrado
    }

    res.send(curso); // Envia os detalhes do curso como resposta
  } catch (err) {
    res.status(500).send({ error: "Erro ao buscar curso." }); // Trata erros e envia um status 500
  }
});

module.exports = router;
