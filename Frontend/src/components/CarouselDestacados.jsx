import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import InmuebleService from '../services/inmuebles/InmuebleService';

const CarouselDestacados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Los destacados traidos por el backend se cargan acá
  const [destacados, setDestacados] = useState([]);


  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Manejar la navegacion dependiendo del inmueble
  const handleNavigate = (item) => {
    // 3 plantillas - para proyectos(compra), para comprar (otros) y arrendar (otros)
    let idInmueble = item.idInmueble;
    let modalidad = item.modalidad//arriendo o compra
    let isProyecto = item.proyecto;
    let ruta = '/'
    if (isProyecto) {
      ruta = '/compra'; // Para proyectos
    } else {
      if (modalidad == "arriendo") {
        ruta = '/arriendo' // Otros para arrendar
      } else {
        ruta = '/usado' //Otros para venta   
      }

    }
    navigate(ruta, { state: { idInmueble } }); // Pasa los datos como estado
  };

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        const data = await InmuebleService.getInmueblesDestacados();
        //const dataInmueble = await InmuebleService.getConfiguracionCreacion();

        //console.log(dataInmueble);
        setDestacados(data);
      } catch (error) {
        console.error("Error al cargar los inmuebles:", error);
      }
    };
    fetchInmuebles();
  }, []);

  const items = [
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    }
  ];

  const updateCarousel = () => {
    const itemsPerSlide = window.innerWidth >= 768 ? 3 : 1;
    const offset = -(100 / itemsPerSlide) * currentIndex;
    document.querySelector('.carousel-track').style.transform = `translateX(${offset}%)`;
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : destacados.length - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex < destacados.length - 1 ? currentIndex + 1 : 0);
  };

  useEffect(() => {
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <h1 className="mb-3 text-dark center raya">INMUEBLES <b>DESTACADOS</b></h1>
      <div class="centered-line"></div>
      <div className="carousel-track">
        {destacados && destacados.map((item, index) => (
          <div className="carousel-items" key={index}>
            <div className="property-card-d">
              {item.badge.toLowerCase() === "destacado" && (
                <span className="badge-destacado">
                  Destacado
                  <span className='badge-destacado-start'><img src="/img/icons/Star1.svg" alt="" width="55px" loading="lazy" /></span>
                </span>
              )}
              {item.nuevo === true && (
                <span className="badge-nuevo" style={{ overflow: "hidden" }}>Nuevo</span>
              )}

              <img className="property-img" src={item.imgSrc} alt={`Inmueble ${index + 1}`} loading="lazy" />
              <div className="property-info">
                {item.proyecto === true && (
                  <span className='zona-proyecto'>Proyecto</span>
                )}

                {/* Formato de la propiedad info */}
                <p>
                  {item.info.split(" - ").map((line, index) => (
                    <span key={index} className={index === 0 ? "info-title" : "info-detail-bold"}>
                      {line}
                      {index < item.info.split(" - ").length - 1 && <br />}
                    </span>
                  ))}
                </p>

                {/* Formato de la propiedad price */}
                <p className="price">
                  {item.price.split(" - ").map((line, index) => {
                    // Expresión regular para detectar números y signos de dólar
                    const regex = /(\$[\d.,]+)/g;
                    const parts = line.split(regex);
                    return (
                      <span key={index} className="price-part">
                        {parts.map((part, i) =>
                          regex.test(part) ? (
                            <span key={i} className="price-green">{part}</span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                        {index < item.price.split(" - ").length - 1 && <br />}
                      </span>
                    );
                  })}
                </p>

                <div className="property-details container">
                  <div className="detail-item">
                    <span className="icon"><img src="/img/icons/fa-icon.svg" alt="#" loading="lazy" /></span>
                    <span className="value">{item.area}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon"><img src="/img/icons/fa-icon2.svg" alt="#" loading="lazy" /></span>
                    <span className="value">{item.rooms}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon"><img src="/img/icons/fa-icon3.svg" alt="#" loading="lazy" /></span>
                    <span className="value">{item.baths}</span>
                  </div>
                </div>
                <p>{item.nombreCustomer || "Nombre vendedor / Inmobiliaria"}</p>

              </div>
              <button className="btn-ver-inmueble" onClick={() => handleNavigate(item)}>Ver inmueble</button>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-button" onClick={prevSlide}><img src="/img/icons/frame27.svg" alt="fecla" loading="lazy" /></button>
        <button className="carousel-button" onClick={nextSlide}><img src="/img/icons/frame26.svg" alt="flecha" loading="lazy" /></button>
      </div>
    </div>
  );
};

export default CarouselDestacados;
