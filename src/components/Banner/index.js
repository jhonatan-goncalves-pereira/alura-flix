import React from 'react';
import './Banner.module.css';

const Banner = ({ imageUrl, title }) => (
  <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
    <h2>{title}</h2>
  </div>
);

export default Banner;
