import React, { useState } from 'react';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategorySection from '../../components/CategorySection';
import EditModal from '../../components/EditModal';

const Home = () => {
  const [videos, setVideos] = useState({
    frontend: [
      { id: 1, title: 'React Basics', imageUrl: 'https://via.placeholder.com/200' },
      { id: 2, title: 'Advanced CSS', imageUrl: 'https://via.placeholder.com/200' },
    ],
    backend: [
      { id: 3, title: 'Node.js Introduction', imageUrl: 'https://via.placeholder.com/200' },
      { id: 4, title: 'Express.js Guide', imageUrl: 'https://via.placeholder.com/200' },
    ],
    innovation: [
      { id: 5, title: 'Design Thinking', imageUrl: 'https://via.placeholder.com/200' },
      { id: 6, title: 'Agile Methodologies', imageUrl: 'https://via.placeholder.com/200' },
    ],
    management: [
      { id: 7, title: 'Project Management', imageUrl: 'https://via.placeholder.com/200' },
      { id: 8, title: 'Leadership Skills', imageUrl: 'https://via.placeholder.com/200' },
    ],
  });

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = (category, videoId) => {
    const updatedVideos = { ...videos };
    updatedVideos[category] = updatedVideos[category].filter(video => video.id !== videoId);
    setVideos(updatedVideos);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSaveVideo = (updatedVideo) => {
    const updatedVideos = { ...videos };
    const category = Object.keys(updatedVideos).find(category =>
      updatedVideos[category].some(video => video.id === updatedVideo.id)
    );
    updatedVideos[category] = updatedVideos[category].map(video =>
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos);
  };

  return (
    <>
      <Header />
      <Banner imageUrl="https://via.placeholder.com/1200x300" title="Destaques do AluraFlix" />
      <CategorySection title="Frontend" videos={videos.frontend} onEdit={handleEdit} onDelete={handleDelete} />
      <CategorySection title="Backend" videos={videos.backend} onEdit={handleEdit} onDelete={handleDelete} />
      <CategorySection title="Inovação" videos={videos.innovation} onEdit={handleEdit} onDelete={handleDelete} />
      <CategorySection title="Gestão" videos={videos.management} onEdit={handleEdit} onDelete={handleDelete} />
      <Footer />

      {selectedVideo && (
        <EditModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveVideo}
        />
      )}
    </>
  );
};

export default Home;
