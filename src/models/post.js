const mongoose = require('mongoose');

// Definição do esquema para os posts
const postSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    subtitulo: { type: String, required: true },
    topico: { type: String, required: true },
    conteudo: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now } // Adicionando a data de criação
});

// Criando o modelo para os posts
const Post = mongoose.model('Post', postSchema);

module.exports = Post; // Exportando o modelo