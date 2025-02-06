import React, { useState } from 'react';
import "../style/style-costumer/EditarInmueble.css";
import INF from "../assets/icons/inf.svg";

const EditarPerfil = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [numeroComercial, setNumeroComercial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefonoFijo, setTelefonoFijo] = useState('');
  const [nitCedula, setNitCedula] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState(null);

  const handleImagenChange = (event) => {
    setImagenPerfil(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu backend o realizar alguna otra acción
    console.log('Datos del formulario:', {
      nombreUsuario,
      correo,
      numeroComercial,
      direccion,
      telefonoFijo,
      nitCedula,
      imagenPerfil,
    });
  };

  return (
    <>
    <div className='editar-perfil-container-principal'>
    <h1>EDITAR PERFIL</h1>
    <div className="editar-perfil-container">
      <form onSubmit={handleSubmit}>
      <h3>Datos usuarios</h3>
        <div className="datos-usuarios">
       
          <div className="nombre-usuario">
         
          <label htmlFor="nombreUsuario">Nombre usuario<span class="asterisco">*</span></label>

            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder='...'
              required
            />
            <div className='info-12'>
            <img src={INF} alt="!" />
            <p>Este nombre será visible para los usuarios que visiten la página.</p>
            </div>
            
          </div>
          <div className="imagen-perfil">

            <div className="imagen-actual">
            <label htmlFor="imagenPerfil">Logo/imagen de perfil</label>
            <div className="imagen-perfil-container">
            <div>
               
               {imagenPerfil ? (
                 <img src={URL.createObjectURL(imagenPerfil)} alt="Imagen de perfil" />
               ) : (
                 <div className="placeholder"></div>
               )}
                 </div>
 
                 <div>
                 <button type="button" className='btn-cambiar-img' onClick={() => document.getElementById('imagenPerfil').click()}>
                 Cambiar imagen
               </button>
               <input type="file"  id="imagenPerfil" style={{ display: 'none' }} onChange={handleImagenChange} />
               <button type="button" className='btn-eliminar-img' onClick={() => setImagenPerfil(null)}>
                 Eliminar
               </button>
                 </div>
            </div>

            

            </div>
          </div>
        </div>

        <div className="informacion-adicional">
          <h3>Información adicional</h3>

          <div className="informacion-adicional-p">
          <div className="correo">
            <label htmlFor="correo">Correo notificaciones</label>
            <input type="email" id="correo" placeholder='...' value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="numero-comercial">
            <label htmlFor="numeroComercial">Numero comercial</label>
            <input type="text" id="numeroComercial" placeholder='...' value={numeroComercial} onChange={(e) => setNumeroComercial(e.target.value)} />
          </div>
          <div className="direccion">
            <label htmlFor="direccion">Dirección</label>
            <input type="text" id="direccion" placeholder='...' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="telefono-fijo">
            <label htmlFor="telefonoFijo">Teléfono fijo</label>
            <input type="text" id="telefonoFijo" placeholder='...' value={telefonoFijo} onChange={(e) => setTelefonoFijo(e.target.value)} />
          </div>
          <div className="nit-cedula">
            <label htmlFor="nitCedula" >NIT/Cédula</label>
            <input type="text" placeholder='...' id="nitCedula" value={nitCedula} onChange={(e) => setNitCedula(e.target.value)} />
          </div>
          </div>

        </div>

        <button type="submit" className="guardar-cambios">
          Guardar cambios
        </button>
      </form>
    </div>
    </div>
    </>
    
  );
};

export default EditarPerfil;