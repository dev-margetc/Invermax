import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Usa Link para manejar las rutas
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import TiposInmueblesBanner from "./modules/inmuebles/TiposInmueblesBanner";

// Se le pasa el token desde App
const Navbar = ({token, setToken}) => {
  // Componente de navegacion
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpenComprar, setSubmenuOpenComprar] = useState(false);
  const [submenuOpenOtrosTramites, setSubmenuOpenOtrosTramites] = useState(false);

  // Manejar busqueda de los dropdown
  const handleFilterClick = (filters) => (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del enlace
    navigate('/filter', { state: { formData: filters } }); // Redirigir y pasar los filtros
  };


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

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-header">
        <div className="navbar-logo">
          <Link to="/" className="highlight">
            <img src="img/logo.png" alt="Logo" className="logo" loading="lazy" />
          </Link>

        </div>
        <div className="desktop-menu">
          <a href="#" onClick={handleFilterClick({ purpose: "Rentar", category: "", city:null })}>Arriendos</a>
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
                <a href="#" className="highlight">
                  Certificados
                </a>
                <a href="#" className="highlight">
                  Tasaciones
                </a>
                <Link to="/otrosServicios" className="highlight">
                  Otros servicios
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-right">
          {/* Si el token es null mostrar el boton de login y el enlace de publicar */}
          {token === null ? (
            <LoginButton setToken={setToken} />
          ) : (
            // Si el token existe mostrar el boton de logout
            <LogoutButton setToken={setToken}/>
          )
          }
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
        </div>
      </div>

      {isOpen && (
        <div className="navbar-menu mobile-menu">
          <button className="close-button" onClick={toggleMenu}>
            <img src="/img/icons/xmark.svg" alt="exis" loading="lazy" />
          </button>
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
                <a href="#" className="highlight">
                  Certificados
                </a>
                <a href="#" className="highlight">
                  Tasaciones
                </a>
                <Link to="/otrosServicios" className="highlight">
                  Otros servicios
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
