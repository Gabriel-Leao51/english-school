const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const authMiddleware = require("./middlewares/authMiddleware");

const User = require("../models/User");

// Geração de Token JWT
function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400, // expira em 1 dia (em segundos)
  });
}

// Rota de Cadastro
router.post("/register", async (req, res) => {
  console.log("Dados recebidos no cadastro:", req.body);
  const { email } = req.body;

  try {
    // Verifica se o email já está cadastrado
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Email já cadastrado" });
    }

    console.log("Criando usuário..."); // Log antes de criar o usuário
    const user = await User.create(req.body);
    console.log("Usuário criado:", user); // Log após criar o usuário

    // Não retorna a senha na resposta
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    console.error("Erro durante o cadastro:", err);
    return res.status(400).send({ error: "Falha ao cadastrar usuário" });
  }
});

// Rota de Login
router.post("/login", async (req, res) => {
  console.log("Iniciando o processo de login..."); // Adicione este log
  console.log("Dados recebidos:", req.body); // Adicione este log
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password"); // Busca o usuário e seleciona a senha criptografada

    if (!user) {
      console.log("Usuário não encontrado.");
      return res.status(400).send({ error: "Usuário não encontrado" });
    }

    // Compara a senha fornecida com a senha criptografada do banco de dados
    if (!(await bcrypt.compare(password, user.password))) {
      console.log("Senha inválida.");
      return res.status(400).send({ error: "Senha inválida" });
    }

    // Não retorna a senha na resposta
    user.password = undefined;

    console.log("Login bem-sucedido! Gerando token...");

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    console.error("Erro durante o login:", err);
    return res.status(400).send({ error: "Falha ao autenticar" });
  }
});

module.exports = router;
