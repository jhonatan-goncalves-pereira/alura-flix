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
    fetch('/api/videos')
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
    fetch(`/api/videos/${updatedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVideo),
    })
    .then(response => response.json())
    .then(data => {
      const updatedVideos = videos.map(video =>
        video.id === data.id ? data : video
      );
      setVideos(updatedVideos);
      handleCloseModal();
    })
    .catch(error => console.error('Error updating video:', error));
  };

  const handleDelete = (id) => {
    fetch(`/api/videos/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedVideos = videos.filter(video => video.id !== id);
      setVideos(updatedVideos);
    })
    .catch(error => console.error('Error deleting video:', error));
  };

  return (
    <div>
      <Header />
      <main className={styles.home}>
        <h1>AluraFlix</h1>
        <CategorySection title="Frontend" videos={videos.filter(video => video.category === 'Frontend')} onEdit={handleEdit} onDelete={handleDelete} />
        <CategorySection title="Backend" videos={videos.filter(video => video.category === 'Backend')} onEdit={handleEdit} onDelete={handleDelete} />
        <CategorySection title="Inovação" videos={videos.filter(video => video.category === 'Inovação')} onEdit={handleEdit} onDelete={handleDelete} />
        <CategorySection title="Gestão" videos={videos.filter(video => video.category === 'Gestão')} onEdit={handleEdit} onDelete={handleDelete} />
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
