import React from 'react';
import styles from './CategorySection.module.css';

const CategorySection = ({ title, videos }) => (
  <section className={styles.categorySection}>
    <h3>{title}</h3>
    <div className={styles.videos}>
      {videos.map((video, index) => (
        <div key={index} className={styles.videoItem}>
          <img src={video.imageUrl} alt={video.title} />
          <p>{video.title}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CategorySection;
