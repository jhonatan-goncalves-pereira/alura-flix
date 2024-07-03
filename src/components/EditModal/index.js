import React, { useState } from 'react';
import styles from './EditModal.module.css';

const EditModal = ({ video, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(video.title);
  const [imageUrl, setImageUrl] = useState(video.imageUrl);
  const [videoUrl, setVideoUrl] = useState(video.videoUrl);
  const [description, setDescription] = useState(video.description);

  const handleSave = () => {
    const updatedVideo = {
      ...video,
      title,
      imageUrl,
      videoUrl,
      description,
    };
    onSave(updatedVideo);
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
