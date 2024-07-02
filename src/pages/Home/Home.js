import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Banner from '../../components/Banner';
import CategorySection from '../../components/CategorySection';
import styles from './Home.module.css';

const Home = () => {
  const [videos, setVideos] = useState({
    frontend: [],
    backend: [],
    inovacao: [],
    gestao: []
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3001/videos');
        if (!response.ok) {
          throw new Error('Não foi possível obter os dados.');
        }
        const data = await response.json();
        organizeVideosByCategory(data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchVideos();
  }, []);

  const organizeVideosByCategory = (data) => {
    const organizedVideos = {
      frontend: [],
      backend: [],
      inovacao: [],
      gestao: []
    };

    data.forEach(video => {
      switch (video.category) {
        case 'Frontend':
          organizedVideos.frontend.push(video);
          break;
        case 'Backend':
          organizedVideos.backend.push(video);
          break;
        case 'Inovação':
          organizedVideos.inovacao.push(video);
          break;
        case 'Gestão':
          organizedVideos.gestao.push(video);
          break;
        default:
          break;
      }
    });

    setVideos(organizedVideos);
  };

  return (
    <div>
      <Header />
      <Banner imageUrl="https://via.placeholder.com/1200x300" title="Destaques do AluraFlix" />
      <div className={styles.home}>
        <CategorySection title="Frontend" videos={videos.frontend} />
        <CategorySection title="Backend" videos={videos.backend} />
        <CategorySection title="Inovação" videos={videos.inovacao} />
        <CategorySection title="Gestão" videos={videos.gestao} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
