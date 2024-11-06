import React, { useState } from 'react';

const Banner = () => {
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
        <h1 className="mb-4 text-dark titulo-p"><b>ENCUENTRA TU INMUEBLE</b></h1>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card pad-buscador fondo-buscador bg-opacity-75">
              <div className="row">
                <div className="col-md-12 mb-3 p-0 botones-principales">
                  <div className="boton-ciudad">
                    <button
                      id="cityButton"
                      className={`btn btn-outline-light buscador ${showCityInputs ? 'actives-bottons' : ''}`}
                      onClick={handleCityClick}
                    >
                      Por ciudad
                    </button>
                  </div>
                  <div className="boton-codigo">
                    <button
                      id="codeButton"
                      className={`btn btn-outline-light buscador ${!showCityInputs ? 'actives-bottons' : ''}`}
                      onClick={handleCodeClick}
                    >
                      Por código
                    </button>
                  </div>
                </div>
              </div>

              {/* Por Ciudad Inputs */}
              {showCityInputs && (
                <div id="cityInputs" className="row mt-4">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="category" className="form-label text-white-custom">Categoría del Inmueble</label>
                    <select className="custom-select" id="category">
                      <option selected>Selecciona...</option>
                      <option value="1">Apartamento</option>
                      <option value="2">Casa</option>
                      <option value="3">Oficina</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="purpose" className="form-label text-white-custom">¿Qué quieres hacer?</label>
                    <select className="custom-select" id="purpose">
                      <option selected>Selecciona...</option>
                      <option value="1">Comprar</option>
                      <option value="2">Rentar</option>
                    </select>
                  </div>
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="city" className="form-label text-white-custom">Ciudad</label>
                    <input type="text" className="input-t" id="city" placeholder="Empieza a escribir..." />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-dark w-100">
                      <img src="/img/icons/lupa.svg" alt="lupa" width="16" className="me-2" /> Buscar
                    </button>
                  </div>
                </div>
              )}

              {/* Por Código Inputs */}
              {!showCityInputs && (
                <div id="codeInputs" className="row mt-4 center">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <label htmlFor="code" className="form-label text-white-custom">Código</label>
                    <input type="text" className="input-c" id="code" placeholder="..." />
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-dark w-100">
                      <img src="/img/icons/lupa.svg" alt="lupa" width="16" className="me-2" /> Buscar
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
