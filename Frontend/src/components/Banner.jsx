// src/components/Banner.js
import React, { useState } from 'react';
import CityInput from './modules/inmuebles/CityInput';
import TiposInmueblesSelect from './modules/inmuebles/TiposInmueblesSelect';

const Banner = ({ onSearch }) => {
  const [showCityInputs, setShowCityInputs] = useState(true);
  const [formData, setFormData] = useState({ category: '', purpose: '', city: '', code: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const colombianCities = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta",
    "Bucaramanga", "Soacha", "Ibagué", "Pereira", "Santa Marta",
    "Manizales", "Villavicencio", "Neiva", "Pasto", "Armenia", "Montería",
    "Popayán", "Sincelejo", "Valledupar", "Buenaventura", "Riohacha",
    "Tunja", "Florencia", "Quibdó", "Yopal", "Mocoa", "Leticia",
    "San Andrés", "Inírida", "Puerto Carreño", "Arauca"
    // Agrega más ciudades si es necesario
  ];

  const handleCityClick = () => {
    setShowCityInputs(true);
    setErrorMessage(''); // Limpiar mensaje de error al cambiar de tipo de búsqueda
  };

  const handleCodeClick = () => {
    setShowCityInputs(false);
    setErrorMessage(''); // Limpiar mensaje de error al cambiar de tipo de búsqueda
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(''); // Limpiar mensaje de error al cambiar el valor
  };

  const handleSubmit = () => {
    if (showCityInputs) {
      // Validar campos para búsqueda por ciudad
      if (!formData.category || !formData.purpose || !formData.city) {
        setErrorMessage('Por favor, complete todos los campos para buscar por ciudad.');
        return;
      }
    } else {
      // Validar campo para búsqueda por código
      if (!formData.code) {
        setErrorMessage('Por favor, ingrese un código para buscar.');
        return;
      }
    }

    // Si todos los campos están completos, realizar la búsqueda
    onSearch(formData);
  };

  return (
    <section className="banner">
      <div className="overlay"></div>
      <div className="banner-content container text-white">
        <h1 className="mb-4 text-dark titulo-p"><b>ENCUENTRA TU INMUEBLE</b></h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card pad-buscador fondo-buscador bg-opacity-75">
              <div className="row">
                <div className="col-md-12 mb-3 p-0 botones-principales">
                  <div className="button-container">
                    <button className={`city-btn ${showCityInputs ? 'btn-active-b' : 'btn-inactive-b'} text-white`} onClick={handleCityClick}>
                      Por ciudad
                    </button>
                    <button className={`code-btn ${!showCityInputs ? 'btn-active-b' : 'btn-inactive-b'}`} onClick={handleCodeClick}>
                      Por código
                    </button>
                  </div>
                </div>
              </div>

              {/* Mensaje de Error Mejorado */}
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              {/* Por Ciudad Inputs */}
              {showCityInputs && (
                <div id="cityInputs" className="row mt-4">
                  <TiposInmueblesSelect onTipoSelect={handleChange}
                    labelClass={"form-label text-white-custom"}
                    selectClass={"custom-select-bp"}
                    value={formData.category}
                  ></TiposInmueblesSelect>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="purpose" className="form-label text-white-custom">¿Qué quieres hacer?</label>
                    <select className="custom-select-bp" name="purpose" value={formData.purpose} onChange={handleChange} required>
                      <option value="">Selecciona...</option>
                      <option value="Comprar">Comprar</option>
                      <option value="Rentar">Rentar</option>
                    </select>
                  </div>
                  <CityInput onCitySelect={handleChange}
                    inputClass={"custom-select-bp"}
                    selectClass={"custom-select-bp"}
                    labelClass={"form-label text-white-custom"}
                    valorFiltro={formData.city}
                  ></CityInput>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-dark w-100" onClick={handleSubmit}>
                      <img src="/img/icons/lupa.svg" alt="lupa" width="16" className="me-2" loading="lazy" /> Buscar
                    </button>
                  </div>
                </div>
              )}

              {/* Por Código Inputs */}
              {!showCityInputs && (
                <div id="codeInputs" className="row mt-4 center">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="code" className="form-label text-white-custom">Código</label>
                    <input type="text" className="input-c" id="code" name="code" value={formData.code} onChange={handleChange} placeholder="..." required />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-dark w-100" onClick={handleSubmit}>
                      <img src="/img/icons/lupa.svg" alt="lupa" width="16" className="me-2" loading="lazy" /> Buscar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
