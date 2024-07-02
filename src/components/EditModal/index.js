import React, { useState } from 'react';
import styles from './EditModal.module.css'; // Certifique-se de que o arquivo CSS está com o nome correto

const EditModal = ({ video, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(video.title);
  const [imageUrl, setImageUrl] = useState(video.imageUrl);

  const handleSave = () => {
    onSave({ ...video, title, imageUrl });
    onClose();
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
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;
