import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './NovoVideo.module.css'; // Importe o CSS module corretamente

const NovoVideo = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Lógica para salvar o vídeo
    console.log({ title, category, imageUrl, videoUrl, description });
  };

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImageUrl('');
    setVideoUrl('');
    setDescription('');
  };

  return (
    <div>
      <Header />
      <main className={styles.novoVideo}> 
        <h1>Novo Vídeo</h1>
        <form onSubmit={handleSave}> {/* Adicione o evento onSubmit para capturar o envio do formulário */}
          <label>
            Título:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Categoria:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Inovação">Inovação</option>
              <option value="Gestão">Gestão</option>
            </select>
          </label>
          <label>
            URL da Imagem:
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>
          <label>
            URL do Vídeo:
            <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          </label>
          <label>
            Descrição:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          <button type="submit">Salvar</button> {/* Remova type="button" para usar o padrão de submit do formulário */}
          <button type="button" onClick={handleClear}>Limpar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default NovoVideo;
