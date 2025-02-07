import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../style/style-costumer/EditarInformacion.css';

const EditarInformacion = () => {
  const [informacion, setInformacion] = useState({
    informacion_json: '',
    contactInfo: {
      telefono: '',
      email: '',
      direccion: '',
      movil: ''
    },
    socialInfo: {
      url_facebook: '',
      url_twitter: '',
      url_instagram: '',
      url_youtube: '',
      url_linkedin: '',
      url_tiktok: ''
    },
    legalInfo: {
      terminos: '',
      tratamiento_datos: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInformacion({
      ...informacion,
      [name]: value
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setInformacion({
      ...informacion,
      contactInfo: {
        ...informacion.contactInfo,
        [name]: value
      }
    });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setInformacion({
      ...informacion,
      socialInfo: {
        ...informacion.socialInfo,
        [name]: value
      }
    });
  };

  const handleLegalChange = (e) => {
    const { name, value } = e.target;
    setInformacion({
      ...informacion,
      legalInfo: {
        ...informacion.legalInfo,
        [name]: value
      }
    });
  };

  const handleSave = () => {
    console.log('Información guardada:', informacion);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">EDITAR INFORMACIÓN</h2>
      <Form>
        {/* Información general */}
        <Form.Group controlId="informacion_json">
          <Form.Label>Información JSON</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="informacion_json"
            value={informacion.informacion_json}
            onChange={handleInputChange}
            placeholder="Información a mostrar en el frontend no relacionada a la lógica de la aplicación"
          />
        </Form.Group>

        {/* Información de contacto */}
        <Form.Group controlId="contactInfo.telefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="telefono"
            value={informacion.contactInfo.telefono}
            onChange={handleContactChange}
            placeholder="Teléfono"
          />
        </Form.Group>
        <Form.Group controlId="contactInfo.email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={informacion.contactInfo.email}
            onChange={handleContactChange}
            placeholder="Correo electrónico"
          />
        </Form.Group>
        <Form.Group controlId="contactInfo.direccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={informacion.contactInfo.direccion}
            onChange={handleContactChange}
            placeholder="Dirección"
          />
        </Form.Group>
        <Form.Group controlId="contactInfo.movil">
          <Form.Label>Móvil</Form.Label>
          <Form.Control
            type="text"
            name="movil"
            value={informacion.contactInfo.movil}
            onChange={handleContactChange}
            placeholder="Móvil"
          />
        </Form.Group>

        {/* Información social */}
        <Form.Group controlId="socialInfo.url_facebook">
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            type="url"
            name="url_facebook"
            value={informacion.socialInfo.url_facebook}
            onChange={handleSocialChange}
            placeholder="URL de Facebook"
          />
        </Form.Group>
        <Form.Group controlId="socialInfo.url_twitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            type="url"
            name="url_twitter"
            value={informacion.socialInfo.url_twitter}
            onChange={handleSocialChange}
            placeholder="URL de Twitter"
          />
        </Form.Group>
        <Form.Group controlId="socialInfo.url_instagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            type="url"
            name="url_instagram"
            value={informacion.socialInfo.url_instagram}
            onChange={handleSocialChange}
            placeholder="URL de Instagram"
          />
        </Form.Group>
        <Form.Group controlId="socialInfo.url_youtube">
          <Form.Label>Youtube</Form.Label>
          <Form.Control
            type="url"
            name="url_youtube"
            value={informacion.socialInfo.url_youtube}
            onChange={handleSocialChange}
            placeholder="URL de Youtube"
          />
        </Form.Group>
        <Form.Group controlId="socialInfo.url_linkedin">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control
            type="url"
            name="url_linkedin"
            value={informacion.socialInfo.url_linkedin}
            onChange={handleSocialChange}
            placeholder="URL de LinkedIn"
          />
        </Form.Group>
        <Form.Group controlId="socialInfo.url_tiktok">
          <Form.Label>TikTok</Form.Label>
          <Form.Control
            type="url"
            name="url_tiktok"
            value={informacion.socialInfo.url_tiktok}
            onChange={handleSocialChange}
            placeholder="URL de TikTok"
          />
        </Form.Group>

        {/* Información legal */}
        <Form.Group controlId="legalInfo.terminos">
          <Form.Label>Términos</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="terminos"
            value={informacion.legalInfo.terminos}
            onChange={handleLegalChange}
            placeholder="Términos y condiciones"
          />
        </Form.Group>
        <Form.Group controlId="legalInfo.tratamiento_datos">
          <Form.Label>Tratamiento de datos</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="tratamiento_datos"
            value={informacion.legalInfo.tratamiento_datos}
            onChange={handleLegalChange}
            placeholder="Política de tratamiento de datos"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default EditarInformacion;
