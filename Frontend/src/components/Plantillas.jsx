import React from "react";
import { useNavigate } from "react-router-dom";

const Plantillas = () => {
  const navigate = useNavigate(); // Hook para navegación

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Plantillas</h1>
      <p>Selecciona una de las plantillas:</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          style={{ padding: "10px 20px", cursor: "pointer" }}
          onClick={() => navigate("/compra")}
        >
          Plantilla Compra
        </button>
        <button
          style={{ padding: "10px 20px", cursor: "pointer" }}
          onClick={() => navigate("/usado")}
        >
          Plantilla Compra Usada
        </button>
        <button
          style={{ padding: "10px 20px", cursor: "pointer" }}
          onClick={() => navigate("/arriendo")}
        >
          Plantilla Arriendo
        </button>
      </div>
    </div>
  );
};

export default Plantillas;
