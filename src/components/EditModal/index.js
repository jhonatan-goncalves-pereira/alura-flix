import React, { useState, useEffect } from 'react';
import styles from './EditModal.module.css';

const EditModal = ({ video, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (video) {
      setTitle(video.title || '');
      setImageUrl(video.imageUrl || '');
      setVideoUrl(video.videoUrl || '');
      setDescription(video.description || '');
    }
  }, [video]);

  const handleSave = async () => {
    const updatedVideo = {
      ...video,
      title,
      imageUrl,
      videoUrl,
      description,
    };

    try {
      await onSave(updatedVideo);
      alert('Vídeo atualizado com sucesso!');
      onClose(); // Fecha o modal após salvar com sucesso
      // Limpa os campos após salvar
      setTitle('');
      setImageUrl('');
      setVideoUrl('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao salvar vídeo:', error);
      alert('Erro ao salvar vídeo: ' + error.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Vídeo</h2>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;
