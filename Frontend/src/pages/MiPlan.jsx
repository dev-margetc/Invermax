import React, { useState } from "react";
import "../style/style-costumer/MiPlan.css";

const MiPlan = () => {
  // JSON con los datos del plan
  const miPlanData = {
    plan: "Plan tipo 1",
    proyectos: 1,
    recursos: {
      diasDestacados: { usados: 10, total: 15 },
      horasAscenso: { usadas: 18, total: 24 }
    },
    cobro: {
      fecha: "15 / 11 / 2024",
      valor: 250000,
      descuento: "10%",
      impuestos: 19
    }
  };

  const [verMas, setVerMas] = useState(false);

  return (
    <div className="mi-plan-container-principal">
      <h1>MI PLAN</h1>
      <div className="mi-plan">
        <h2 className="mi-plan__titulo">{miPlanData.plan}</h2>
        <p className="mi-plan__subtitulo">{miPlanData.proyectos} proyecto(s)</p>

        <div className="mi-plan__contenido">
          <div className="mi-plan__seccion">
            <h3 className="mi-plan__seccion-titulo">Recursos</h3>
            <div className="mi-plan__subseccion">
              <p><strong>Días destacados usados</strong></p>
              <span>{miPlanData.recursos.diasDestacados.usados} / {miPlanData.recursos.diasDestacados.total}</span>
              <p><strong>Horas ascenso usadas</strong></p>
              <span>{miPlanData.recursos.horasAscenso.usadas} / {miPlanData.recursos.horasAscenso.total}</span>
              {verMas && (
                <>
                  <p><strong>Proyectos completados</strong></p>
                  <span>5 / 10</span>
                  <p><strong>Tareas pendientes</strong></p>
                  <span>3 / 5</span>
                </>
              )}
            </div>
          </div>

          <div className="mi-plan__divider"></div>
          <div className="mi-plan__divider_mobile"></div>

          <div className="mi-plan__seccion">
            <h3 className="mi-plan__seccion-titulo">Cobro</h3>
            <div className="mi-plan__subseccion">
              <p><strong>Fecha de cobro</strong></p>
              <span>{miPlanData.cobro.fecha}</span>
              <p><strong>Valor de cobro</strong></p>
              <span className="mi-plan__valor">${miPlanData.cobro.valor.toLocaleString()}</span>
              {verMas && (
                <>
                  <p><strong>Descuento aplicado</strong></p>
                  <span>{miPlanData.cobro.descuento}</span>
                  <p><strong>Impuestos</strong></p>
                  <span>${(miPlanData.cobro.valor * (miPlanData.cobro.impuestos / 100)).toLocaleString()}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mi-plan__botones">
          <button className="mi-plan__btn mi-plan__btn--primario">Cambiar plan</button>
          <button className="mi-plan__btn mi-plan__btn--secundario">Cancelar</button>
          <button className="mi-plan__btn mi-plan__btn--secundario" onClick={() => setVerMas(!verMas)}>
            {verMas ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiPlan;
