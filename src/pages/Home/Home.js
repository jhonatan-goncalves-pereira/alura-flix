import React from 'react';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategorySection from '../../components/CategorySection';

const Home = () => {
  const frontendVideos = [
    { title: 'React Basics', imageUrl: 'https://via.placeholder.com/200' },
    { title: 'Advanced CSS', imageUrl: 'https://via.placeholder.com/200' },
  ];

  const backendVideos = [
    { title: 'Node.js Introduction', imageUrl: 'https://via.placeholder.com/200' },
    { title: 'Express.js Guide', imageUrl: 'https://via.placeholder.com/200' },
  ];

  const innovationVideos = [
    { title: 'Design Thinking', imageUrl: 'https://via.placeholder.com/200' },
    { title: 'Agile Methodologies', imageUrl: 'https://via.placeholder.com/200' },
  ];

  const managementVideos = [
    { title: 'Project Management', imageUrl: 'https://via.placeholder.com/200' },
    { title: 'Leadership Skills', imageUrl: 'https://via.placeholder.com/200' },
  ];

  return (
    <>
      <Header />
      <Banner imageUrl="https://via.placeholder.com/1200x300" title="Destaques do AluraFlix" />
      <CategorySection title="Frontend" videos={frontendVideos} />
      <CategorySection title="Backend" videos={backendVideos} />
      <CategorySection title="Inovação" videos={innovationVideos} />
      <CategorySection title="Gestão" videos={managementVideos} />
      <Footer />
    </>
  );
};

export default Home;
