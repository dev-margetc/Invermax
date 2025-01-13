import React, { useEffect, useState } from 'react';
import configuracionesService from '../services/configuraciones/ConfiguracionesService';

const Footer = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const fetchInfoInvermax = async () => {
      try { 
        const data = await configuracionesService.getInfoInvermax();
        setInfo(data || {});
      } catch (error) {
        console.error("Error al cargar los inmuebles:", error);
      }
    };
    fetchInfoInvermax();
  }, []);
  return (
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section logo-section">
          <img src="img/logo-footer.png" alt="Logo" className="footer-logo" loading="lazy" />
          <p>Hogares felices, propiedades rentables</p>
        </div>

        <div class="footer-section">
          <h5>Legales</h5>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política tratamiento de datos</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5>Otros trámites</h5>
          <ul>
            <li><a href="#">Copias de certificados</a></li>
            <li><a href="#">Promesas de compraventa</a></li>
            <li><a href="#">Estudio de títulos</a></li>
            <li><a href="#">Elaboración de poderes</a></li>
          </ul>
        </div>

        <div class="footer-section">
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

      <div class="footer-social">
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
          <a href="#"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>

      <div className="footer-bottom" style={{ textAlign: 'center' }}>
        <p>&copy; Invermax 2024</p>
      </div>

    </footer>

  );
};

export default Footer;
