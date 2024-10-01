const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./middlewares/authMiddleware");

const User = require("../models/User");

// Geração de Token JWT
function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400, // expira em 1 dia (em segundos)
  });
}

// Rota de Cadastro
router.post("/register", authMiddleware, async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica se o email já está cadastrado
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Email já cadastrado" });
    }

    const user = await User.create(req.body);

    // Não retorna a senha na resposta
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao cadastrar usuário" });
  }
});

// Rota de Login
router.post("/login", authMiddleware, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password"); // Busca o usuário e seleciona a senha criptografada

    if (!user) {
      return res.status(400).send({ error: "Usuário não encontrado" });
    }

    // Compara a senha fornecida com a senha criptografada do banco de dados
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Senha inválida" });
    }

    // Não retorna a senha na resposta
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao autenticar" });
  }
});

module.exports = router;
