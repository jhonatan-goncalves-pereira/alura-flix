import React, { useState, useEffect } from 'react';
import styles from './Banner.module.css'; // Importe o CSS module corretamente

function Banner() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetchVideos();
    const interval = setInterval(fetchVideos, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:3001/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      if (data.length > 0) {
        selectRandomVideo(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const selectRandomVideo = (videos) => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideo = videos[randomIndex];
    setCurrentVideo(selectedVideo);
    setBackgroundImage(selectedVideo.imageUrl || ''); // Certifique-se de usar a URL correta da imagem
  };

  const getCategoryStyles = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return { backgroundColor: '#6BD1FF', color: '#F5F5F5', borderColor: '#6BD1FF', boxShadow: '0px 0px 17px 8px #6BD1FF inset' };
      case 'backend':
        return { backgroundColor: '#00C86F', color: '#F5F5F5', borderColor: '#00C86F', boxShadow: '0px 0px 17px 8px #00C86F inset' };
      case 'gestao':
        return { backgroundColor: '#FFBA05', color: '#F5F5F5', borderColor: '#FFBA05', boxShadow: '0px 0px 17px 8px #FFBA05 inset' };
      case 'inovacao':
        return { backgroundColor: '#e47900', color: '#F5F5F5', borderColor: '#e47900', boxShadow: '0px 0px 17px 8px #e47900 inset' };
      default:
        return { backgroundColor: '#6BD1FF', color: '#F5F5F5', borderColor: '#6BD1FF', boxShadow: '0px 0px 17px 8px #6BD1FF inset' };
    }
  };

  if (!currentVideo) {
    return <div className={styles.banner}>Carregando...</div>; // Renderização condicional para aguardar o carregamento do vídeo
  }

  const categoryStyles = getCategoryStyles(currentVideo.category);

  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.bannerWrapper}>
        <div className={styles.card}>
          <div className={styles.leftSection}>
            <div className={styles.titleCategory} style={{ backgroundColor: categoryStyles.backgroundColor }}>
              {currentVideo.category.toUpperCase()}
            </div>
            <div className={styles.subTitleCategory}>{currentVideo.title}</div>
            <div className={styles.textLeftSection}>{currentVideo.description}</div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.player} style={{ borderColor: categoryStyles.borderColor, boxShadow: categoryStyles.boxShadow }}>
              <img src={currentVideo.imageUrl} alt="Video Player" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
