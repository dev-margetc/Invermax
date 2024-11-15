import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';


import '../style/App2.css';

// Importa los íconos SVG
import CameraIcon from '../assets/icons/camera.svg';
import VideoIcon from '../assets/icons/video.svg';
import MapIcon from '../assets/icons/map.svg';
import VrIcon from '../assets/icons/vr.svg';
import ExpandIcon from '../assets/icons/expand.svg'; // Ícono de ampliar

import ParqueaderoIcon from '../assets/icons/Parqueadero.svg';
import RecepcionIcon from '../assets/icons/recepcion.svg';
import LavadoIcon from '../assets/icons/lavado.svg';
import GimnasioIcon from '../assets/icons/gimnasio.svg';
import SalonSocialIcon from '../assets/icons/salon_social.svg';
import ZonaNinosIcon from '../assets/icons/zona_ninos.svg';
import EspacioComunalIcon from '../assets/icons/espacio_comunal.svg';
import ElevadorIcon from '../assets/icons/elevador.svg';
import ZonasVerdesIcon from '../assets/icons/zonas_verdes.svg';
import VigilanciaIcon from '../assets/icons/vigilancia.svg';

import TransportePublicoIcon from '../assets/icons/transporte_publico.svg';
import GimnasiosIcon from '../assets/icons/gimnasios.svg';
import HospitalesIcon from '../assets/icons/hospitales.svg';
import CentrosComercialesIcon from '../assets/icons/centros_comerciales.svg';
import SupermercadosIcon from '../assets/icons/supermercados.svg';
import TiendasBarrioIcon from '../assets/icons/tiendas_barrio.svg';
import ParquesIcon from '../assets/icons/parques.svg';
import JardinesColegiosIcon from '../assets/icons/jardines_colegios.svg';



const Plantilla = () => {
  const [propertyData, setPropertyData] = useState(null);
  const [index, setIndex] = useState(0); // Estado para el índice del carrusel de imágenes
  const [videoIndex, setVideoIndex] = useState(0); // Estado para el índice del carrusel de videos
  const [modalVisible, setModalVisible] = useState(false);


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
  

  

  useEffect(() => {
    setTimeout(() => {
      const mockData = {
        title: "Titulo Proyecto/Inmueble",
        codigo: " 784-84947-54616",
        status: "Nuevo / En arriendo",
        tipo: "Compra",
        medidadTipo:[
          {tipoA:"94 m²"},
          {tipoB:"100 m²"},
          {tipoC:"115 m²"},
          {tipoD:"124 m²"},
        ],
        ubicacion: "Ubicacion del proyecto",
        estrato: "4",
        zonasComunes: [
          { name: "Parqueadero visitantes", icon: ParqueaderoIcon },
          { name: "Recepción", icon: RecepcionIcon },
          { name: "Zona de lavado", icon: LavadoIcon },
          { name: "Gimnasio", icon: GimnasioIcon },
          { name: "Salón social", icon: SalonSocialIcon },
          { name: "Zona niños", icon: ZonaNinosIcon },
          { name: "Espacio comunal", icon: EspacioComunalIcon },
          { name: "Elevadores: 2", icon: ElevadorIcon },
          { name: "Zonas verdes", icon: ZonasVerdesIcon },
          { name: "Vigilancia 24 horas", icon: VigilanciaIcon },
        ],
        cercaDe: [
          { name: "Transporte público", icon: TransportePublicoIcon },
          { name: "Gimnasios", icon: GimnasiosIcon },
          { name: "Hospitales", icon: HospitalesIcon },
          { name: "Centros comerciales", icon: CentrosComercialesIcon },
          { name: "Supermercados", icon: SupermercadosIcon },
          { name: "Tiendas de barrio", icon: TiendasBarrioIcon },
          { name: "Parques", icon: ParquesIcon },
          { name: "Jardines y colegios", icon: JardinesColegiosIcon },
        ],
        minPrice: "$80,000,000",
        maxPrice: "$80,000,000",
        fechaEntrega: "15 de Noviembre",

        logoImage: "./img/nombreInmobiliaria.png",
        nombreInmobiliaria: "nombre Inmobiliaria",
        images: [
          "./img/pruebaCarrusel.png",
          "./img/pruebaCarrusel.png",
          "./img/pruebaCarrusel.png"
        ],
        videos: [
          "https://www.w3schools.com/html/mov_bbb.mp4",
          "https://www.w3schools.com/html/movie.mp4"
        ],
        city: "Ciudad Ejemplo",
        area: "80",
        price: "$2,500,000",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit placeat ullam a eveniet enim laudantium at molestiae quas possimus minima tenetur, nam iure inventore facilis magnam ipsam ipsum similique beatae!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit placeat ullam a eveniet enim laudantium at molestiae quas possimus minima tenetur, nam iure inventore facilis magnam ipsam ipsum similique beatae!",
        amenities: ["Gimnasio", "Piscina", "Jardines", "Zona BBQ"],
        nearby: ["Supermercados", "Colegios", "Parques", "Hospitales"],
        notablePlaces: [
          { name: "Hospital General", distance: "500m" },
          { name: "Estación de Metro", distance: "200m" },
          { name: "Centro Comercial", distance: "1km" }
        ],
        costs: [
          { label: "Valor Venta", value: "$890,000" },
          { label: "Administración", value: "$200,000" },
          { label: "Impuesto Predial", value: "$50,000" }
        ]
      };

      setPropertyData(mockData);
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
          <div className='sub-1'>{propertyData.medidadTipo[0].tipoA}</div>
          <div className='sub-1'>{propertyData.medidadTipo[1].tipoB}</div>
          <div className='sub-1'>{propertyData.medidadTipo[2].tipoC}</div>
          <div className='sub-1'>{propertyData.medidadTipo[3].tipoD}</div>
        </div>

        {/* Sección 2 */}
        <div className='seccion-plantilla-2'>

          {/* Primera sub-sección de la sección 2 */}
          <div className='seccion-1-2'>
            <div className='sub-2-1-1'>
              <Tabs defaultActiveKey="fotos" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="fotos" title={<><img src={CameraIcon} alt="Fotos" style={{ width: 15}} /> Fotos</>}>
                  {/* Carrusel de imágenes */}
                  <div className="custom-carousel-container">
                    <Carousel
                      activeIndex={index}
                      onSelect={handleSelect}
                      controls={false}
                      indicators={false}
                      interval={null}
                    >
                      {propertyData.images.map((image, idx) => (
                        <Carousel.Item key={idx}>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`Slide ${idx + 1}`}
                            style={{ border: "10px solid white" }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <button className="carousel-button-plantilla right" onClick={() => handleSelect((index + 1) % propertyData.images.length)}>
                    <img src="/img/icons/frame26.svg" alt="" />
                    </button>

                    <button className="carousel-button-plantilla left" onClick={() => handleSelect(index === 0 ? propertyData.images.length - 1 : index - 1)}><img src="/img/icons/frame27.svg" alt="" /></button>

                    {/* Botón de ampliar */}
                    <button className="expand-button rightb " onClick={handleExpandImage}>
                      <img src={ExpandIcon} alt="Expandir" />
                    </button>

                  </div>
                </Tab>

                <Tab eventKey="videos" title={<><img src={VideoIcon} alt="Videos" style={{  width: 15 }} /> Videos</>}>
                  {/* Carrusel de videos */}
                  <div className="custom-carousel-container">
                    <Carousel
                      activeIndex={videoIndex}
                      onSelect={handleVideoSelect}
                      controls={false}
                      indicators={false}
                      interval={null}
                    >
                      {propertyData.videos.map((video, idx) => (
                        <Carousel.Item key={idx}>
                          <video
                            className="d-block w-100"
                            controls
                            src={video}
                            alt={`Video ${idx + 1}`}
                            style={{ border: "10px solid white" }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                    <button className="carousel-button-plantilla left" onClick={() => handleVideoSelect(videoIndex === 0 ? propertyData.videos.length - 1 : videoIndex - 1)}>
                    <img src="/img/icons/frame27.svg" alt="" />
                    </button>
                    <button className="carousel-button-plantilla right" onClick={() => handleVideoSelect((videoIndex + 1) % propertyData.videos.length)}>
                    <img src="/img/icons/frame26.svg" alt="" />
                    </button>
                  </div>
                </Tab>

                <Tab eventKey="mapa" title={<><img src={MapIcon} alt="Mapa" style={{  width: 15 }} /> Mapa</>}>
                  {/* Mapa */}
                  <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.617123821351!2d-74.08347018573502!3d4.                  711017443110186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.                  1!3m3!1m2!1s0x8e3f99a8d0166f6f%3A0x653f0b8a4cf5dd41!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1633354376462!5m2!1sen!2sus"
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
                  </div>
                </Tab>

                <Tab eventKey="recorrido" title={<><img src={VrIcon} alt="Recorrido 3D" style={{  width: 15 }} /> Recorrido 3D</>}>
                  {/* Aquí puedes agregar contenido para el recorrido 3D cuando lo decidas */}
                  <p>Contenido para Recorrido 3D</p>
                </Tab>
              </Tabs>
            </div>

            <div className='sub-2-1-2'>
     
              <div className='logo-nombreInmobilaria'>
                <img src={propertyData.logoImage} alt="logo" />
                <h4 className='pt-2'><b>{propertyData.nombreInmobiliaria}</b></h4>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid gray', margin: '10px 0' }} />

              <div className='span-div'>
              
                  <h6><b>{propertyData.tipo}</b></h6>
                  <span>Desde</span>
                  <h5 className='n'><b>{propertyData.minPrice}</b></h5>
                  <span>Hasta</span>
                  <h5 className='n'><b>{propertyData.maxPrice}</b></h5>
                  <span>Fecha proxima de entrega</span>
                  <h6><b>{propertyData.fechaEntrega}</b></h6>

                  <div className='desde-hasta-medidas'>
                    <div>
                      <h6><b>Desde:</b> {propertyData.medidadTipo[0].tipoA}</h6>
                    </div>
                    <div>
                      <h6><b>Hasta:</b> {propertyData.medidadTipo[3].tipoD}</h6>
                    </div>
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
            <p>{propertyData.description}</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat aspernatur non distinctio labore molestias. Rerum, assumenda id. Ad fugit deserunt debitis, eum voluptatibus quidem tempora nam possimus similique exercitationem illum?</p>
            <hr style={{ border: 'none', borderTop: '1px dotted #555555', margin: '10px 0' }} />

            <h2><b>Zonas Comunes</b></h2>
            <div className="centered-line-plantilla"></div>
            <div className="zonas-comunes-container">
              {propertyData.zonasComunes.map((zona, index) => (
                <div className="zona-comun" key={index}>
                  <img src={zona.icon} alt={zona.name} className="zona-icon" />
                  <span>{zona.name}</span>
                </div>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px dotted #555555', margin: '10px 0' }} />

            <h2><b>Cerca de</b></h2>
            <div class="centered-line-plantilla"></div>
              <div className="cerca-de-container">
                {propertyData.cercaDe.map((item, index) => (
                  <div className="cerca-item" key={index}>
                    <img src={item.icon} alt={item.name} className="zona-icon" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>

            <hr style={{ border: 'none', borderTop: '1px dotted #555555', margin: '10px 0' }} />

            <div className='btn-obtener-contacto-bajo'>
              <div></div>
                  <button className='btn btn-dark'>Obtener numero de contacto</button> 
              <div></div>
            </div>

          <div className='btn-calcular-credito text-center'>
                  <button className=''><b>Calcular credito <span><img src="/img/icons/Frame6.svg" alt="comprar" /></span></b></button> 
          </div>

          </div>

          


          {/* Tercera sub-sección de la sección 2 */}
          <div className='sub-2-3-1'>
            <div className='sub-sub-3-1'>
              <div><p>Gastos notariales</p></div>
              <div><p>Tabla de gastos</p></div>
            </div>
            <div className='sub-sub-3-2'>
              <p>Resto de abajo</p>
            </div>
          </div> 

        </div>
      </div>

    {/* Modal de ampliación */}
      <Modal show={modalVisible} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Galería de Imágenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false} prevIcon={<img src="/img/icons/frame27.svg" alt="Previous" className="carousel-icon" />} nextIcon={<img src="/img/icons/frame26.svg" alt="Next" className="carousel-icon" />}>
            {propertyData.images.map((image, idx) => (
              <Carousel.Item key={idx}>
                <img className="d-block w-100" src={image} alt={`Slide ${idx + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Plantilla;
