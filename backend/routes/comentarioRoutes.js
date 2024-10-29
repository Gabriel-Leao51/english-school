// routes/comentarios.js

const express = require("express");
const router = express.Router();
const Artigo = require("../models/Artigo");

// POST /api/artigos/:id/comentarios
router.post("/:id/comentarios", async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    const novoComentario = req.body;
    artigo.comments.push(novoComentario);
    await artigo.save();
    res.status(201).json(novoComentario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar comentário" });
  }
});

// GET /api/artigos/:id/comentarios
router.get("/:id/comentarios", async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.json(artigo.comments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
});

// DELETE /api/artigos/:id/comentarios/:comentarioId
router.delete("/:id/comentarios/:comentarioId", async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    const comentarioIndex = artigo.comments.findIndex(
      (comment) => comment._id.toString() === req.params.comentarioId
    );
    if (comentarioIndex === -1) {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    artigo.comments.splice(comentarioIndex, 1);
    await artigo.save();
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
});

module.exports = router;
