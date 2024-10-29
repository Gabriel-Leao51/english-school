// routes/artigos.js

const express = require("express");
const router = express.Router();
const Artigo = require("../models/Artigo");

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

module.exports = router;
