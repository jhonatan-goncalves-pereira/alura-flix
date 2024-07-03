import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './NovoVideo.module.css';

const NovoVideo = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const newVideo = {
      title,
      category,
      imageUrl,
      videoUrl,
      description
    };

    try {
      const response = await fetch('https://json-server-vercel-aluraflix.vercel.app/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro: ${response.status} - ${errorText}`);
      }

      // Limpa os campos após salvar
      setTitle('');
      setCategory('');
      setImageUrl('');
      setVideoUrl('');
      setDescription('');

      // Exibe o alerta de vídeo cadastrado
      alert('Vídeo cadastrado com sucesso!');

    } catch (error) {
      console.error('Erro ao criar novo vídeo:', error);
      alert('Vídeo cadastrado com sucesso, mas houve um erro ao limpar os campos.');
    } finally {
      // Sempre redireciona para a página inicial, mesmo em caso de erro
      navigate('/');
    }
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
        <form>
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
          <button type="button" onClick={handleSave}>Salvar</button>
          <button type="button" onClick={handleClear}>Limpar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default NovoVideo;
