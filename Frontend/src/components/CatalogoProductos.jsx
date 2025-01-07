import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
//import items from './Productos';
import InmuebleService from '../services/inmuebles/InmuebleService';

const CatalogoProductos = ({ filters, showOnlyFour = false }) => {
  const [items, setInmuebles] = useState([]);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    if (!filters || Object.keys(filters).length === 0) {
      setInmuebles([]); // establece un estado inicial vacio
      return;
    }

    const fetchInmuebles = async () => {
      try {
        if (filters) {
          const data = await InmuebleService.getInmueblesPublicados(filters, navigate);
          setInmuebles(data || []);
        }
      } catch (error) {
        console.error("Error al cargar los inmuebles:", error);
      }
    };
    fetchInmuebles();
  }, [filters]); //Actualizar cuando los filtros cambian

  const itemsPerPage = showOnlyFour ? 4 : 12; // Mostrar solo 4 items si 'showOnlyFour' es true
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = showOnlyFour
    ? items.slice(0, 4) // Solo 4 items
    : items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const renderPagination = () => {
    if (showOnlyFour) return null; // No mostrar paginación si 'showOnlyFour' es true
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
        {filters?.idCustomer && (
          <p>Inmuebles de {filters.nombreCustomer}</p>
        )}
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
  return (
    <div className={`catalogo-container container ${showOnlyFour ? "four-items-layout" : ""}`}>
      {!showOnlyFour && renderPagination()} {/* No renderizar paginación si 'showOnlyFour' es true */}

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

              <p>{item.nombreCustomer || "Nombre vendedor / Inmobiliaria"}</p>
            </div>
            <button className="btn-ver-inmueble" onClick={() => InmuebleService.handleNavigate(item, navigate)}>
              Ver inmueble
            </button>
          </div>
        ))}
      </div>
      {!showOnlyFour && renderPagination()}
    </div>
  );
};

export default CatalogoProductos;
