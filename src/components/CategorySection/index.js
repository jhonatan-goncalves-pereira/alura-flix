import React from 'react';
import styles from './CategorySection.module.css';

const CategorySection = ({ title, videos = [], onEdit, onDelete }) => (
  <section className={styles.categorySection}>
    <h3>{title}</h3>
    <div className={styles.videos}>
      {videos.map((video) => (
        <div key={video.id} className={styles.videoItem}>
          <img src={video.imageUrl} alt={video.title} />
          <p>{video.title}</p>
          <div className={styles.buttonContainer}>
            <button onClick={() => onEdit(video)}>Editar</button>
            <button onClick={() => onDelete(title.toLowerCase(), video.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CategorySection;
