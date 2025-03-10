const express = require('express');
const Post = require('../models/post'); // Corrija o caminho se necessário
const router = express.Router();

// Rota para criar um novo post
router.post('/', async (req, res) => {
    const { titulo, subtitulo, topico, conteudo } = req.body;

    // Criando uma nova instância do post
    const post = new Post({
        titulo,
        subtitulo,
        topico,
        conteudo
    });

    try {
        await post.save(); // Salvando o post no banco de dados
        console.log('Post salvo:', post); // Log do post salvo
        res.status(201).send(post); // Retornando o post criado
    } catch (error) {
        console.error('Erro ao salvar o post:', error); // Log de erro
        res.status(400).send({ error: 'Erro ao criar o post' }); // Retornando erro
    }
});

// Rota para obter todos os posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // Buscando todos os posts
        res.json(posts); // Retornando os posts
    } catch (error) {
        console.error('Erro ao buscar posts:', error); // Log de erro
        res.status(500).send({ error: 'Erro ao buscar posts' }); // Retornando erro
    }
});

// Rota para obter posts filtrados por tópico
router.get('/topico/:topico', async (req, res) => {
    const { topico } = req.params;
    try {
        const posts = await Post.find({ topico }); // Buscando posts filtrados
        res.json(posts); // Retornando os posts filtrados
    } catch (error) {
        console.error('Erro ao buscar posts:', error); // Log de erro
        res.status(500).send({ error: 'Erro ao buscar posts' }); // Retornando erro
    }
});

// Rota específica para obter posts devocionais
router.get('/topico/devocionais', async (req, res) => {
    try {
        const posts = await Post.find({ topico: 'devocionais' }); // Buscando posts devocionais
        res.json(posts); // Retornando os posts devocionais
    } catch (error) {
        console.error('Erro ao buscar devocionais:', error); // Log de erro
        res.status(500).send({ error: 'Erro ao buscar devocionais' }); // Retornando erro
    }
});

// Rota específica para obter posts de teologia
router.get('/topico/teologia', async (req, res) => {
    try {
        const posts = await Post.find({ topico: 'teologia' }); // Buscando posts de teologia
        res.json(posts); // Retornando os posts de teologia
    } catch (error) {
        console.error('Erro ao buscar teologia:', error); // Log de erro
        res.status(500).send({ error: 'Erro ao buscar teologia' }); // Retornando erro
    }
});

// Rota específica para obter posts de estudos temáticos
router.get('/topico/estudos-tematicos', async (req, res) => {
    try {
        const posts = await Post.find({ topico: 'estudos temáticos' }); // Buscando posts de estudos temáticos
        res.json(posts); // Retornando os posts de estudos temáticos
    } catch (error) {
        console.error('Erro ao buscar estudos temáticos:', error); // Log de erro
        res.status(500).send({ error: 'Erro ao buscar estudos temáticos' }); // Retornando erro
    }
});

module.exports = router; // Exportando as rotas
