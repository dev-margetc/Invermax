import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Usa Link para manejar las rutas
import configuracionesService from '../services/configuraciones/ConfiguracionesService';
import servicioService from "../services/servicios/ServicioService";

const Footer = () => {
  const [info, setInfo] = useState({});
  const [servicios, setServicios] = useState([]);
  // Componente de navegacion
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfoInvermax = async () => {
      try {
        const data = await configuracionesService.getInfoInvermax();
        setInfo(data || {});
      } catch (error) {
        console.error("Error al cargar los inmuebles:", error);
      }
    };
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
    fetchInfoInvermax();
  }, []);

  // Manejar redireccion a servicios. Toma la posicion de la lista
  const handleServiceClick = (posicion) => (e) => {
    e.preventDefault();// Evitar el comportamiento por defecto del enlace
    navigate('/otrosServicios', { state: { posicionServicio: posicion } }); // Redirigir y pasar la posicion del servicio
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src="img/logo-footer.png" alt="Logo" className="footer-logo" loading="lazy" />
          <p>Hogares felices, propiedades rentables</p>
        </div>

        <div className="footer-section">
          <h5>Legales</h5>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política tratamiento de datos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Otros trámites</h5>
          <ul>
            {servicios && servicios.map((servicio, index) => (
              <li key={index}><a href="#" onClick={handleServiceClick(index)}>{servicio.titulo}</a></li>
            ))}

          </ul>
        </div>

        <div className="footer-section">
          <h5>Contacto</h5>
          <p>{info.contactInfo?.direccion || "Dirección no disponible"}</p>
          <p>Móvil <strong>{info.contactInfo?.movil || "Movil no disponible"}</strong></p>
          <p>Teléfono <strong>{info.contactInfo?.telefono || "Telefono no disponible"}</strong></p>
          <p>
            Email{" "}
            <a href={`mailto:${info.contactInfo?.email || ""}`}>
              {info.contactInfo?.email || "dirección no disponible"}
            </a>
          </p>
        </div>
      </div>

      <div className="footer-social">
        <div className="social-icons">
          {info.socialInfo?.url_facebook && info.socialInfo?.url_facebook != "" && (
            <a href={info.socialInfo.url_facebook}><i className="fab fa-facebook-f"></i></a>
          )}
          {info.socialInfo?.url_twitter && info.socialInfo?.url_twitter != "" && (
            <a href={info.socialInfo?.url_twitter}><i className="fab fa-twitter"></i></a>
          )}

          {info.socialInfo?.url_instagram && info.socialInfo?.url_instagram != "" && (
            <a href={info.socialInfo?.url_instagram}><i className="fab fa-instagram"></i></a>
          )}
          {info.socialInfo?.url_youtube && info.socialInfo?.url_youtube != "" && (

            <a href={info.socialInfo?.url_youtube}><i className="fab fa-youtube"></i></a>
          )}

          {info.socialInfo?.url_linkedin && info.socialInfo?.url_linkedin != "" && (
            <a href={info.socialInfo?.url_linkedin}><i className="fab fa-linkedin-in"></i></a>
          )}
          {info.socialInfo?.url_tiktok && info.socialInfo?.url_tiktok != "" && (
            <a href={info.socialInfo.url_tiktok}><i className="fab fa-tiktok"></i></a>
          )}

        </div>
      </div>

      <div className="footer-bottom" style={{ textAlign: 'center' }}>
        <p>&copy; Invermax 2024</p>
      </div>

    </footer>

  );
};

export default Footer;
