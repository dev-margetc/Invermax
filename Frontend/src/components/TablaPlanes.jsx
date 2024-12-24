import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../style/TablaPlanes.css";

const TablaPlanes = ({ planesPorPerfil }) => {
  const [activeTab, setActiveTab] = useState("Constructora");
  const navigate = useNavigate(); // Instancia de useNavigate

  // Obtén los planes activos según la pestaña seleccionada
  const planesActivos = planesPorPerfil[activeTab] || [];

  // Función para redirigir a la página de Canasta con el plan seleccionado
  const handleAdquirirPlan = (plan) => {
    navigate("/canasta", { state: { selectedPlan: plan } }); // Enviar datos al componente Canasta
  };

  return (
    <>
      {/* Tabs (visibles solo en PC) */}
      <div className="tabla-tabs">
        {Object.keys(planesPorPerfil).map((perfil) => (
          <button
            key={perfil}
            className={`tabla-tab ${activeTab === perfil ? "active" : ""}`}
            onClick={() => setActiveTab(perfil)}
          >
            {perfil}
          </button>
        ))}
      </div>
      <div className="separador"></div>

      <div className="tabla-planes-wrapper">
        {/* Select (visible solo en móvil) */}
        <div className="tabla-planes-select">
          <label htmlFor="perfil" className="select-label">
            Selecciona tu perfil
          </label>
          <select
            id="perfil"
            name="perfil"
            className="select-black"
            onChange={(e) => setActiveTab(e.target.value)}
          >
            {Object.keys(planesPorPerfil).map((perfil) => (
              <option key={perfil} value={perfil}>
                {perfil}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla de planes con scroll horizontal */}
        <div className="tabla-planes-container">
          <div className="tabla-planes">
            {/* Columna negra (visible solo en PC) */}
            <div className="tabla-columna-izquierda">
              <p>TIPO DE PLAN</p>
              <p>PROYECTO/MES</p>
              <div className="cara-izquierda">
                <h6>CARACTERÍSTICAS</h6>
              </div>
            </div>

            {/* Columnas dinámicas de los planes */}
            {planesActivos.map((plan, index) => (
              <div className="tabla-columna" key={index}>
                <h3 className="tabla-titulo">{plan.titulo}</h3>
                <span className="tabla-proyecto pp">{plan.proyectos}</span>
                <ul className="tabla-caracteristicas">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx}>
                      <span className="check-icon"></span> {caracteristica}
                    </li>
                  ))}
                </ul>
                <div className="buton">
                  <button
                    className="tabla-boton"
                    onClick={() => handleAdquirirPlan(plan)} // Redirigir al seleccionar un plan
                  >
                    Adquirir plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TablaPlanes;
