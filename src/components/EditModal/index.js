import React, { useState } from 'react';
import styles from './EditModal.module.css'; // Certifique-se de que o arquivo CSS está com o nome correto

const EditModal = ({ video, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState(video.title);
  const [category, setCategory] = useState(video.category || ''); // Adicione uma categoria padrão
  const [imageUrl, setImageUrl] = useState(video.imageUrl);
  const [videoUrl, setVideoUrl] = useState(video.videoUrl || ''); // Adicione uma URL de vídeo padrão
  const [description, setDescription] = useState(video.description || ''); // Adicione uma descrição padrão

  const handleSave = () => {
    onSave({ ...video, title, category, imageUrl, videoUrl, description });
    onClose();
  };

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImageUrl('');
    setVideoUrl('');
    setDescription('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Card</h2>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <form>
          <label>
            Título:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Categoria:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Selecione uma categoria</option>
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
          <div className={styles.buttonContainer}>
            <button type="button" onClick={handleSave}>Salvar</button>
            <button type="button" onClick={handleClear}>Limpar</button>  
           <button onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
