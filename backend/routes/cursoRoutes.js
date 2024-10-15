// routes/cursoRoutes.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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
    const curso = await Curso.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "professores",
          localField: "professor",
          foreignField: "_id",
          as: "professor",
        },
      },
      { $unwind: "$professor" },
    ]);

    if (curso.length === 0) {
      return res.status(404).send({ error: "Curso não encontrado." });
    }

    res.send(curso[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao buscar curso." });
  }
});

module.exports = router;
