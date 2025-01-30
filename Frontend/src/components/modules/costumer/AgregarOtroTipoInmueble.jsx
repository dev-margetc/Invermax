import React from 'react';
import '../../../style/NuevoInmueble.css';

const AgregarOtroTipoInmueble = () => {
    return (
        <div className="main-container" style={{padding: "20px",marginTop: "20px"}}>
              <div class="nuevo-inmueble-plan-container">
                <button class="nuevo-inmueble-btn-agregar">Agregar otro tipo de inmueble</button>
                <div class="nuevo-inmueble-alert-container">
                  <div class="nuevo-inmueble-alert-icon"><img src="/img/icons/alertaRedonda.svg" alt="alerta redonda" srcset="" loading="lazy" /></div>
                  <p class="nuevo-inmueble-alert-text">
                    Si quieres publicar más inmuebles debes actualizar tu plan; ve a la pestaña de
                    <a href="#" class="nuevo-inmueble-alert-link">"Mi plan"</a> y accede a un nuevo plan para seguir publicando inmuebles.
                  </p>
                </div>
              </div>
        </div>
    );
};

export default AgregarOtroTipoInmueble;