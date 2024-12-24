import React, { useState, useRef, useEffect } from 'react';
import '../../style/App2.css';

const ZonasCercanas = ({ selectedOptions = [], setSelectedOptions, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'hospital', label: 'Hospital' },
    { value: 'escuela', label: 'Escuela' },
    { value: 'parque', label: 'Parque' },
    { value: 'centro_comercial', label: 'Centro Comercial' },
    { value: 'supermercado', label: 'Supermercado' },
    { value: 'estacion_transporte', label: 'Estación de Transporte' },
    { value: 'restaurante', label: 'Restaurante' },
    { value: 'banco', label: 'Banco' },
    { value: 'gimnasio', label: 'Gimnasio' },
    // Agrega más opciones según sea necesario
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionToggle = (option) => {
    const isSelected = Array.isArray(selectedOptions) && selectedOptions.some((item) => item.value === option.value);
    const updatedOptions = isSelected
      ? selectedOptions.filter((item) => item.value !== option.value)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    if (onSelectionChange) onSelectionChange(updatedOptions); // Notifica al componente padre
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="select-box" onClick={handleDropdownToggle}>
        <div className="selected-options">
          {Array.isArray(selectedOptions) && selectedOptions.length === 0 && (
            <span className="placeholder-m">Seleccionar...</span>
          )}
          {Array.isArray(selectedOptions) &&
            selectedOptions.map((option) => (
              <div key={option.value} className="selected-option">
                {option.label}
                <span className="remove-option" onClick={() => handleOptionToggle(option)}>
                  &times;
                </span>
              </div>
            ))}
        </div>
        <span className="arrow"><img src="/img/icons/Frame6.svg" alt="comprar" loading="lazy"/></span>
      </div>

      {isDropdownOpen && (
        <div className="dropdown">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div key={option.value} className="option-item" onClick={() => handleOptionToggle(option)}>
                  <input
                    type="checkbox"
                    checked={Array.isArray(selectedOptions) && selectedOptions.some((item) => item.value === option.value)}
                    readOnly
                  />
                  <label>{option.label}</label>
                </div>
              ))
            ) : (
              <p className="no-options">No hay opciones disponibles</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonasCercanas;
