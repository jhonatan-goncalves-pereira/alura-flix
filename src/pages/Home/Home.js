import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategorySection from '../../components/CategorySection';
import EditModal from '../../components/EditModal';
import styles from './Home.module.css';
import Banner from '../../components/Banner';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('https://json-server-vercel-aluraflix.vercel.app/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedVideo(null);
    fetchVideos(); // Atualiza a lista de vídeos após fechar o modal de edição
  };

  const handleSaveModal = (updatedVideo) => {
    fetch(`https://json-server-vercel-aluraflix.vercel.app/videos/${updatedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVideo),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        fetchVideos(); // Atualiza a lista de vídeos após salvar as alterações
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error updating video:', error);
      });
  };

  const handleDelete = (videoId) => {
    fetch(`https://json-server-vercel-aluraflix.vercel.app/videos/${videoId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchVideos(); // Atualiza a lista de vídeos após excluir o vídeo
      })
      .catch(error => {
        console.error('Error deleting video:', error);
        fetchVideos(); // Atualiza a lista de vídeos mesmo se ocorrer um erro na exclusão
      });
  };

  return (
    <div>
      <Header />
      <Banner />
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
