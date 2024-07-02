import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importe o módulo de estilos corretamente

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Logo@2x.png" alt="Logo da sua aplicação" width={100} />
      </div>
      <nav>
        <Link to="/" className={styles.navLink}>Início</Link>
        <Link to="/novo-video" className={styles.navLink}>Novo Vídeo</Link>
      </nav>
    </header>
  );
};

export default Header;
