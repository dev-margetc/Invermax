// src/pages/Filter.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import BannerFilter from '../components/BannerFilter';
import CatalogoProductos from '../components/CatalogoProductos';


const Filter = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Obtener datos del formulario

  return (
    <div>
      <BannerFilter initialData={formData} />
      <CatalogoProductos />
    </div>
  );
};

export default Filter;
