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

  const fetchVideos = () => {
    fetch('https://json-server-vercel-aluraflix.vercel.app/videos')
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

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedVideo(null);
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
      .then(data => {
        // Atualiza o estado dos vídeos
        const updatedVideos = videos.map(video =>
          video.id === data.id ? data : video
        );
        setVideos(updatedVideos);
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
        // Atualiza o estado dos vídeos
        const updatedVideos = videos.filter(video => video.id !== videoId);
        setVideos(updatedVideos);
      })
      .catch(error => {
        console.error('Error deleting video:', error);
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
