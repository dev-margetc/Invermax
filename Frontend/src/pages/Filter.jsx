// src/pages/Home.js
import React from 'react';
import Banner from '../components/Banner'; 
import CatalogoProductos from '../components/CatalogoProductos';


const Filter = () => {
  return (
    <div>
      <Banner />
      <CatalogoProductos />
    </div>
  );
};

export default Filter;
