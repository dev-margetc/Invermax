import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpenComprar, setSubmenuOpenComprar] = useState(false);
  const [submenuOpenOtrosTramites, setSubmenuOpenOtrosTramites] = useState(false);

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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-header">
        <div className="navbar-logo">
          <img src="img/logo.png" alt="Logo" className="logo" loading="lazy" />
        </div>
        <div className="desktop-menu">
          <a href="#" >Arriendos</a>
          <div className="submenu">
            <button className="submenu-toggle" onClick={toggleSubmenuComprar}>
              Comprar <span><img src="/img/icons/Frame6.svg" alt="comprar" loading="lazy" /></span>
            </button>
            {submenuOpenComprar && (
              <div className="submenu-content">
                <a href="#" className="highlight">Apartamentos</a>
                <a href="#" className="highlight">Casas</a>
                <a href="#" className="highlight">Oficinas</a>
                <a href="#" className="highlight">Texto estándar</a>
              </div>
            )}
          </div>
          <div className="submenu">
            <button className="submenu-toggle" onClick={toggleSubmenuOtrosTramites}>
              Otros trámites <span><img src="/img/icons/Frame6.svg" alt="" loading="lazy"/></span>
            </button>
            {submenuOpenOtrosTramites && (
              <div className="submenu-content">
                <a href="#" className="highlight">Certificados</a>
                <a href="#" className="highlight">Transaciones</a>
                <a href="#" className="highlight">Otros servicios</a>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-right">
          <a className="nav-link menus" href="#">
            <img src="/img/icons/fa-icon-user.svg" alt="icon-ingresar" loading="lazy"/> 
            <span className="ingresar-text">Ingresar</span>
          </a>
          <a className="btn btn-danger ms-2 btn-publicar" style={{padding:"5px 10px"}} href="#">Publicar</a>
          {/* Botón del menú para dispositivos móviles */}
          <button className="menu-toggle d-lg-none" onClick={toggleMenu}>
            {isOpen ? <span>&#10005;</span> : <i className="fas fa-bars"></i>}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="navbar-menu mobile-menu">
          <button className="close-button" onClick={toggleMenu}><img src="/img/icons/xmark.svg" alt="exis" loading="lazy"/></button>
          <a href="#" className='arriendo-link' style={{paddingTop:"65px"}}>Arriendos</a>
          <div className="submenu">
            <button className="submenu-toggle" onClick={toggleSubmenuComprar}>
              Comprar <span><img src="/img/icons/Frame6.svg" alt="" loading="lazy"/></span>
            </button>
            {submenuOpenComprar && (
              <div className="submenu-content">
                <a href="#" className="highlight">Apartamentos</a>
                <a href="#" className="highlight">Casas</a>
                <a href="#" className="highlight">Oficinas</a>
                <a href="#" className="highlight">Texto estándar</a>
              </div>
            )}
          </div>
          <div className="submenu">
            <button className="submenu-toggle" onClick={toggleSubmenuOtrosTramites}>
              Otros trámites <span><img src="/img/icons/Frame6.svg" alt="" loading="lazy"/></span>
            </button>
            {submenuOpenOtrosTramites && (
              <div className="submenu-content">
                <a href="#" className="highlight">Certificados</a>
                <a href="#" className="highlight">Tasaciones</a>
                <a href="#" className="highlight">Otros servicios</a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;