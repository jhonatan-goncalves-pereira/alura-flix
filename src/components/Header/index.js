import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
import styles from './Header.module.css'; // Importe o módulo de estilos corretamente

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Logo@2x.png" alt="Logo da sua aplicação" />
      </div>
       <nav>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Início</Link>
        <Link to="/novo-video" className={`nav-link ${location.pathname === '/novo-video' ? 'active' : ''}`}>Novo Vídeo</Link>
      </nav>
    </header>
  );
};

export default Header;
