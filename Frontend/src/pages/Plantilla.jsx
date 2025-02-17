import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import CatalogoProductos from '../components/CatalogoProductos';
import EJ from '../components/EJ';
import '../style/App2.css';
import CameraIcon from '../assets/icons/camera.svg';
import VideoIcon from '../assets/icons/video.svg';
import MapIcon from '../assets/icons/map.svg';
import VrIcon from '../assets/icons/vr.svg';
import ExpandIcon from '../assets/icons/expand.svg'; // Ícono de ampliar

import Bano from '../assets/icons/bano.svg';
import Carro from '../assets/icons/carro.svg';
import Area from '../assets/icons/area.svg';
import Cama from '../assets/icons/cama.svg';

import { getIconByName } from '../services/inmuebles/IconsService'; // Importar el servicio de iconos
import InmuebleService from '../services/inmuebles/InmuebleService';

const Plantilla = () => {
  const [propertyData, setPropertyData] = useState(null);
  const [index, setIndex] = useState(0); // Estado para el índice del carrusel de imágenes
  const [videoIndex, setVideoIndex] = useState(0); // Estado para el índice del carrusel de videos
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("GENERAL"); // Estado que muestra todo
  const [dynamicData, setDynamicData] = useState({});
  const [calculadoraAbierta, setCalculadoraAbierta] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { idInmueble } = location.state || {};

  // Alterna entre abrir y cerrar la calculadora
  const toggleCalculadora = () => {
    setCalculadoraAbierta(!calculadoraAbierta);
    setMostrarResultados(false); // Resetea los resultados al cerrar
  };

  // Muestra los resultados
  const handleCalcular = () => {
    setMostrarResultados(true);
  };

  const cerrarResultados = () => {
    setMostrarResultados(false);
  };


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleVideoSelect = (selectedIndex) => {
    setVideoIndex(selectedIndex);
  };

  const handleExpandImage = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTypeSelect = (type) => {
    // Si el botón ya está seleccionado, volver a "GENERAL"
    setSelectedType((prevType) => (prevType === type ? "GENERAL" : type));
  };

  // Navegacion para redirigir al filtro usando el id del customer
  const handleNavigateCustomer = () => {
    // Enviar el ID para la consulta al backend y el nombre para mostrar
    const idCustomer = propertyData.idCustomer;
    const nombreCustomer = propertyData.nombreInmobiliaria;
    let ruta = '/filter';
    const filter = { purpose: "", category: "", city: null, idCustomer: idCustomer, nombreCustomer: nombreCustomer }
    navigate(ruta, { state: { formData: filter } }); // Pasa los datos como estado
  };

  // Hacer peticion para traer el inmueble
  const fetchInmueble = async () => {
    if (!idInmueble) {
      alert("No se ha seleccionado un inmueble");
      navigate("/filter");
      return
    }
    const inmuebleData = await InmuebleService.getInmuebleByIDCode(idInmueble, null, true);
    setPropertyData(inmuebleData);
    console.log(inmuebleData);
  }

  useEffect(() => {
    fetchInmueble();
    const carousels = document.querySelectorAll(".carrusel-container");

    carousels.forEach((carousel) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      // Cuando se inicia el deslizamiento
      const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      };

      // Durante el deslizamiento
      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad del deslizamiento
        carousel.scrollLeft = scrollLeft - walk;
      };

      // Finaliza el deslizamiento
      const handleMouseUp = () => {
        isDown = false;
      };

      carousel.addEventListener("mousedown", handleMouseDown);
      carousel.addEventListener("mouseleave", handleMouseUp);
      carousel.addEventListener("mouseup", handleMouseUp);
      carousel.addEventListener("mousemove", handleMouseMove);

      return () => {
        carousel.removeEventListener("mousedown", handleMouseDown);
        carousel.removeEventListener("mouseleave", handleMouseUp);
        carousel.removeEventListener("mouseup", handleMouseUp);
        carousel.removeEventListener("mousemove", handleMouseMove);
      };
    });
  }, []);

  useEffect(() => {
    if (propertyData) {
      const typeData = propertyData.informacionPorTipo[selectedType];
      console.log(typeData.images);
      setDynamicData(typeData || {});
    }
  }, [selectedType, propertyData]);

  // Reiniciar el índice activo cuando cambien las imágenes
  useEffect(() => {
    setIndex(0);
  }, [dynamicData.images]);

  // Reiniciar el índice activo cuando cambien los videos
  useEffect(() => {
    setVideoIndex(0);
  }, [dynamicData.videos]);
  useEffect(() => {
    setTimeout(() => {
      const mockData = {
        title: "TÍTULO PROYECTO/INMUEBLE",
        codigo: "784-84947-54616",
        status: "Nuevo / En venta",
        tipo: "Compra",
        ubicacion: "Carrera 15 #45-12, Bogotá, Colombia",
        estrato: "4",
        medidasTipo: [
          { tipoA: "94 m²" },
          { tipoB: "100 m²" },
          { tipoC: "115 m²" },
          { tipoD: "124 m²" }
        ],
        informacionPorTipo: {
          GENERAL: {
            description: "Este proyecto residencial está diseñado para ofrecer confort y funcionalidad, ubicado en una zona estratégica de Bogotá con fácil acceso a transporte público, servicios esenciales y zonas recreativas.",
            minPrice: "$80,000,000",
            maxPrice: "$110,000,000",
            images: [
              "./img/pruebaCarrusel.png",
              "./img/pruebaCarrusel.png",
              "./img/pruebaCarrusel.png",
              "./img/pruebaCarrusel.png",

            ],
            videos: [
              "https://www.w3schools.com/html/mov_bbb.mp4",
              "https://www.w3schools.com/html/movie.mp4"
            ],
            zonasComunes: [
              { name: "Parqueadero visitantes", icon: "ParqueaderoIcon" },
            ],
            cercaDe: [
              { name: "Transporte público", icon: "TransportePublicoIcon" }
            ]
          },
          A: {
            description: "El apartamento tipo A cuenta con una distribución funcional de 94 m², ideal para familias pequeñas o parejas jóvenes. Incluye 2 habitaciones, 2 baños, una sala-comedor amplia y un balcón con vista panorámica.",
            minPrice: "$80,000,000",
            maxPrice: "$90,000,000",
            habitaciones: "3",
            banos: "2",
            parqueadero: "Si",
            resumen: "TIPO A Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed vitae quod quos reiciendis saepe cupiditate odio, maiores facilis modi architecto animi corrupti et minima quidem molestias numquam nobis at autem.",
            images: [
              "./img/pruebaCarrusel.png",
              "./img/pruebaCarrusel.png",
              "./img/pruebaCarrusel.png",
              "./img/pruebaCarrusel.png",

            ],
            videos: [
              "https://www.w3schools.com/html/mov_bbb.mp4",
              "https://www.w3schools.com/html/movie.mp4"
            ],
            zonasComunes: [
            ],
            cercaDe: [
            ]
          }
        },
        minPrice: "$80,000,000",
        maxPrice: "$110,000,000",
        fechaEntrega: "15 de Noviembre, 2024",
        logoImage: "./img/nombreInmobiliaria.png",
        nombreInmobiliaria: "Inmobiliaria Ejemplo"
      };

      // setPropertyData(mockData);
    }, 1000); // Simula el retraso de una llamada al backend
  }, []);

  if (!propertyData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {/* Título */}
      <div className='banner-plantilla-titulo'>
        <div className='fondo-titulo'>
          <h1 className="mb-3 mt-2 text-dark text-center"><b>{propertyData.title}</b></h1>
          <p className='text-red codigo text-center'><b>Código: {propertyData.codigo}</b></p>
        </div>
      </div>

      <div className='container-plantilla'>

        {/* Sección 1 */}
        <div className='seccion-plantilla-1'>
          <div className="sticky-buttons">
            {propertyData.medidasTipo.map((tipo, index) => {
              const typeKey = String.fromCharCode(65 + index); // A, B, C, D...
              return (
                <button
                  key={index}
                  className={`tipo-btn ${selectedType === typeKey ? "active" : ""}`}
                  onClick={() => handleTypeSelect(typeKey)}
                >
                  <b>TIPO {typeKey}</b>
                  <br />
                  {tipo[`tipo${typeKey}`]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sección 2 */}
        <div className='seccion-plantilla-2'>
          {/* Primera sub-sección de la sección 2 */}
          <div className='seccion-1-2'>
            <div className='sub-2-1-1'>
              <Tabs defaultActiveKey="fotos" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="fotos" title={<><img src={CameraIcon} alt="Fotos" style={{ width: 15 }} loading="lazy" /> Fotos</>}>
                  {/* Carrusel de imágenes */}
                  <div className="custom-carousel-container">
                    <Carousel
                      activeIndex={index}
                      onSelect={handleSelect}
                      controls={false} // Desactiva los controles automáticos
                      indicators={false} // Desactiva los indicadores automáticos
                      interval={null}
                      className="custom-carousel-container"
                    >
                      {Array.isArray(dynamicData.images) && dynamicData.images.length > 0 ? (
                        dynamicData.images.map((image, idx) => (
                          <Carousel.Item key={idx}>
                            <img
                              className="d-block w-100"
                              src={image}
                              alt={`Slide ${idx + 1}`}
                              style={{ border: "10px solid white" }}
                              loading="lazy"
                            />
                          </Carousel.Item>
                        ))
                      ) : (
                        <Carousel.Item>
                          <p className="text-center">No hay imágenes disponibles</p>
                        </Carousel.Item>
                      )}
                    </Carousel>

                    {/* Botón de avanzar */}
                    <button
                      className="carousel-button-plantilla right"
                      onClick={() =>
                        handleSelect(
                          Array.isArray(dynamicData.images) && dynamicData.images.length > 0
                            ? (index + 1) % dynamicData.images.length
                            : 0
                        )
                      }
                    >
                      <img src="/img/icons/frame26.svg" alt="Siguiente" loading="lazy" />
                    </button>

                    {/* Botón de retroceder */}
                    <button
                      className="carousel-button-plantilla left"
                      onClick={() =>
                        handleSelect(
                          Array.isArray(dynamicData.images) && dynamicData.images.length > 0
                            ? index === 0
                              ? dynamicData.images.length - 1
                              : index - 1
                            : 0
                        )
                      }
                    >
                      <img src="/img/icons/frame27.svg" alt="Anterior" loading="lazy" />
                    </button>

                    {/* Botón de ampliar */}
                    <button className="expand-button rightb " onClick={handleExpandImage}>
                      <img src={ExpandIcon} alt="Expandir" loading="lazy" />
                    </button>
                  </div>
                </Tab>

                <Tab eventKey="videos" title={<><img src={VideoIcon} alt="Videos" style={{ width: 15 }} loading="lazy" /> Videos</>}>
                  {/* Carrusel de videos */}
                  <div className="custom-carousel-container">
                    <Carousel
                      activeIndex={videoIndex}
                      onSelect={handleVideoSelect}
                      controls={false}
                      indicators={false}
                      interval={null}
                    >
                      {Array.isArray(dynamicData.videos) && dynamicData.videos.length > 0 ? (
                        dynamicData.videos.map((video, idx) => (
                          <Carousel.Item key={idx}>
                            <video
                              className="d-block w-100"
                              controls
                              src={video}
                              type="video/mp4" // Especifica el tipo MIME
                              alt={`Video ${idx + 1}`}
                              style={{ border: "10px solid white" }}
                            >
                              Tu navegador no soporta la reproducción de videos.
                            </video>
                          </Carousel.Item>
                        ))
                      ) : (
                        <Carousel.Item>
                          <p className="text-center">No hay videos disponibles</p>
                        </Carousel.Item>
                      )}
                    </Carousel>

                    {/* Botón de retroceder */}
                    <button
                      className="carousel-button-plantilla left"
                      onClick={() =>
                        handleVideoSelect(
                          Array.isArray(dynamicData.videos) && dynamicData.videos.length > 0
                            ? videoIndex === 0
                              ? dynamicData.videos.length - 1
                              : videoIndex - 1
                            : 0
                        )
                      }
                    >
                      <img src="/img/icons/frame27.svg" alt="Anterior" loading="lazy" />
                    </button>

                    {/* Botón de avanzar */}
                    <button
                      className="carousel-button-plantilla right"
                      onClick={() =>
                        handleVideoSelect(
                          Array.isArray(dynamicData.videos) && dynamicData.videos.length > 0
                            ? (videoIndex + 1) % dynamicData.videos.length
                            : 0
                        )
                      }
                    >
                      <img src="/img/icons/frame26.svg" alt="Siguiente" loading="lazy" />
                    </button>
                  </div>
                </Tab>

                <Tab eventKey="mapa" title={<><img src={MapIcon} alt="Mapa" style={{ width: 15 }} loading="lazy" /> Mapa</>}>
                  {/* Mapa */}
                  <div className="map-container">
                    {propertyData.frameMap ? (

                      <iframe
                        src={propertyData.frameMap}
                        width="100%"
                        height="400"
                        style={{
                          border: "12px solid white",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps"
                      ></iframe>
                    ) : (
                      <p>Frame map no disponible</p>
                    )}
                  </div>
                </Tab>

                <Tab eventKey="recorrido" title={<><img src={VrIcon} alt="Recorrido 3D" style={{ width: 15 }} loading="lazy" /> Recorrido 3D</>}>
                  {/* Aquí puedes agregar contenido para el recorrido 3D cuando lo decidas */}
                  <p>{dynamicData.recorrido3D || "Contenido para Recorrido 3D no disponible"}</p>

                </Tab>
              </Tabs>
            </div>

            <div className='sub-2-1-2'>

              <div className='logo-nombreInmobilaria'>
                <a href="#" target="_blank" rel="#">
                  <img src={propertyData.logoImage} alt="logo" loading="lazy" height={60} width={100} />
                </a>
                <a href="#" onClick={() => handleNavigateCustomer()} style={{ textDecoration: 'none', color: "black" }}>
                  <h4 className='pt-2'><b>{propertyData.nombreInmobiliaria}</b></h4>
                </a>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid gray', margin: '10px 0' }} />

              <div className='span-dive'>
                <h5><b>{propertyData.tipo}</b></h5>
                <div>
                  {selectedType === "GENERAL" ? (
                    // Información para tipo "GENERAL"
                    <>
                      <span>Desde</span>
                      <h5 className='n'><b>${dynamicData.minPrice || "N/A"}</b></h5>
                      <span className='hasta'>Hasta</span>
                      <h5 className='n'><b>${dynamicData.maxPrice || "N/A"}</b></h5>
                      <span>Fecha próxima de entrega</span>
                      <h6><b>{propertyData.fechaEntrega}</b></h6>

                      <div className='desde-hasta-medidas'>
                        <div>
                          <h6>
                            <b>Medidas: </b>
                            {propertyData?.medidasTipo?.[0]?.tipoA || "No disponible"}
                          </h6>
                        </div>
                        <div>
                          <h6>
                            <b>Hasta: </b>

                            {
                              // Acceder a la propiedad de m2 de medidas
                              propertyData?.medidasTipo?.length
                                ? Object.values(propertyData.medidasTipo[propertyData.medidasTipo.length - 1])[1]
                                : "No disponible"
                            }

                          </h6>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Información para tipos diferentes a "GENERAL"
                    <>
                      <div >
                        {/* Valor del inmueble */}
                        <div className="valor-inmueble">
                          <p>Valor del inmueble:</p>
                          <h5 className="valor-destacado">
                            ${dynamicData.minPrice || "N/A"}
                          </h5>
                        </div>

                        {/* Características */}
                        <div className="caracteristicas">
                          <div className="caracteristica">
                            <img src={Area} alt="Área m²" className="caracteristica-icon" loading="lazy" />
                            <div className="caracteristica-text">
                              <p>Área m²</p>
                              <strong>{propertyData?.medidasTipo?.find(item => item[`tipo${selectedType}`])?.[`tipo${selectedType}`] || "No disponible"}</strong>
                            </div>
                          </div>
                          <div className="caracteristica">
                            <img src={Cama} alt="Habitaciones" className="caracteristica-icon" loading="lazy" />
                            <div className="caracteristica-text">
                              <p>Habit.</p>
                              <strong>{dynamicData.habitaciones || "N/A"}</strong>
                            </div>
                          </div>
                          <div className="caracteristica">
                            <img src={Bano} alt="Baños" className="caracteristica-icon" loading="lazy" />
                            <div className="caracteristica-text">
                              <p>Baños</p>
                              <strong>{dynamicData.banos || "N/A"}</strong>
                            </div>
                          </div>
                          <div className="caracteristica">
                            <img src={Carro} alt="Parqueadero" className="caracteristica-icon" loading="lazy" />
                            <div className="caracteristica-text">
                              <p>Parqueadero</p>
                              <strong>{dynamicData.parqueadero || "N/A"}</strong>
                            </div>
                          </div>
                        </div>
                        {/* Resumen */}
                        <div className="resumen">
                          <h6><b>Resumen</b></h6>
                          <p>{dynamicData.resumen || "No hay descripción disponible."}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className='btn-obtener-contacto'>
                  <button className='btn btn-dark'>Obtener numero de contacto</button>
                </div>

              </div>
            </div>
          </div>

          {/* Segunda sub-sección de la sección 2 */}
          <div className='sub-2-2-1'>

            <h2><b>Descripción</b></h2>
            <div class="centered-line-plantilla"></div>
            <h4><b>{propertyData.ubicacion}</b> | <b>Estrato {propertyData.estrato}</b></h4>
            <p>{dynamicData.description || "Descripción no disponible"}</p>
            <p>{console.log(propertyData.zonasComunes.length >0)}</p>
            <hr style={{ border: 'none', borderTop: '1px dotted #555555', margin: '10px 0' }} />

            {propertyData.zonasComunes && propertyData.zonasComunes.length > 0 && (
              <>
              
                <h2><b>Zonas Comunes</b></h2>
                <div className="centered-line-plantilla"></div>

                <div className="zonas-comunes-container">
                  {(Array.isArray(propertyData.zonasComunes) ? propertyData.zonasComunes : propertyData?.zonasComunes || []).map((zona, index) => (
                    <div className="zona-comun" key={index}>
                      <img src={getIconByName(zona.icon)} alt={zona.name} className="zona-icon" loading="lazy" />
                      <span>{zona.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {propertyData.cercaDe && propertyData.cercaDe.length > 0 &&(
              <>
                <hr style={{ border: 'none', borderTop: '1px dotted #555555', margin: '10px 0' }} />

                <h2><b>Cerca de</b></h2>
                <div class="centered-line-plantilla"></div>

                <div className="cerca-de-container">
                  {(Array.isArray(dynamicData.cercaDe) ? dynamicData.cercaDe : propertyData?.cercaDe || []).map((item, index) => (
                    <div className="cerca-item" key={index}>
                      <img src={getIconByName(item.icon)} alt={item.name} className="zona-icon" loading="lazy" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <hr style={{ border: 'none', borderTop: '1px dotted #555555', margin: '10px 0' }} />

            <div className='btn-obtener-contacto-bajo'>
              <div></div>
              <button className='btn btn-dark'>Obtener numero de contacto</button>
              <div></div>
            </div>

            <div>
              <div className="calculadora-container">
                {/* Botón inicial: solo visible cuando la calculadora está cerrada */}
                {!calculadoraAbierta && (
                  <button className="btn-toggle-calculadora" onClick={toggleCalculadora}>
                    Calcular crédito <span className="icono">▼</span>
                  </button>
                )}

                {/* Contenido de la calculadora */}
                {calculadoraAbierta && (
                  <div className="contenido-calculadora">

                    {/* Formulario siempre visible */}
                    <div className='formulario-p'>
                      <h2 className="titulo-calculadora">SIMULA TU CRÉDITO</h2>
                      <form className="formulario-calculadora">
                        <div className="form-group">
                          <label>Valor del inmueble:</label>
                          <input type="number" placeholder="Ingresa el valor del inmueble" />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Calcular en:</label>
                            <label> <EJ /></label>
                          </div>
                          <div className="form-group">
                            <label>Número de Años/Meses:</label>
                            <input type="number" placeholder="Número" />
                          </div>
                        </div>
                        <p className="nota-calculadora">
                          ⚠️ El valor en años debe ser entre 5 y 25 años; el valor en meses debe ser
                          mayor de 60 meses.
                        </p>
                        <div className="form-group">
                          <label>Seleccionar ciudad:</label>
                          <select id="city-select" className="city-select">
                            <option value="">Seleccione una ciudad</option>
                            <option value="bogota">Bogotá</option>
                            <option value="medellin">Medellín</option>
                            <option value="cali">Cali</option>
                            <option value="barranquilla">Barranquilla</option>
                            <option value="cartagena">Cartagena</option>
                            <option value="bucaramanga">Bucaramanga</option>
                            <option value="pereira">Pereira</option>
                            <option value="manizales">Manizales</option>
                            <option value="ibague">Ibagué</option>
                            <option value="santamarta">Santa Marta</option>
                          </select>
                        </div>
                        <button type="button" className="btn-calcular" onClick={handleCalcular}>
                          Calcular
                        </button>
                      </form>
                    </div>

                    {/* Resultados: visibles después de calcular -------------------------------------------------------------------------------------------*/}
                    {mostrarResultados && (
                      <div className="resultados-container">
                        {/* Botón "X" para cerrar */}
                        <button className="cerrar-btn" onClick={cerrarResultados}>✕</button>

                        {/* Primer grupo de resultados */}
                        <div className="grupo-resultados">
                          <h3 className="titulo-resultado">RESULTADOS</h3>
                          <div className="carrusel-container">
                            <div className="carrusel-wrapper">
                              <div className="columna-resultado">
                                <h4>Leasing habitacional</h4>
                                <p><strong className="valor-principal">$185.000.000</strong></p>
                                <p>Gastos notariales: <strong>$185.000</strong></p>
                                <p>Cada mes pagarías:</p>
                                <ul>
                                  <li>Tasa fija: <strong>0.8%</strong></li>
                                  <li>Seguro de vida e ITP: <strong>$12.475</strong></li>
                                  <li>Seguro de incendios: <strong>$12.475</strong></li>
                                </ul>
                              </div>
                              <div className="columna-resultado">
                                <h4>Crédito hipotecario</h4>
                                <p><strong className="valor-principal">$185.000.000</strong></p>
                                <p>Gastos notariales: <strong>$185.000</strong></p>
                                <p>Cada mes pagarías:</p>
                                <ul>
                                  <li>Tasa fija: <strong>0.8%</strong></li>
                                  <li>Seguro de vida e ITP: <strong>$12.475</strong></li>
                                  <li>Seguro de incendios: <strong>$12.475</strong></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Segundo grupo de resultados */}
                        <div className="grupo-resultados">
                          <h3 className="titulo-resultado">GASTOS PROMEDIOS</h3>
                          <div className="carrusel-container">
                            <div className="carrusel-wrapper">
                              <div className="columna-resultado">
                                <h4>Gastos notariales</h4>
                                <p>Pago total comprador:</p>
                                <p><strong className="valor-principal">$28.000.000</strong></p>
                                <ul>
                                  <li>Gastos notaría: <strong>$12.475</strong></li>
                                  <li>IVA: <strong>$12.475</strong></li>
                                  <li>Retención en la fuente: <strong>$12.475</strong></li>
                                  <li>Copias: <strong>$12.475</strong></li>
                                </ul>
                                <p className="nota-vendedor">
                                  El vendedor asume el 1% de la retención y un monto similar de IVA y gastos notariales para un total de $409.250.
                                </p>
                              </div>
                              <div className="columna-resultado">
                                <h4>Gastos de registro</h4>
                                <p>Total gasto de registro:</p>
                                <p><strong className="valor-principal">$28.000.000</strong></p>
                                <ul>
                                  <li>Impuestos de beneficencia: <strong>0.8%</strong></li>
                                  <li>Certificado de libertad: <strong>$12.475</strong></li>
                                  <li>Impuesto de registro: <strong>$12.475</strong></li>
                                </ul>
                                <p className="nota-vendedor">
                                  ¿Quién asume los impuestos de registro? El vendedor paga si es persona natural. Si el vendedor es persona jurídica, el comprador asume dicho monto.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="nota-final text-center">
                      <p className="text-center nota-texto">
                        ⚠️ Los resultados de esta calculadora son aproximados y no generan compromiso a Ivermax Inmobiliaria
                      </p>
                    </div>

                    {/* Botón para cerrar la calculadora */}
                    <button className="btn-cerrar" onClick={toggleCalculadora}>
                      Ocultar calculadora ▲
                    </button>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tercera sub-sección de la sección 2 */}
          <div className='sub-2-3-1'>
            <div className='sub-sub-3-1'>
              <div>
                <h2>
                  <b>Gastos notariales</b>
                </h2>
                <div class="centered-line-plantilla mt-3"></div>
                <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptates, exercitationem, atque assumenda omnis porro facilis deserunt voluptatem similique doloribus earum. </p>

                <span className='mt-4'>Valor del Inmueble:</span>
                <h5 style={{ color: "#0EB69A" }}><strong>{dynamicData.maxPrice || "N/A"}</strong></h5>

              </div>
              <div>
                <table className="tabla-gastos">
                  <tbody>
                    <tr>
                      <td>Gastos notariales</td>
                      <td className="valor"><strong>$185.000</strong></td>
                    </tr>
                    <tr>
                      <td>Copias</td>
                      <td className="valor"><strong>$100.000</strong></td>
                    </tr>
                    <tr>
                      <td>IVA</td>
                      <td className="valor"><strong>$185.000</strong></td>
                    </tr>
                    <tr>
                      <td>Retención en la fuente</td>
                      <td className="valor"><strong>$85.000</strong></td>
                    </tr>
                    <tr>
                      <td>Impuestos de registro</td>
                      <td className="valor"><strong>$85.000</strong></td>
                    </tr>
                    <tr>
                      <td>Impuestos de beneficencia</td>
                      <td className="valor"><strong>$85.000</strong></td>
                    </tr>
                    <tr className="total-row">
                      <td><strong>Valor total de titulación</strong></td>
                      <td className="valor total"><strong>$5.000.000</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="sub-sub-3-2">
              <div className="important-notice">
                <div className='importantes'>
                  <p><strong>Importante</strong></p>
                  <p>Estos gastos son una estimación y todos los valores son aproximados</p>
                </div>

              </div>
              <p className="note">*Los valores pueden variar de acuerdo al departamento por atribución de cada Asamblea Departamental.</p>
              <p className="note">
                *El valor de las copias corresponde a un promedio de comportamiento del mercado y depende de la cantidad de hojas de la escritura, lo que está sujeto a la cantidad de linderos, anotaciones, aclaraciones, y demás observaciones y parágrafos incluidos en la venta.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='container  mb-5 pb-5 pt-2 mt-5 '>
        <h2 className='text-center'>PROYECTOS QUE <strong>TE PUEDEN INTERESAR</strong></h2>
        <div class="centered-line-plantilla-b mt-3 "></div>
        <CatalogoProductos showOnlyFour={true} />
      </div>

      {/* Modal de ampliación */}
      <Modal show={modalVisible} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Galería de Imágenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.isArray(dynamicData.images) && dynamicData.images.length > 0 ? (
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={null}
              indicators={false}
              prevIcon={<img src="/img/icons/frame27.svg" alt="Anterior" className="carousel-icon" loading="lazy" />}
              nextIcon={<img src="/img/icons/frame26.svg" alt="Siguiente" className="carousel-icon" loading="lazy" />}
            >
              {dynamicData.images.map((image, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${idx + 1}`}
                    style={{ border: "10px solid white" }}
                    loading="lazy"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p className="text-center">No hay imágenes disponibles</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Plantilla;
