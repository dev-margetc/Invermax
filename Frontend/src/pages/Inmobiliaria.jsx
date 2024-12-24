import React, { useState } from "react";
import "../style/App3.css";
import IconInmobiliaria from "../assets/icons/InmobiliariaIcon.svg";
import CatalogoProductosDosFilas from "../components/InmobiliariaCatalogo"; // Importa el componente

const Inmobiliaria = () => {
  const [filter, setFilter] = useState("todo");

  const properties = [
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: false,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: false,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: false,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: false,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: false,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "alta demanda",
      nuevo: false,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: false,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: false,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "alta demanda",
      nuevo: false,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "",
      nuevo: false,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    {
      imgSrc: "/img/Destacados/img-d-1.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Arriendo - $185.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: false,
    },
    {
      imgSrc: "/img/Destacados/img-d-2.png",
      info: "Bogotá - Apartaestudio, Chapinero alto",
      price: "Desde $185.000.000 - Hasta $255.000.000",
      area: "Área m² 132",
      rooms: "Habit. 1",
      baths: "Baños 1",
      badge: "destacado",
      nuevo: true,
      proyecto: true,
    },
    // Agrega info a los demás elementos...
  ];
  

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtra las propiedades según el filtro seleccionado
  const filteredProperties = properties.filter((property) =>
    filter === "todo" ? true : property.badge.toLowerCase() === filter
  );

  return (
    <div className="App">
      <div className="fondo-edificios"></div>
      <header className="inmobiliaria-header mb-5">
        <div className="inmobiliaria-logo">
          <img src={IconInmobiliaria} alt="Logotipo" />
        </div>
        <div className="inmobiliaria-titulo">
          <h1>NOMBRE INMOBILIARIA - AGENTE - ETC</h1>
          <div className="inmobiliaria-linea-roja text-left"></div>
        </div>
      </header>

      <main>
        <div className="inmobiliaria-filter-section">
          <div className="line"></div>
          <div className="filter-content">
            <label htmlFor="filter">
              <strong>Filtrar por: </strong>
            </label>
            <select id="filter" onChange={handleFilterChange}>
              <option value="todo">Todo</option>
              <option value="destacado">Destacado</option>
              <option value="proyecto">Proyecto</option>
            </select>
          </div>
          <div className="line"></div>
        </div>

        {/* Usa el componente de catálogo para mostrar las propiedades filtradas */}
        <section className="inmobiliaria-property-list container">
          <CatalogoProductosDosFilas items={filteredProperties} />
        </section>
      </main>
    </div>
  );
};

export default Inmobiliaria;
