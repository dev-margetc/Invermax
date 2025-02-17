import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CatalogoProductosDosFilas = ({ items }) => {
  const itemsPerPage = 8; // Mostrar 8 elementos por página (2 filas de 4)
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const renderPagination = () => {
    const pageButtons = [];
    for (let i = 0; i < totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="fas fa-chevron-left" style={{ color: "black", fontSize: "14px" }}></i>
        </button>
        {pageButtons}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="fas fa-chevron-right" style={{ color: "black", fontSize: "14px" }}></i>
        </button>
      </div>
    );
  };

  const handleNavigate = () => {
    navigate('/plantillas');
  };

  return (
    <div className="catalogo-container container">
      {renderPagination()}
      <div className="catalogo">
        {paginatedItems.map((item, index) => (
          <div className="property-card" key={index}>
            {item.badge.toLowerCase() === "destacado" && (
              <span className="badge-destacado">
                Destacado
                <span className="badge-destacado-start">
                  <img src="/img/icons/Star1.svg" alt="" width="55px" loading="lazy" />
                </span>
              </span>
            )}
            {item.nuevo === true && (
              <span className="badge-nuevo-catalogo" style={{ overflow: "hidden" }}>
                Nuevo
              </span>
            )}
            {item.badge.toLowerCase() === "alta demanda" && (
              <span className="badge-alta-demanda">
                <img src="img/icons/vectorFlechaRoja.svg" alt="alta" loading="lazy" /> Alta Demanda
              </span>
            )}
            <img className="property-img" src={item.imgSrc} alt={`Inmueble ${index + 1}`} loading="lazy" />
            <div className="property-info">
              {item.proyecto === true && <span className="zona-proyecto">Proyecto</span>}
              <p>
                {item.info.split(" - ").map((line, index) => (
                  <span
                    key={index}
                    className={index === 0 ? "info-title" : "info-detail-bold"}
                  >
                    {line}
                    {index < item.info.split(" - ").length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p className="price">
                {item.price.split(" - ").map((line, index) => {
                  const regex = /(\$[\d.,]+)/g;
                  const parts = line.split(regex);
                  return (
                    <span key={index} className="price-part">
                      {parts.map((part, i) =>
                        regex.test(part) ? (
                          <span key={i} className="price-green">
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                      {index < item.price.split(" - ").length - 1 && <br />}
                    </span>
                  );
                })}
              </p>
              <div className="property-details container">
                <div className="detail-item">
                  <span className="icon">
                    <img src="/img/icons/fa-icon.svg" alt="#" loading="lazy" />
                  </span>
                  <span className="value">{item.area}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">
                    <img src="/img/icons/fa-icon2.svg" alt="#" loading="lazy" />
                  </span>
                  <span className="value">{item.rooms}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">
                    <img src="/img/icons/fa-icon3.svg" alt="#" loading="lazy" />
                  </span>
                  <span className="value">{item.baths}</span>
                </div>
              </div>
              <p>Nombre vendedor / Inmobiliaria</p>
            </div>
            <button className="btn-ver-inmueble" onClick={handleNavigate}>
              Ver inmueble
            </button>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default CatalogoProductosDosFilas;
