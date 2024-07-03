import React, { useState } from 'react';
import VideoPopup from '../VideoPopup'; // Importe o componente VideoPopup

const CategorySection = ({ title, videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoPopup = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="card-list">
        {videos.map(video => (
          <div key={video.id} className="card" onClick={() => openVideoPopup(video.videoUrl)}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <VideoPopup videoUrl={selectedVideo} onClose={closeVideoPopup} />
      )}
    </div>
  );
};

export default CategorySection;
