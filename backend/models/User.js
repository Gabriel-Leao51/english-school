const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // salva o email em minúsculo para padronizar
  },
  password: {
    type: String,
    required: true,
    select: false, // não retorna a senha nas consultas por padrão
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Criptografando a senha antes de salvar
UserSchema.pre("save", async function (next) {
  // Verifica se a senha foi modificada (para não criptografar novamente ao atualizar outros dados)
  if (!this.isModified("password")) {
    return next();
  }

  // Gera um salt (string aleatória) para aumentar a segurança da criptografia
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha fornecida com a senha criptografada
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
