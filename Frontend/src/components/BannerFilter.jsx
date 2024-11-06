import React, { useState } from 'react';

const BannerFilter = () => {
  const [showCityInputs, setShowCityInputs] = useState(true);

  const handleCityClick = () => {
    setShowCityInputs(true);
  };

  const handleCodeClick = () => {
    setShowCityInputs(false);
  };

  return (
    <section className="banner">
      <div className="overlay"></div>
      <div className="banner-content container text-white">
        <h1 className="mb-4 text-dark"><b>ENCUENTRA TU INMUEBLE</b></h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card pad-buscador fondo-buscador bg-opacity-75">
              <div className="row">
                <div className="col-md-12 mb-3 p-0">
                  <button
                    id="cityButton"
                    className={`btn btn-outline-light me-2 buscador ${showCityInputs ? 'actives-bottons' : ''}`}
                    onClick={handleCityClick}
                  >
                    Por ciudad
                  </button>
                  <button
                    id="codeButton"
                    className={`btn btn-outline-light buscador ${!showCityInputs ? 'actives-bottons' : ''}`}
                    onClick={handleCodeClick}
                  >
                    Por código
                  </button>
                </div>
              </div>

              {/* Por Ciudad Inputs */}
              {showCityInputs && (
                <div id="cityInputs" className="row mt-4">
                  {/* Contenido de búsqueda por ciudad */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="category" className="form-label">Categoría del Inmueble</label>
                    <select className="form-select" id="category">
                      <option selected>Selecciona...</option>
                      <option value="1">Apartamento</option>
                      <option value="2">Casa</option>
                      <option value="3">Oficina</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="purpose" className="form-label">¿Qué quieres hacer?</label>
                    <select className="form-select" id="purpose">
                      <option selected>Selecciona...</option>
                      <option value="1">Comprar</option>
                      <option value="2">Rentar</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="city" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="city" placeholder="Empieza a escribir..." />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-dark w-100">🔍 Buscar</button>
                  </div>
                </div>
              )}

              {/* Por Código Inputs */}
              {!showCityInputs && (
                <div id="codeInputs" className="row mt-4 center">
                  {/* Contenido de búsqueda por código */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="code" className="form-label">Código</label>
                    <input type="text" className="form-control" id="code" placeholder="Ingresa el código..." />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-dark w-100">🔍 Buscar</button>
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
