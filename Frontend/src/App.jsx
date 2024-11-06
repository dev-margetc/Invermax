import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from './pages/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Filter from './pages/Filter';




function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>

      {/* Barra de navegación */}
       <Navbar />
       
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />    
        {/* Agrega más rutas aquí si tienes otros componentes de página */}
        <Route path="/filter" element={<Filter />} /> 
      </Routes>

     {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;
