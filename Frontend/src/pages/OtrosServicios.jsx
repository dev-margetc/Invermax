import React, { useState, useEffect } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import servicioService from "../services/servicios/ServicioService"
import "../style/App3.css";
import Ima1 from "../assets/img/servicios.png";
import Ima2 from "../assets/img/ima2.png";
import Ima3 from "../assets/img/ima3.png";
import Ima4 from "../assets/img/ima4.png";

const OtrosServicios = () => {

  const [servicios, setServicios] = useState([]);

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

  // Datos simulados del backend
  const serviciosData = [
    {
      id: 1,
      titulo: "Solicitar copias de escrituras",
      descripcion:
        "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
      precio: "$285.000",
      imagen: Ima1,
      boton: "Contactar a un asesor",
    },
    {
      id: 2,
      titulo: "Promesa de compraventa",
      descripcion:
        "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
      precio: "$285.000",
      imagen: Ima2,
      boton: "Contactar a un asesor",
    },
    {
      id: 3,
      titulo: "Estudio de títulos",
      descripcion:
        "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
      precio: "$285.000",
      imagen: Ima3,
      boton: "Contactar a un asesor",
    },
    {
      id: 4,
      titulo: "Elaboración de poderes",
      descripcion:
        "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
      precio: "$285.000",
      imagen: Ima4,
      boton: "Contactar a un asesor",
    },
  ];

  return (
    <div className="otros-servicios-section">
      {/* Banner Superior */}
      <div className="otros-servicios-banner">
        <div className="background-overlay"></div>
        <h1 className="titulo-principal">
          <strong>OTROS SERVICIOS</strong>
          <div className="centered-line-post mt-4 mb-4"></div>
        </h1>
      </div>

      {/* Contenido Inferior */}
      <Container className="otros-servicios-container">
        <div className="servicios-card">
          <div className="titulo-otros-ss">
            <h3 className="text-center">
              <strong>DESVARA TU TRÁMITE CON INVERMAX INMOBILIARIA S.A.S</strong>
            </h3>
          </div>
          <p className="text-center descripcion mb-5 text-dark">
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y
            archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
            de las industrias desde el año 1500, cuando un impresor desconocido
            usó una galería de textos y los mezcló de tal manera que logró hacer
            un libro de textos especimen.
          </p>

          <Accordion defaultActiveKey="0">
            {servicios.map((servicio, index) => (
              <Accordion.Item eventKey={index.toString()} key={servicio.id}>
                <Accordion.Header>{servicio.titulo}</Accordion.Header>
                <Accordion.Body>
                  {servicio.imagen && (
                    <Row>
                      <Col md={4}>
                        <img
                          src={servicio.imagen}
                          alt={servicio.titulo}
                          className="img-fluid"
                        />
                      </Col>
                      <Col md={8}>
                        <p className="descripcion-item">{servicio.descripcion}</p>
                        {servicio.precio && (
                          <p className="precio-item">
                            <strong>{servicio.precio}</strong>
                          </p>
                        )}
                        {servicio.boton && (
                          <button className="btn btn-dark btn-asesor">
                            {servicio.boton}
                          </button>
                        )}
                      </Col>
                    </Row>
                  )}
                  {!servicio.imagen && (
                    <p className="descripcion-item">{servicio.descripcion}</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default OtrosServicios;
