const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 1. Obter o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Nenhum token fornecido" });
  }

  // 2. Dividir o token em duas partes ("Bearer" e o token em si)
  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Token inválido" });
  }

  // 3. Desestruturar o array "parts"
  const [scheme, token] = parts;

  // 4. Verificar se começa com "Bearer" (padrão JWT)
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token mal formatado" });
  }

  // 5. Verificar e decodificar o token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token inválido" });
    }

    // 6. Incluir o ID do usuário na requisição para uso posterior
    req.userId = decoded.id;

    // Continua para o próximo middleware ou rota
    return next();
  });
};
