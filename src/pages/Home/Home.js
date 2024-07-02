// Home.js

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategorySection from '../../components/CategorySection';
import EditModal from '../../components/EditModal';
import styles from './Home.module.css'; // Importe o CSS module corretamente

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch('http://localhost:3001/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/videos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log(`Video with ID ${id} deleted successfully.`);
          // Atualiza localmente removendo o vídeo da lista
          const updatedVideos = videos.filter(video => video.id !== id);
          setVideos(updatedVideos);
        } else {
          console.error(`Failed to delete video with ID ${id}.`);
        }
      })
      .catch(error => {
        console.error('Error deleting video:', error);
      });
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSaveModal = (updatedVideo) => {
    // Atualiza o vídeo localmente após edição
    const updatedVideos = videos.map(video =>
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos);
    handleCloseModal(); // Fecha o modal após salvar
  };

  return (
    <div>
      <Header />
      <main className={styles.home}>
        <h1>AluraFlix</h1>
        <CategorySection
          title="Frontend"
          videos={videos.filter(video => video.category === 'Frontend')}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CategorySection
          title="Backend"
          videos={videos.filter(video => video.category === 'Backend')}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CategorySection
          title="Inovação"
          videos={videos.filter(video => video.category === 'Inovação')}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CategorySection
          title="Gestão"
          videos={videos.filter(video => video.category === 'Gestão')}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
      {editModalOpen && (
        <EditModal
          video={selectedVideo}
          isOpen={editModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
};

export default Home;
