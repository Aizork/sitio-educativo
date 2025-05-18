import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Resources from './components/Resources';
import Contact from './components/Contact';

import './App.css';

function App() {
  const [page, setPage] = React.useState('home');

  const renderPage = () => {
    if (page === 'home') return <Home />;
    if (page === 'resources') return <Resources />;
    if (page === 'contact') return <Contact />;
  };

  return (
    <div className="App">
      <Navbar setPage={setPage} currentPage={page} />
      <main>{renderPage()}</main>
      <footer>
        <p>© 2025 Organización Sin Fines de Lucro - Recursos Educativos</p>
      </footer>
    </div>
  );
}

export default App;
