import React, { useState } from 'react';
import items from './Productos';


const CatalogoProductos = () => {
  
  const itemsPerPage = 12; // 4 productos por fila y 3 filas
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const renderPagination = () => {
    const pageButtons = [];
    for (let i = 0; i < totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
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
          <i className="fas fa-chevron-left" style={{ color: 'black', fontSize: '14px' }}></i>
        </button>
        {pageButtons}
        <button
          className="pagination-button"
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <i className="fas fa-chevron-right" style={{ color: 'black', fontSize: '14px' }}></i>
        </button>
      </div>
    );
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
                  <span className='badge-destacado-start'><img src="/img/icons/Star1.svg" alt="" width="55px"/></span>
                </span>
              )}
              {item.nuevo === true && (
                <span className="badge-nuevo-catalogo" style={{overflow: "hidden"}}>Nuevo</span>
              )}
              {item.badge.toLowerCase() === "alta demanda" && (
                <span className="badge-alta-demanda">
                  <img src="img/icons/vectorFlechaRoja.svg" alt="" /> Alta Demanda
                </span>
              )}


   
            <img className="property-img" src={item.imgSrc} alt={`Inmueble ${index + 1}`} />
            
            
            <div className="property-info">
            {item.proyecto === true && (
                  <span className='zona-proyecto'>Proyecto</span>
                )}

                <p>
                  {item.info.split(" - ").map((line, index) => (
                    <span key={index} className={index === 0 ? "info-title" : "info-detail-bold"}>
                      {line}
                      {index < item.info.split(" - ").length - 1 && <br />}
                    </span>
                  ))}
                </p>

                <p className="price">
                  {item.price.split(" - ").map((line, index) => {
                    // Expresión regular para detectar números y signos de dólar
                    const regex = /(\$[\d.,]+)/g;
                    const parts = line.split(regex);
                    return (
                      <span key={index} className="price-part">
                        {parts.map((part, i) =>
                          regex.test(part) ? (
                            <span key={i} className="price-green">{part}</span>
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
                  <span className="icon"><img src="/img/icons/fa-icon.svg" alt="#" /></span> {/* Usa un icono SVG o una imagen si prefieres */}
                  <span className="value">{item.area}</span>
                </div>
                <div className="detail-item">
                  <span className="icon"><img src="/img/icons/fa-icon2.svg" alt="#" /></span> {/* Icono de cama */}
                  <span className="value">{item.rooms}</span>
                </div>
                <div className="detail-item">
                  <span className="icon"><img src="/img/icons/fa-icon3.svg" alt="#" /></span> {/* Icono de baño */}
                  <span className="value">{item.baths}</span>
                </div>
              </div>

              <p>Nombre vendedor / Inmobiliaria</p>
              
            </div>
            <button className="btn-ver-inmueble">Ver inmueble</button>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default CatalogoProductos;
