import React, { useState } from "react";
import "../style/App3.css";
import ImagenPrincipalBlog from "../assets/img/img-principal-blog.png";
import { Container, Row, Col } from "react-bootstrap";
import FlechaIzquierda from '../assets/icons/flecha-post-izquierda.svg';
import FlechaDerecha from '../assets/icons/flecha-post-derecha.svg';

const Post = () => {

  return (
    <div className="post-container">
      <div className="post-titulo"></div>
      
        <Container className="nota-diseno">
              <Row className="align-items-center">
                {/* Fecha */}
                <Col xs="auto" className="fecha">
                  <div className="fecha-cuadro">
                    <span className="dia">01</span>
                    <span className="mes">Sep.</span>
                  </div>
                </Col>

                {/* Texto */}
                <Col>
                  <p className="texto-nota">
                    <strong>LOREM IPSUM ES SIMPLEMENTE EL TEXTO DE RELLENO DE
                    LAS IMPRENTAS</strong>
                  </p>
                </Col>
              </Row>
            </Container>
      

        <div className="blog-content container">
          <div className="blog-header ">
            <img
              src={ImagenPrincipalBlog}
              alt="Imagen principal Blog"
              className="banner-image-blog"
              loading="lazy"
            />
          </div>
        </div>

        <div className="container-post-text">
          <div className="post-text">
              <h3 className="mb-4"><b>"Hay muchas variaciones de los pasajes de Lorem disponibles,pero la mayoria sufrio alteraciones en alguna manera"</b></h3>
              <p>Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raíces en una pieza clásica de la literatura del Latín, que data del año 45 antes de Cristo, haciendo que este adquiera más de 2000 años de antigüedad. <a href="#" style={{color:"red"}}>Richard McClintock</a>, un profesor de Latín de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "De Finibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicerón, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera línea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una línea en la sección 1.10.32.</p>


              <p>El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.</p>

              <h3 className="mt-5 mb-4"><b>¿Por que lo usamos?</b></h3>
              <p>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el <a href="#" style={{color:"red"}}>Lorem Ipsum </a> como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p>


              <div className="contenedor-btn-post">
                <button className="btn btn-dark btn-post">Call to action</button>
              </div>


              <Container className="notas-component">
                <Row className="align-items-center">
                  <Col xs={6} className="text-left nota-anterior">
                    <span className="arrow"><img src={FlechaIzquierda} alt="Flecha Izquierda" className="arrow" />
                    </span>
                    <div>
                      <span className="label text-dark">Nota Ant.</span><br></br>
                      <p className="nota-texto"><strong>Lorem Ipsum es simplemente el texto</strong></p>
                    </div>
                  </Col>
                  <Col xs={6} className="text-right nota-siguiente">
                    <div style={{ textAlign: "right" }}>
                      <span className="label text-dark">Nota Sig.</span><br />
                      <p className="nota-texto"><strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</strong></p>
                    </div>
                    <span className="arrow">
                      <img src={FlechaDerecha} alt="Flecha Derecha" className="arrow" />
                    </span>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
      </div>
  );
};

export default Post;
