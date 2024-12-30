import React, { useState, useEffect } from 'react';
import Ejemplo from './extras/Ejemplo';
import ZonasCercanas from './extras/ZonasCercanas';
import CityInput from './modules/inmuebles/CityInput';
import ZonasComunesSelect from './modules/inmuebles/ZonasComunesSelect';
import ZonasInteresSelect from './modules/inmuebles/ZonasInteresSelect';
import TiposInmueblesSelect from './modules/inmuebles/TiposInmueblesSelect';

const BannerFilter = ({ initialData, onApplyFilters }) => {
  const [formData, setFormData] = useState({
    category: '',
    purpose: '',
    city: '',
    code: '',
    maxAmount: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    furnished: false,
    commonAreas: [],
    nearbyAreas: [],
    ...initialData,
  });

  const [showCityInputs, setShowCityInputs] = useState(!initialData?.code);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // Estado para "modo mobile"

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({ ...prevData, ...initialData }));
      applyFilters(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1099);
    };

    handleResize(); // Ejecuta la función al cargar la página para verificar el tamaño inicial
    window.addEventListener('resize', handleResize); // Escucha cambios de tamaño de la ventana

    return () => window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar el componente
  }, []);

  const handleCityClick = () => setShowCityInputs(true);
  const handleCodeClick = () => setShowCityInputs(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleSwitch = () => {
    setFormData((prevData) => ({
      ...prevData,
      furnished: !prevData.furnished,
    }));
  };

  const applyFilters = (data) => {
    const filters = [];
    if (data.maxAmount) filters.push({ label: `Max: `, value: `$${data.maxAmount}`, key: 'maxAmount' });
    if (data.bedrooms) filters.push({ label: `Habit: `, value: data.bedrooms, key: 'bedrooms' });
    if (data.bathrooms) filters.push({ label: `Baños: `, value: data.bathrooms, key: 'bathrooms' });
    if (data.parking) filters.push({ label: `Parqueadero: `, value: data.parking, key: 'parking' });

    if (data.furnished) {
      filters.push({ label: `Amoblado: `, value: "Sí", key: 'furnished' });
    }

    if (data.commonAreas && data.commonAreas.length > 0) {
      filters.push({ label: `Zonas comunes`, key: 'commonAreas' });
    }
    if (data.nearbyAreas && data.nearbyAreas.length > 0) {
      filters.push({ label: `Zonas cercanas`, key: 'nearbyAreas' });
    }

    setSelectedFilters(filters);
    setShowMoreFilters(false);

    if (onApplyFilters) {
      onApplyFilters(data); // Notificar filtros aplicados
    }
  };

  const handleApplyFilters = () => applyFilters(formData);

  const toggleMoreFilters = () => {
    setShowMoreFilters((prevShowMoreFilters) => !prevShowMoreFilters);
  };

  const handleClearFilters = () => {
    setFormData({
      ...formData,
      maxAmount: '',
      bedrooms: '',
      bathrooms: '',
      parking: '',
      furnished: false,
      commonAreas: [],
      nearbyAreas: [],
    });
    setSelectedFilters([]);
    setShowMoreFilters(false);
  };

  const removeFilter = (filterKey) => {
    setFormData((prevData) => ({ ...prevData, [filterKey]: '' }));
    setSelectedFilters((prevFilters) => prevFilters.filter((filter) => filter.key !== filterKey));
  };

  return (
    <section className={`banner-filter ${isMobile ? 'mobile' : ''}`}>
      <div className="ejemplo">
        <h1 className="mb-3 mt-2 text-dark"><b>ENCUENTRA TU INMUEBLE</b></h1>
      </div>

      <div className={`banner-filter-content text-white ${showMoreFilters ? 'expanded' : ''}`}>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="button-container">
              <button className={`city-btn ${showCityInputs ? 'btn-active' : 'btn-inactive'}`} onClick={handleCityClick}>
                Por ciudad
              </button>
              <button className={`code-btn ${!showCityInputs ? 'btn-active' : 'btn-inactive'}`} onClick={handleCodeClick}>
                Por código
              </button>
            </div>

            <div className="banner-filter-card">
              {error && <div className="error-message">{error}</div>}

              <div className="row">
                <div className="col-md-12 mb-3 p-0">
                  {showCityInputs ? (
                    <div className="row mt-4">
                      <TiposInmueblesSelect onTipoSelect={handleChange}
                        selectClass={"banner-filter-select"}
                        labelClass={"banner-filter-text-white"}
                        value={formData.category}
                      ></TiposInmueblesSelect>
                      <div className="col-md-3 mb-3 mb-md-0">
                        <label className="banner-filter-text-white">¿Qué quieres hacer?</label>
                        <select name="purpose" className="banner-filter-select" value={formData.purpose} onChange={handleChange}>
                          <option value="">Selecciona...</option>
                          <option value="Comprar">Comprar</option>
                          <option value="Rentar">Rentar</option>
                        </select>
                      </div>
                      <CityInput onCitySelect={handleChange}
                        inputClass={"banner-filter-input-text"}
                        selectClass={"banner-filter-select"}
                        labelClass={"banner-filter-text-white"}
                        valorFiltro={formData.city}></CityInput>
                      <div className="col-md-3 d-flex align-items-end">
                        <button type="button" className="btn btn-dark w-100" onClick={handleApplyFilters}>
                          <img src="/img/icons/lupa.svg" alt="lupa" width="16" className="me-2" loading="lazy" /> Buscar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="row mt-4 banner-filter-center">
                      <div className="col-md-3 mb-3 mb-md-0">
                        <label className="banner-filter-text-white">Código</label>
                        <input type="text" className="banner-filter-input-code" name="code" value={formData.code} onChange={handleChange} placeholder="Ingresa el código..." />
                      </div>
                      <div className="col-md-3 d-flex align-items-end">
                        <button type="button" className="btn btn-dark w-100" onClick={handleApplyFilters}>
                          <img src="/img/icons/lupa.svg" alt="lupa" width="16" className="me-2" loading="lazy" /> Buscar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedFilters.length > 0 && (
                <div className="selected-filters mt-3 text-center">
                  {selectedFilters.map((filter, index) => (
                    <div key={index} className="filter-tag bg-light text-dark d-inline-flex align-items-center p-1 m-1 rounded">
                      <span>{filter.label} {filter.value}</span>
                      <button className="btn-close ms-2" onClick={() => removeFilter(filter.key)}></button>
                    </div>
                  ))}
                  <div className="filter-options d-flex justify-content-center mt-2 align-items-center">
                    <a className="text-dark me-2" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={toggleMoreFilters}>
                      {selectedFilters.length > 0 ? (showMoreFilters ? 'Cerrar filtros' : 'Editar filtros') : (showMoreFilters ? 'Cerrar filtros' : 'Más filtros')}
                      <span><img src="/img/icons/Frame6.svg" alt="comprar" loading="lazy" /></span>
                    </a>
                    <span className="mx-2 text-muted">|</span>
                    <a className="text-danger" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleClearFilters}>
                      Quitar filtros
                    </a>
                  </div>
                </div>
              )}

              {!selectedFilters.length && (
                <div className="more-filters mt-2" onClick={toggleMoreFilters}>
                  <a className="text-dark" style={{ cursor: 'pointer' }}>
                    {showMoreFilters ? 'Cerrar filtros' : 'Más filtros'}
                  </a>
                  <span className="arrow"><img src="/img/icons/Frame6.svg" alt="toggle filtros" loading="lazy" /></span>
                  <hr />
                </div>
              )}

              {showMoreFilters && (
                <div className="additional-filters mt-3" style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ borderTop: "1px dashed black", margin: "20px 0", width: "100%" }}></div>

                  <div className="row">
                    <div className="col-md-4">
                      <label className="banner-filter-text-white">Monto máximo</label>
                      <input type="text" name="maxAmount" className="banner-filter-input-text" placeholder="Empieza a escribir..." value={formData.maxAmount} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="banner-filter-text-white">No. de habitaciones</label>
                      <select name="bedrooms" className="banner-filter-select" value={formData.bedrooms} onChange={handleChange}>
                        <option value="">Selecciona...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="banner-filter-text-white">No. baños</label>
                      <select name="bathrooms" className="banner-filter-select" value={formData.bathrooms} onChange={handleChange}>
                        <option value="">Selecciona...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2">
                      <label className="banner-filter-text-white">Parqueadero</label>
                      <select name="parking" className="banner-filter-select" value={formData.parking} onChange={handleChange}>
                        <option value="">Selecciona...</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label className="banner-filter-text-white">Amoblado</label>
                      <div className="switch-container" onClick={toggleSwitch}>
                        <span className={`label ${!formData.furnished ? 'active' : ''}`}>No</span>
                        <div className={`toggle-switch ${formData.furnished ? 'yes' : 'no'}`}>
                          <div className="toggle-circle"></div>
                        </div>
                        <span className={`label ${formData.furnished ? 'active' : ''}`}>Sí</span>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label className="banner-filter-text-white">Zonas comunes</label>
                      <ZonasComunesSelect 
                      selectedOptions={formData.commonAreas}
                      setSelectedOptions={(newOptions) => setFormData((prevData) => ({ ...prevData, commonAreas: newOptions }))}
                      ></ZonasComunesSelect>
                    </div>

                    <div className="col-md-3">
                      <label className="banner-filter-text-white">Zonas cercanas</label>
                        <ZonasInteresSelect
                          selectedOptions={formData.nearbyAreas}
                          setSelectedOptions={(newOptions) => setFormData((prevData) => ({ ...prevData, nearbyAreas: newOptions }))}
                        />
                    </div>

                    <div className="col-md-2 text-center mt-4">
                      <button className="btn btn-dark w-100" onClick={handleApplyFilters}>Aplicar filtros</button>
                    </div>
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

export default BannerFilter;
