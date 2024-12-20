const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Artigo = require("../models/Artigo");
const authMiddleware = require("../middlewares/authMiddleware");

// GET /api/artigos
router.get("/", async (req, res) => {
  try {
    const artigos = await Artigo.find().sort({ createdAt: -1 });
    res.json(artigos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar artigos" });
  }
});

// GET /api/artigos/:id
router.get("/:id", async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.json(artigo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar artigo" });
  }
});

// POST /api/artigos
router.post("/", async (req, res) => {
  try {
    const novoArtigo = new Artigo(req.body);
    const artigoSalvo = await novoArtigo.save();
    res.status(201).json(artigoSalvo);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar artigo" });
  }
});

// PUT /api/artigos/:id
router.put("/:id", async (req, res) => {
  try {
    const artigoAtualizado = await Artigo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!artigoAtualizado) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.json(artigoAtualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar artigo" });
  }
});

// DELETE /api/artigos/:id
router.delete("/:id", async (req, res) => {
  try {
    const artigoDeletado = await Artigo.findByIdAndDelete(req.params.id);
    if (!artigoDeletado) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.json({ message: "Artigo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar artigo" });
  }
});

router.post("/:id/comentarios", authMiddleware, async (req, res) => {
  try {
    const artigo = await Artigo.findById(req.params.id);
    if (!artigo) {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }

    const { content, author, userId } = req.body; // Obtém todas as informações do req.body

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "userId inválido" });
    }

    console.log(req.body);

    const novoComentario = {
      content,
      userId: new mongoose.Types.ObjectId(userId), // userId agora vem do req.body
      author, // author também vem do req.body
      createdAt: new Date(),
    };
    const artigoAtualizado = await Artigo.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: novoComentario } }, // Usa $push para adicionar o comentário
      { new: true } // Retorna o artigo atualizado
    );

    if (!artigoAtualizado) {
      return res.status(404).json({ error: "Artigo não encontrado." });
    }

    res.status(201).json(novoComentario); // Ou retorne artigoAtualizado
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    res.status(500).json({ error: "Erro ao adicionar comentário" });
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
