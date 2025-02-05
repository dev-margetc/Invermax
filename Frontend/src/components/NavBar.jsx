import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Usa Link para manejar las rutas
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import TiposInmueblesBanner from "./modules/inmuebles/TiposInmueblesBanner";
import servicioService from "../services/servicios/ServicioService";

// Se le pasa el token desde App
const Navbar = ({ token, setToken }) => {
  // Componente de navegacion
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpenComprar, setSubmenuOpenComprar] = useState(false);
  const [submenuOpenOtrosTramites, setSubmenuOpenOtrosTramites] = useState(false);

  // Servicios
  const [servicios, setServicios] = useState([]);

  // Manejar busqueda de los dropdown
  const handleFilterClick = (filters) => (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del enlace
    navigate('/filter', { state: { formData: filters } }); // Redirigir y pasar los filtros
  };

  // Manejar redireccion a servicios. Toma la posicion de la lista
  const handleServiceClick = (posicion) => (e) => {
    e.preventDefault();// Evitar el comportamiento por defecto del enlace
    navigate('/otrosServicios', { state: { posicionServicio: posicion } }); // Redirigir y pasar la posicion del servicio
  }


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenuComprar = () => {
    setSubmenuOpenComprar(!submenuOpenComprar);
    setSubmenuOpenOtrosTramites(false);
  };

  const toggleSubmenuOtrosTramites = () => {
    setSubmenuOpenOtrosTramites(!submenuOpenOtrosTramites);
    setSubmenuOpenComprar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false); // Cierra el menú si se expande a vista de escritorio
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await servicioService.getServicios();
        setServicios(data); // Los datos ya están formateados
        console.log(data);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
      }
    };
    fetchServicios();
  }, []);

  return (
    <header className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: ["/Nuevo-Inmueble", "/publicar-nuevo-inmueble", "/mis-inmuebles", "/leads", "/mi-plan"].includes(location.pathname) ? "#FFFFFF" : "" }}>
      <div className="navbar-header" >
        <div className="navbar-logo">
          <Link to="/" className="highlight">
            <img src={["/Nuevo-Inmueble", "/publicar-nuevo-inmueble", "/mis-inmuebles", "/leads", "/mi-plan"].includes(location.pathname) ? "img/logo-2.png" : "img/logo.png"} alt="Logo" className="logo" loading="lazy" style={["/Nuevo-Inmueble", "/publicar-nuevo-inmueble", "/mis-inmuebles", "/leads", "/mi-plan"].includes(location.pathname) ? { width: "63px", height: "45px" } : {}} />
          </Link>
        </div>
        {["/Nuevo-Inmueble", "/publicar-nuevo-inmueble", "/mis-inmuebles", "/leads", "/mi-plan"].includes(location.pathname) ? (
          <div className="desktop-menu-nuevo-inmueble">
            <Link to="/publicar-nuevo-inmueble" className="highlight">Publicar nuevo inmueble</Link>
            <Link to="/mis-inmuebles" className="highlight">Mis inmuebles</Link>
            <Link to="/leads" className="highlight">Leads</Link>
            <Link to="/mi-plan" className="highlight">Mi plan</Link>
          </div>
        ) : (
          <div className="desktop-menu">
            <a href="#" onClick={handleFilterClick({ purpose: "Rentar", category: "", city: null })}>Arriendos</a>
            <div className="submenu">
              <button className="submenu-toggle" onClick={toggleSubmenuComprar}>
                Comprar{" "}
                <span>
                  <img src="/img/icons/Frame6.svg" alt="comprar" loading="lazy" />
                </span>
              </button>
              {submenuOpenComprar && (
                <div className="submenu-content">
                  <TiposInmueblesBanner></TiposInmueblesBanner>
                  <Link to="/planes" className="highlight">
                    Planes
                  </Link>
                </div>
              )}
            </div>
            <div className="submenu">
              <button className="submenu-toggle" onClick={toggleSubmenuOtrosTramites}>
                Otros trámites{" "}
                <span>
                  <img src="/img/icons/Frame6.svg" alt="" loading="lazy" />
                </span>
              </button>
              {submenuOpenOtrosTramites && (
                <div className="submenu-content">
                  {servicios && servicios.map((servicio, index) => (
                    // Se pasa el indice o posicion en la lista
                    <a key={index} onClick={handleServiceClick(index)} className="highlight" href="#">
                      {servicio.titulo}
                    </a>
                  ))}
                  <Link to="/otrosServicios" className="highlight">
                    Otros servicios
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="navbar-right">
          <button className="menu-toggle d-lg-none" onClick={toggleMenu}>
            {isOpen ? <span>&#10005;</span> : <i className="fas fa-bars"></i>}
          </button>
          {["/Nuevo-Inmueble", "/publicar-nuevo-inmueble", "/mis-inmuebles", "/leads", "/mi-plan"].includes(location.pathname) ? (
            <>
              <button className="btn btn-primary ms-2 " style={{ background: 'none', color: 'black', border: "none" }}>
                <img
                  src="/img/icons/fa-icon-user.svg"
                  alt="icon-ingresar"
                  loading="lazy"
                />
                <span>Editar Perfil</span>
              </button>
              <LogoutButton />
              <button className="menu-toggle d-lg-none" onClick={toggleMenu}>
                {isOpen ? <span>&#10005;</span> : <i className="fas fa-bars"></i>}
              </button>
            </>
          ) : (
            <>
              {token === null ? (
                <LoginButton setToken={setToken} />
              ) : (
                <LogoutButton />
              )}
              <a
                className="btn btn-danger ms-2 btn-publicar"
                style={{ padding: "5px 10px" }}
                href="/planes"
              >
                Publicar
              </a>
              <button className="menu-toggle d-lg-none" onClick={toggleMenu}>
                {isOpen ? <span>&#10005;</span> : <i className="fas fa-bars"></i>}
              </button>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="navbar-menu mobile-menu">
          <button className="close-button" onClick={toggleMenu}>
            <img src="/img/icons/xmark.svg" alt="exis" loading="lazy" />
          </button>
          <a href="#" className="arriendo-link" style={{ paddingTop: "65px" }}
            onClick={handleFilterClick({ purpose: "Rentar", category: "", city: null })}>
            Arriendo</a>

          <div className="submenu">
            <button className="submenu-toggle" onClick={toggleSubmenuComprar}>
              Comprar{" "}
              <span>
                <img src="/img/icons/Frame6.svg" alt="" loading="lazy" />
              </span>
            </button>
            {submenuOpenComprar && (
              <div className="submenu-content">
                <TiposInmueblesBanner />
                <Link to="/planes" className="highlight">
                  Planes
                </Link>
              </div>
            )}
          </div>
          <div className="submenu">
            <button className="submenu-toggle" onClick={toggleSubmenuOtrosTramites}>
              Otros trámites{" "}
              <span>
                <img src="/img/icons/Frame6.svg" alt="" loading="lazy" />
              </span>
            </button>
            {submenuOpenOtrosTramites && (
              <div className="submenu-content">
                  {servicios && servicios.map((servicio, index) => (
                    // Se pasa el indice o posicion en la lista
                    <a key={index} onClick={handleServiceClick(index)} className="highlight" href="#">
                      {servicio.titulo}
                    </a>
                  ))}
                <Link to="/otrosServicios" className="highlight">
                  Otros servicios
                </Link>
              </div>
            )}
          </div>
          {["/Nuevo-Inmueble", "/publicar-nuevo-inmueble", "/mis-inmuebles", "/leads", "/mi-plan"].includes(location.pathname) ? (
            <>
              <Link to="/publicar-nuevo-inmueble" className="highlight" style={{ color: "black", marginTop: "50px" }}>Publicar nuevo inmueble</Link>
              <Link to="/mis-inmuebles" className="highlight" style={{ color: "black" }}>Mis inmuebles</Link>
              <Link to="/leads" className="highlight" style={{ color: "black" }}>Leads</Link>
              <Link to="/mi-plan" className="highlight" style={{ color: "black" }}>Mi plan</Link>
            </>
          ) : (
            <>
              <a href="#" className="arriendo-link" style={{ paddingTop: "65px" }}>
                Arriendos
              </a>
              <div className="submenu">
                <button className="submenu-toggle" onClick={toggleSubmenuComprar}>
                  Comprar{" "}
                  <span>
                    <img src="/img/icons/Frame6.svg" alt="" loading="lazy" />
                  </span>
                </button>
                {submenuOpenComprar && (
                  <div className="submenu-content">
                    <a href="#" className="highlight">
                      Apartamentos
                    </a>
                    <a href="#" className="highlight">
                      Casas
                    </a>
                    <a href="#" className="highlight">
                      Oficinas
                    </a>
                    <Link to="/planes" className="highlight">
                      Planes
                    </Link>
                  </div>
                )}
              </div>
              <div className="submenu">
                <button className="submenu-toggle" onClick={toggleSubmenuOtrosTramites}>
                  Otros trámites{" "}
                  <span>
                    <img src="/img/icons/Frame6.svg" alt="" loading="lazy" />
                  </span>
                </button>
                {submenuOpenOtrosTramites && (
                  <div className="submenu-content">
                  {servicios && servicios.map((servicio, index) => (
                    // Se pasa el indice o posicion en la lista
                    <a key={index} onClick={handleServiceClick(index)} className="highlight" href="#">
                      {servicio.titulo}
                    </a>
                  ))}
                    <Link to="/otrosServicios" className="highlight">
                      Otros servicios
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;


