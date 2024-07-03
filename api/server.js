const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // Importe o módulo 'fs' para leitura de arquivos

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

let videos = []; // Inicializa o array vazio para armazenar os vídeos

// Função para ler o arquivo db.json e atribuir os dados ao array 'videos'
const readDbFile = () => {
  fs.readFile('../db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return;
    }
    try {
      videos = JSON.parse(data); // Parse do JSON para um array de objetos
      console.log('Data loaded from db.json:', videos);
    } catch (error) {
      console.error('Error parsing db.json:', error);
    }
  });
};

// Endpoint para obter todos os vídeos
app.get('/videos', (req, res) => {
  res.json(videos);
});

// Endpoint para adicionar um novo vídeo
app.post('/videos', (req, res) => {
  const video = req.body;
  video.id = videos.length ? videos[videos.length - 1].id + 1 : 1;
  videos.push(video);
  res.status(201).json(video);
});

// Endpoint para editar um vídeo
app.put('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedVideo = req.body;
  videos = videos.map(video => (video.id === id ? updatedVideo : video));
  res.json(updatedVideo);
});

// Endpoint para deletar um vídeo
app.delete('/videos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  videos = videos.filter(video => video.id !== id);
  res.status(204).end();
});

// Inicializa a leitura do arquivo db.json ao iniciar o servidor
readDbFile();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
