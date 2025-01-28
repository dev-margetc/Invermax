import React, { useState } from 'react';
import './MultiSelectExample.css';
import flechaAbajo from "../../../assets/icons/flechaAbajo.svg";
import lupa2 from "../../../assets/icons/lupa2.svg";

const MultiSelectExample = ({ data }) => {
  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleRemove = (option) => {
    setSelectedOptions((prevSelected) => prevSelected.filter((item) => item !== option));
  };

  const filteredOptions = data.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="multi-select-wrapper">
      <div className="multi-select-container">
        <div className="multi-select" onClick={() => setShowDropdown(!showDropdown)}>
          <span>Selecciona opciones...</span>
          <span className="arrow-icon"></span>
        </div>

        {showDropdown && (
          <div className="dropdown">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <span className="search-icon"><img src={lupa2} alt="" srcset=""  loading='lazy'/></span>
            </div>
            <div className="options">
              {filteredOptions.map((option, index) => (
                <div key={index} className="option-item">
                  <label className="option-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}

                      style={{accentColor: 'red'}}

                    
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="selected-options">
        {selectedOptions.map((option, index) => (
          <div key={index} className="selected-option">
            {option}
            <div className='remove-option-icon-container'
              onClick={() => handleRemove(option)}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectExample;
