// src/pages/Filter.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import BannerFilter from '../components/BannerFilter';
import CatalogoProductos from '../components/CatalogoProductos';


const Filter = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Obtener datos del formulario
  const [filters, setFilters] = useState(null); // Estado para almacenar filtros activos

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters); // Recibir filtros desde BannerFilter
    console.log(appliedFilters);
  };
  return (
    <div>
      <BannerFilter initialData={formData} onApplyFilters={handleApplyFilters}/>
      <CatalogoProductos filters={filters}/>
    </div>
  );
};

export default Filter;
