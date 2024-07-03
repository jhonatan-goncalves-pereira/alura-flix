import React, { useState } from 'react';
import VideoPopup from '../VideoPopup'; // Importe o componente VideoPopup
import styles from './CategorySection.module.css';

const CategorySection = ({ title, videos, onEdit, onDelete }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoPopup = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className={styles.cardList}>
        {videos.map((video) => (
          <div key={video.id} className={styles.card}>
            <div className={styles.cardContent} onClick={() => openVideoPopup(video.videoUrl)}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={() => onEdit(video)}>Editar</button>
              <button onClick={() => onDelete(video.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <VideoPopup videoUrl={selectedVideo} onClose={closeVideoPopup} />
      )}
    </div>
  );
};

export default CategorySection;
