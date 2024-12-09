const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config(); // Carrega as variáveis do .env

// Acessa as variáveis de ambiente
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

// Configurações do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Ex: 'gmail', 'outlook', etc.
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
});

router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;
    // Cria o conteúdo do email utilizando os dados do formulário
    const mailOptions = {
      from: email, // Email do usuário como remetente
      to: gmailUser, // Seu email como destinatário
      subject: assunto, // Assunto do email enviado pelo usuário
      html: `
        <h2>Nova mensagem de contato de: ${nome}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    };

    // Envia o email
    await transporter.sendMail(mailOptions);

    console.log("Email enviado com sucesso!");
    res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ message: "Erro ao enviar mensagem." });
  }
});

module.exports = router;
