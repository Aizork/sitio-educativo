import React from 'react';
import './Navbar.css';

function Navbar({ setPage, currentPage }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Sitio Educativo</h1>
      <ul className="nav-links">
        <li 
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => setPage('home')}
        >
          Inicio
        </li>
        <li 
          className={currentPage === 'resources' ? 'active' : ''}
          onClick={() => setPage('resources')}
        >
          Recursos
        </li>
        <li 
          className={currentPage === 'contact' ? 'active' : ''}
          onClick={() => setPage('contact')}
        >
          Contacto
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
