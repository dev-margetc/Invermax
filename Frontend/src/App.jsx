import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Filter from './pages/Filter';
import Plantilla from './pages/Plantilla';
import PlantillaCompraUsada from './pages/PlantillaCompraUsada';
import PlantillaArriendo from './pages/PlantillaArriendo';
import Blog from './pages/Blog';
import Plantillas from './components/Plantillas';
import Post from './pages/Post';
import OtrosServicios from './pages/OtrosServicios';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Planes from './pages/Planes';
import TablaPlanes from './components/TablaPlanes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>

      {/* Barra de navegación */}
       <Navbar />
       
      {/* Rutas */}
      <div className='fondo-principal'>
      <Routes>
        <Route path="/" element={<Home />} />    
        {/* Agrega más rutas aquí si tienes otros componentes de página */}
        <Route path="/filter" element={<Filter />} /> 
        <Route path="/compra" element={<Plantilla />} /> 
        <Route path="/usado" element={<PlantillaCompraUsada />} /> 
        <Route path="/arriendo" element={<PlantillaArriendo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/plantillas" element={<Plantillas />} />
        <Route path="/post" element={<Post />} />
        <Route path="/otrosServicios" element={<OtrosServicios />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/tabla" element={<TablaPlanes />} />
      </Routes>
      </div>

     {/* Footer */}
      <Footer />
      
    </Router>
  );
}

export default App;
