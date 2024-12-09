const express = require("express");
const router = express.Router();
const Professor = require("../models/Professor");

// Listar todos os professores
router.get("/", async (req, res) => {
  try {
    const professores = await Professor.find();
    res.send(professores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Buscar professor por ID
router.get("/:id", getProfessor, (req, res) => {
  res.json(res.professor); // Usando middleware (ver próximo passo)
});

// Middleware para buscar professor por ID
async function getProfessor(req, res, next) {
  let professor;
  try {
    professor = await Professor.findById(req.params.id);
    if (professor == null) {
      return res.status(404).json({ message: "Professor não encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.professor = professor;
  next();
}

module.exports = router;
