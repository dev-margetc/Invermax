import React from 'react';

const Footer = () => {
  return (
    <footer class="footer">
  <div class="footer-content">
    <div class="footer-section logo-section">
    <img src="img/logo-footer.png" alt="Logo" className="footer-logo" loading="lazy"/>
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
      <p>Cl 2 # 45d - 30 La argentina</p>
      <p>Móvil <strong>+57 300 123 4567</strong></p>
      <p>Teléfono <strong>601 578 9544</strong></p>
      <p>Email <a href="mailto:info@invermax.com">info@invermax.com</a></p>
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
