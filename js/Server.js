const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors()); // Permitir requisições de outras origens
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/relatosDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Modelo do Relato
const relatoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    relato: String,
    data: { type: Date, default: Date.now }
});

const Relato = mongoose.model('Relato', relatoSchema);

// Rota POST para envio de relato
app.post('/enviar-relato', async (req, res) => {
    try {
        const { nome, email, relato } = req.body;
        const novoRelato = new Relato({ nome, email, relato });
        await novoRelato.save();
        res.status(200).send('Relato enviado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao enviar o relato.');
    }
});

// Rota GET para buscar relatos
app.get('/relatos', async (req, res) => {
    try {
        const relatos = await Relato.find().sort({ data: -1 });
        res.json(relatos);
    } catch (error) {
        res.status(500).send('Erro ao obter relatos.');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
