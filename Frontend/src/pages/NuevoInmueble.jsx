import React, { useState } from "react";
import "../style/NuevoInmueble.css";
import flechaAbajo from "../assets/icons/flechaAbajo.svg";
import MultiSelectExample from "../components/modules/costumer/MultiSekectExample";
import fondoAddFoto from '/img/icons/fondo-add-foto.svg';
import AgregarOtroTipoInmueble from "../components/modules/costumer/AgregarOtroTipoInmueble";
import InmuebleServices from "../services/inmuebles/InmuebleService";

const NuevoInmueble = () => {
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedCiudad, setSelectedCiudad] = useState("");
  const [zonasComunes, setZonasComunes] = useState([]);
  const [zonasInteres, setZonasInteres] = useState([]);
  const [isGeneralInfoOpen, setIsGeneralInfoOpen] = useState(true);
  const [isAudiovisualesOpen, setIsAudiovisualesOpen] = useState(false);
  const [isOtrosDatosOpen, setIsOtrosDatosOpen] = useState(false);

  const opcionesEstado = ["Nuevo", "Usado"];
  const opcionesTipo = ["Apartamento", "Apartaestudio","Oficina / Local", "Proyecto","Casa"];
  const ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  const dataZonasCercanas = ["Parque", "Piscina", "Gimnasio", "Zona BBQ", "Universidad"];
  const dataZonasComunes = ["Parque", "Piscina", "Gimnasio", "Zona BBQ", "Salón Social"];

  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const [isYears, setIsYears] = useState(true);

  const [codigoInmueble, setCodigoInmueble] = useState("");
  const [estadoInmueble, setEstadoInmueble] = useState("");
  const [modalidadInmueble, setModalidadInmueble] = useState("");
  const [tituloInmueble, setTituloInmueble] = useState("");
  const [ubicacionInmueble, setUbicacionInmueble] = useState("");
  const [estrato, setEstrato] = useState("");
  const [administracion, setAdministracion] = useState("");
  const [tipoVivienda, setTipoVivienda] = useState("No VIS"); 
  const [codigoCiudad, setCodigoCiudad] = useState("");
  const [idTipoInmueble, setIdTipoInmueble] = useState("");
  const [frameMaps, setFrameMaps] = useState("");
  const [descripcionInmueble, setDescripcionInmueble] = useState("");
  const [fechaEntregaProyecto, setFechaEntregaProyecto] = useState("");
  const [zonas, setZonas] = useState([]);
  const [detalles, setDetalles] = useState([
    {
      valorInmueble: "",
      area: "",
      frameRecorrido: "",
      cantidadHabitaciones: "",
      cantidadBaños: "",
      parqueadero: "",
      amoblado: ""
    }
  ]);

  const toggleSwitch = () => {
    setTipoVivienda((prevTipoVivienda) => (prevTipoVivienda === "No VIS" ? "VIS" : "No VIS"));
  };

  const handleAddPhoto = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setPhotos([...photos, file]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleAddVideo = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setVideos([...videos, file]);
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleAddZonaComun = (zona) => {
    if (!zonasComunes.includes(zona)) {
      setZonasComunes([...zonasComunes, zona]);
    }
  };

  const handleRemoveZonaComun = (zona) => {
    setZonasComunes(zonasComunes.filter((z) => z !== zona));
  };

  const handleAddZonaInteres = (zona) => {
    if (!zonasInteres.includes(zona)) {
      setZonasInteres([...zonasInteres, zona]);
    }
  };

  const handleRemoveZonaInteres = (zona) => {
    setZonasInteres(zonasInteres.filter((z) => z !== zona));
  };

  const handleZonasComunesChange = (selectedOptions) => {
    setZonasComunes(selectedOptions);
  };
  
  const handleZonasInteresChange = (selectedOptions) => {
    setZonasInteres(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      estado: selectedEstado,
      tipo: selectedTipo,
      ciudad: selectedCiudad,
      zonasComunes,
      zonasInteres,
      photos,
      videos,
      isYears,
      codigoInmueble,
      estadoInmueble,
      modalidadInmueble,
      tituloInmueble,
      ubicacionInmueble,
      estrato,
      administracion,
      tipoVivienda,
      codigoCiudad,
      idTipoInmueble,
      frameMaps,
      descripcionInmueble,
      fechaEntregaProyecto,
      zonas,
      detalles
    };
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="nuevo-inmueble">
      <h1>PUBLICAR NUEVO INMUEBLE</h1>
      <div className="main-container">
        <div className="inner-container">
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="field-group">
                <div className="header" onClick={() => setIsGeneralInfoOpen(!isGeneralInfoOpen)}>
                  <h3>INFORMACIÓN GENERAL</h3>
                  <span className="toggle-icon">{isGeneralInfoOpen ? <img src={flechaAbajo} alt="flecha-abajo" loading="lazy" /> : <img src={flechaAbajo} alt="flecha-abajo" loading="lazy" />}</span>
                </div>
                {isGeneralInfoOpen && (
                  <>
                    <label className="sub-label">Estado del inmueble</label>
                    <div className="estado-radio-group">
                      {opcionesEstado.map((estado) => (
                        <div key={estado} className="custom-radio">
                          <input
                            type="radio"
                            id={`estado-${estado}`}
                            name="estadoInmueble"
                            value={estado.toLowerCase()}
                            checked={selectedEstado === estado}
                            onChange={() => setSelectedEstado(estado)}
                            required
                          />
                          <label htmlFor={`estado-${estado}`}>
                            <div className="circle-nuevo-inmueble"></div>
                            <span>{estado}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {isGeneralInfoOpen && (
                <>
                  <div className="field-group">
                    <label className="sub-label">Tipo de inmueble</label>
                    <div className="tipo-radio-group">
                      {opcionesTipo.map((tipo) => (
                        <div key={tipo} className="custom-radio">
                          <input
                            type="radio"
                            id={`tipo-${tipo}`}
                            name="tipoInmueble"
                            value={tipo.toLowerCase()}
                            checked={selectedTipo === tipo}
                            onChange={() => setSelectedTipo(tipo)}
                            required
                          />
                          <label htmlFor={`tipo-${tipo}`}>
                            <div className="circle-nuevo-inmueble"></div>
                            <span>{tipo}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="medio-inpus">
                    <div className="field-group">
                      <label>Ciudad</label>
                      <select 
                        value={selectedCiudad} 
                        onChange={(e) => setSelectedCiudad(e.target.value)} 
                        name="ubicacionInmueble"
                        required>
                        <option value="">Selecciona...</option>
                        {ciudades.map((ciudad) => (
                          <option key={ciudad} value={ciudad}>
                            {ciudad}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label>Código del inmueble</label>
                      <input 
                        type="text" 
                        placeholder="..." 
                        value={codigoInmueble} 
                        name="codigoInmueble"
                        onChange={(e) => setCodigoInmueble(e.target.value)} 
                        required />
                    </div>

                    <div className="field-group">
                      <label>Título del Inmueble</label>
                      <input 
                        type="text" 
                        placeholder="..." 
                        value={tituloInmueble} 
                        name="tituloInmueble"
                        onChange={(e) => setTituloInmueble(e.target.value)} 
                        required />
                    </div>

                    <div className="field-group">
                      <label>Tipo de vivienda</label>
                      <div className="unique-toggle-switch-container-nuevo-inmueble">
                        <span className={tipoVivienda === "No VIS" ? "unique-active" : ""}>No VIS</span>
                        <div className="unique-toggle-switch" onClick={toggleSwitch}>
                          <div className={`unique-toggle-knob ${tipoVivienda === "No VIS" ? "unique-left" : "unique-right"}`}></div>
                        </div>
                        <span className={tipoVivienda === "VIS" ? "unique-active" : ""}>VIS</span>
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Descripción del Inmueble</label>
                    <textarea 
                      placeholder="..." 
                      required
                      value={descripcionInmueble} 
                      name="descripcionInmueble"
                      onChange={(e) => setDescripcionInmueble(e.target.value)} 
                    />
                  </div>

                  <div className="field-group">
                    <label className="sub-label">Selecciona zonas comunes (Para proyectos y zonas residenciales)</label>
                  </div>
                  <MultiSelectExample 
                      data={dataZonasComunes} 
                      onSelectionChange={handleZonasComunesChange} 
                    />

                  <div className="field-group">
                    <label className="sub-label">Selecciona zonas de interés cercanas</label>
                        </div>
                        <MultiSelectExample 
                        data={dataZonasCercanas} 
                        onSelectionChange={handleZonasInteresChange} 
                      />
                  <p className="mt-3"></p>

                  <div className="field-group">
                    <div className="field-group">
                      <label>Valor del Inmueble</label>
                      <input 
                        type="text" 
                        placeholder="..." 
                        required />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="form-content">
              <div className="field-group">
                <div className="header" onClick={() => setIsAudiovisualesOpen(!isAudiovisualesOpen)}>
                  <h3>AUDIOVISUALES E INTERACTIVOS</h3>
                  <span className="toggle-icon">{isAudiovisualesOpen ? <img src={flechaAbajo} alt="flecha-abajo" loading="lazy" /> : <img src={flechaAbajo} alt="flecha-abajo" loading="lazy" />}</span>
                </div>
                {isAudiovisualesOpen && (
                  <>
                    <div className="media-group">
                      <label className="sub-label">Adjuntar fotografías (máximo 20)</label>
                      <div className="photo-container">
                        {photos.map((photo, index) => (
                          <div key={index} className="photo">
                            <img src={photo} alt={`Fotografía ${index + 1}`} />
                            <button className="remove-btn" onClick={() => removePhoto(index)}></button>
                          </div>
                        ))}
                        {photos.length < 20 && (
                          <div className="add-photo" style={{ backgroundImage: `url(${fondoAddFoto})` }}>
                            <label className="upload-label">
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleAddPhoto} 
                                hidden 
                                required />
                              <span>+</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="media-group">
                      <label className="sub-label">Adjuntar Videos (máximo 3)</label>
                      <div className="video-container">
                        {videos.map((video, index) => (
                          <div key={index} className="video">
                            <video src={video} controls />
                            <button className="remove-btn" onClick={() => removeVideo(index)}></button>
                          </div>
                        ))}
                        {videos.length < 3 && (
                          <div className="add-video">
                            <label className="upload-label">
                              <input 
                                type="file" 
                                accept="video/*" 
                                onChange={handleAddVideo} 
                                required />
                              <span>+</span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="input-media-group-video-foto">
                      <div className="field-group-media">
                        <label style={{ display: "flex", alignItems: "center" }}>
                          Iframe ubicación Google Maps <span className="info-icon" style={{ marginLeft: "5px" }}>i</span>
                        </label>
                        <input type="text" placeholder="..." style={{ width: "100%" }} required />
                      </div>
                      <div className="field-group-media">
                        <label style={{ display: "flex", alignItems: "center" }}>
                          Iframe recorrido 3D <span className="info-icon" style={{ marginLeft: "5px" }}>i</span>
                        </label>
                        <input type="text" placeholder="..." style={{ width: "100%" }} required />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="form-content">
              <div className="field-group">
                <div className="header" onClick={() => setIsOtrosDatosOpen(!isOtrosDatosOpen)}>
                  <h3>OTROS DATOS</h3>
                  <span className="toggle-icon">{isOtrosDatosOpen ? <img src={flechaAbajo} alt="flecha-abajo" loading="lazy" /> : <img src={flechaAbajo} alt="flecha-abajo" loading="lazy" />}</span>
                </div>
                {isOtrosDatosOpen && (
                  <div className="otros-datos-container">
                    <div className="field-row">
                      <div className="field">
                        <label>Cantidad habitaciones</label>
                        <select 
                          style={{ width: "100%", boxShadow: "none" }} 
                          required>
                          <option value="">Selecciona...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Cantidad baños</label>
                        <select style={{ width: "100%", boxShadow: "none" }} required>
                          <option value="">Selecciona...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Parqueadero</label>
                        <select style={{ width: "100%", boxShadow: "none" }} required>
                          <option value="">Selecciona...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label>Área en metros cuadrados</label>
                        <input type="text" placeholder="..." style={{ width: "100%", boxShadow: "none" }} required />
                      </div>
                      <div className="field">
                        <label>Estrato</label>
                        <input type="text" placeholder="..." style={{ width: "100%", boxShadow: "none" }} required />
                      </div>
                      <div className="field">
                        <label>Fecha de entrega</label>
                        <select style={{ width: "100%", boxShadow: "none" }} required>
                          <option value="">Selecciona...</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="nuevo-inmueble-button-group">
              <button className="nuevo-inmueble-btn nuevo-inmueble-preview" type="button">Vista previa</button>
              <button className="nuevo-inmueble-btn nuevo-inmueble-draft" type="button">Guardar Borrador</button>
              <button className="nuevo-inmueble-btn nuevo-inmueble-publish" type="submit">Publicar</button>
            </div>
          </form>

          <div className="span-eliminar-inmueble">
            <span>Eliminar Este inmueble</span>
          </div>
        </div>
      </div>

      <AgregarOtroTipoInmueble />
    </div>
  );
};

export default NuevoInmueble;