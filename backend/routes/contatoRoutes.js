const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Acessa as variáveis de ambiente
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Configurações do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Ex: 'gmail', 'outlook', etc.
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
});

router.get("/google-maps-api-key", (req, res) => {
  const allowedReferer =
    "https://keystone-english-frontend.onrender.com/contato"; // Substitua pelo seu domínio, incluindo o protocolo
  const referer = req.headers.referer;

  if (referer && referer.startsWith(allowedReferer)) {
    res.json({ apiKey: googleMapsApiKey });
  } else {
    res.status(403).send("Forbidden");
  }
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
