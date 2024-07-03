import React from 'react';
import styles from './VideoPopUp.module.css'; // Importe o CSS module corretamente

const VideoPopup = ({ videoUrl, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>Fechar</button>
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.iframe}
            src={videoUrl}
            title="Embedded Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
