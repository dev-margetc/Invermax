
import React from 'react';
import Banner from '../components/Banner'; 
import CarouselDestacados from '../components/CarouselDestacados'; 
import CarouselAltaDemanda from '../components/CarouselAltaDemanda'; 
import Footer from '../components/Footer'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (formData) => {
    // Navega a la página de Filter y pasa los datos del formulario
    navigate('/filter', { state: { formData } });
  };

  return (
    <div>
      <Banner onSearch={handleSearch} />
      <section className='fondo-p'>
        <CarouselDestacados />
        <CarouselAltaDemanda />
      </section>
      {/* Resto del contenido de la página */}
      {/* Sección de Aliados */}
      <section className='allies-section-1'></section>

      {/* Sección de Aliados */}
      <section className="allies-section">
    <h1 className='text-center mb-4 raya'><strong>NUESTROS ALIADOS</strong></h1>
    <div class="centered-line"></div>
    <div id="aliadosCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="d-flex justify-content-center gap-5">
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-1.svg" className="allies-logo" alt="Aliado 1" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-2.svg" className="allies-logo" alt="Aliado 2" loading="lazy" />
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-3.svg" className="allies-logo" alt="Aliado 3" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-4.svg" className="allies-logo" alt="Aliado 4" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-5.svg" className="allies-logo" alt="Aliado 5" loading="lazy"/>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="d-flex justify-content-center gap-5">
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-1.svg" className="allies-logo" alt="Aliado 6" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-2.svg" className="allies-logo" alt="Aliado 7" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-3.svg" className="allies-logo" alt="Aliado 8" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-4.svg" className="allies-logo" alt="Aliado 9" loading="lazy"/>
                    </div>
                    <div className="allies-card">
                        <img src="img/Blog/logo-a-5.svg" className="allies-logo" alt="Aliado 10" loading="lazy" />
                    </div>
                </div>
            </div>
            {/* Agrega más .carousel-item según el número de grupos de logotipos que quieras mostrar */}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#aliadosCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#aliadosCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
        </button>
    </div>
</section>
      {/* Sección de Blog */}
      {/* Sección de Blog */}
      <section className="container my-5">
        <h1 className="text-center mb-4 raya"><strong>BLOG</strong></h1>
        <div class="centered-line"></div>
        <div className="row row-blog">
          {/* Tarjeta de Blog 1 */}
          <div className="col-md-6 mb-4">
            <div className="blog-card">
              <div className="date-badge">01 <br /> Sep.</div>
              <img src="/img/img-blog-2.jpg" alt="Imagen del Blog 1" loading="lazy" />
              <div className="p-4">
                <h5 className="fw-bold">Lorem Ipsum es simplemente el texto</h5>
                <p className="text-muted">Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño...</p>
                <a href="#" className="text-danger fw-bold">Leer más</a>
              </div>
            </div>
          </div>
          
          {/* Tarjeta de Blog 2 */}
          <div className="col-md-6 mb-4">
            <div className="blog-card">
              <div className="date-badge">01 <br /> Sep.</div>
              <img src="/img/img-blog-1.jpg" alt="Imagen del Blog 2" loading="lazy"/>
              <div className="p-4">
                <h5 className="fw-bold">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos</h5>
                <p className="text-muted">Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño...</p>
                <a href="#" className="text-danger fw-bold">Leer más</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botón de Ver Más Entradas */}
        <div className="text-center">
          <a href="#" className="btn-more">Ver más entradas</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
