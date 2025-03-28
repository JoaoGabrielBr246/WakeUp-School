const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

// Importa o modelo de Admin
const Admin = require("./models/Admin");

// Rota para verificar a senha digitada pelo usuário
app.post("/api/verificar-senha", async (req, res) => {
    const { senhaDigitada } = req.body;

    try {
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ erro: "Nenhum admin encontrado" });
        }

        const senhaValida = await bcrypt.compare(senhaDigitada, admin.senha);
        if (senhaValida) {
            return res.json({ autorizado: true });
        } else {
            return res.status(401).json({ autorizado: false, erro: "Senha incorreta!" });
        }
    } catch (error) {
        console.error("Erro ao verificar senha:", error);
        return res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

// Rotas principais
app.use('/api/posts', require('./routes/posts.js')); // Ajuste o caminho se necessário

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});