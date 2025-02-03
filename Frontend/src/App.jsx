import { useState, useEffect } from 'react';
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
import Inmobiliaria from './pages/Inmobiliaria';
import Canasta from './pages/Canasta';
import NuevoInmueble from './pages/NuevoInmueble';
import MisInmuebles from './pages/MisInmuebles';
import Leads from './pages/Leads';
import MiPlan from './pages/MiPlan';
import EditarPerfil from './pages/EditarPerfil';

function App() {

  // Token de autenticación
  const [token, setToken] = useState(null);

  // Cargar el token desde localStorage al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>

      {/* Barra de navegación */}
      <Navbar token={token} setToken={setToken} />

      {/* Rutas */}
      <div className='fondo-principal'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/compra" element={<Plantilla />} />
          <Route path="/usado" element={<PlantillaCompraUsada />} />
          <Route path="/arriendo" element={<PlantillaArriendo />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/plantillas" element={<Plantillas />} />
          <Route path="/post" element={<Post />} />
          <Route path="/otrosServicios" element={<OtrosServicios />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/Inmobiliaria" element={<Inmobiliaria />} />
          <Route path="/Canasta" element={<Canasta />} />
          <Route path="/Nuevo-Inmueble" element={<NuevoInmueble />} />

          <Route path="/publicar-nuevo-inmueble" element={<NuevoInmueble />} />
          <Route path="/mis-inmuebles" element={<MisInmuebles />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/mi-plan" element={<MiPlan />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />

        </Routes>
      </div>

      {/* Footer */}
      <Footer />

    </Router>
  );
}

export default App;
