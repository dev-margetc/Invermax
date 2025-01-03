import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importar useNavigate
import "../style/App3.css";
import IconCanasta from "../assets/icons/quitar_icon.svg";
import CheckList from "../assets/icons/checkList.svg";
import CanastaIcon1 from "../assets/icons/canasta-icon-1.svg";
import planService from "../services/suscripciones/PlanService"

const Canasta = () => {
  const { state } = useLocation(); // Obtener datos enviados desde TablaPlanes
  const navigate = useNavigate(); // Inicializar useNavigate
  const [selectedPlan, setSelectedPlan] = useState(state?.selectedPlan || null); // Inicializar con el plan recibido
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Método de pago seleccionado

  const handleIrPlanes = () => {
    navigate("/planes"); // Redirige a la página de planes
  };

  // Traer los precios de los planes
  const plans = (selectedPlan && selectedPlan.precios) ? selectedPlan.precios : [];


  const paymentMethods = [
    { id: 1, name: "PSE", icon: "/img/pse1.png" },
    { id: 2, name: "Tarjeta de Crédito", icon: "/img/pse1.png" },
    { id: 3, name: "Transferencia Bancaria", icon: "/img/pse1.png" },
    { id: 4, name: "Efectivo", icon: "/img/pse1.png" },
  ];

  const freePaymentMethod = [
    {
      id: 5, name: "Gratuito", icon: ""
    }
  ];

  const handleRemovePlan = () => {
    setSelectedPlan(null); // Limpia el plan seleccionado
    setSelectedPaymentMethod(null); // Limpia el método de pago seleccionado
  };

  const handlePayment = async () => {
    // Pasar el id del precio seleccionado y el plan correspondiente
     const response = await planService.generarSuscripcionGratuita(selectedPlan)
   /* alert(
      `Plan seleccionado: ${selectedPlan.titulo}, Duración: ${selectedPlan.duration}, Precio: ${selectedPlan.price}, Método de pago: ${selectedPaymentMethod?.name}`
    )*/
  }

  return (
    <>
      <div className="fondo-edificios"></div>
      <div className="confirmar-compra">
        <h1 className="title-canasta">CONFIRMAR COMPRA</h1>

        {selectedPlan ? (
          <div className="plan-container-1">
            <div className="btn-img">
              <button className="quitar-plan-btn" onClick={handleRemovePlan}>
                Quitar plan
              </button>
              <img src={IconCanasta} alt="quita-icon" loading="lazy" />
            </div>

            <div className="plan-container">
              <div className="plan-info">
                <h2 className="mb-4">
                  <strong>{selectedPlan.titulo}</strong>
                </h2>
                <h5>{selectedPlan.proyectos}</h5>
                <p>{selectedPlan.descripcion}</p>
              </div>

              <div>
                <h2 className="mb-4">
                  <strong>Características</strong>
                </h2>
                <ul className="features">
                  {selectedPlan.caracteristicas?.map((caracteristica, index) => (
                    <li key={index}>
                      <img src={CheckList} alt="checklist" loading="lazy" />{" "}
                      {caracteristica}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <img src={CanastaIcon1} alt="Empty state icon" />
            <h2>No hay seleccionado ningún plan</h2>
            <p>Ve a “comprar” para seleccionar tu mejor opción</p>
            <button
              className="pay-button"
              onClick={handleIrPlanes} // Llamada al manejador de redirección
            >
              Ir a planes
            </button>
          </div>
        )}
      </div>

      {selectedPlan && (
        <>
          <h3 className="subtitle">
            <strong>Seleccionar valor</strong>
          </h3>
          <div className="plans container mb-5">

            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() =>
                  setSelectedPlan({
                    ...selectedPlan,
                    duration: plan.duration,
                    price: plan.price,
                    idPrecioPlan: plan.id
                  })
                }
                className={`plan-option ${selectedPlan.duration === plan.duration ? "selected" : ""
                  }`}
              >
                <div className="movilMovimiento">
                  <div className="movilMovimiento-1">
                    <h4>
                      <strong>{plan.duration}</strong>
                    </h4>
                    <p
                      className={`${selectedPlan.duration === plan.duration
                        ? ""
                        : "price-no-selected"
                        }`}
                    >
                      {plan.price}
                    </p>
                  </div>
                  <span
                    className={`${selectedPlan.duration === plan.duration
                      ? "selected-btn"
                      : "btn-no-selected"
                      }`}
                  >
                    {selectedPlan.duration === plan.duration
                      ? "Seleccionado"
                      : "Seleccionar"}
                  </span>
                </div>

                <div className="normal">
                  <h4>
                    <strong>{plan.duration}</strong>
                  </h4>
                  <p
                    className={`${selectedPlan.duration === plan.duration
                      ? ""
                      : "price-no-selected"
                      }`}
                  >
                    {plan.price}
                  </p>
                  <span
                    className={`${selectedPlan.duration === plan.duration
                      ? "selected-btn"
                      : "btn-no-selected"
                      }`}
                  >
                    {selectedPlan.duration === plan.duration
                      ? "Seleccionado"
                      : "Seleccionar"}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Métodos de pago: Mostrar solo si se seleccionó valor*/}
          {selectedPlan.duration && selectedPlan.price && (
            <>
              <h3 className="subtitle">
                <strong>Seleccionar método de pago</strong>
              </h3>
              <div className="confirmar-compra">
                <div className="payment-methods container mb-5">
                  {
                    //Dependiendo del precio seleccionado tomar una lista de metodos
                  }
                  {(selectedPlan.price === "$0" ? freePaymentMethod : paymentMethods).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`payment-option ${selectedPaymentMethod?.id === method.id ? "selected" : ""
                        }`}
                    >
                      <img
                        src={method.icon}
                        alt={method.name}
                        className="payment-image"
                      />
                      <div className="circle">
                        {selectedPaymentMethod?.id === method.id && (
                          <span className="checkmark">✔</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="contenedor-btn-pay">
                  <button
                    className="pay-button"
                    onClick={handlePayment}
                  >
                    Realizar el pago
                  </button>
                </div>
              </div>

            </>
          )}
        </>
      )}
    </>
  );
};

export default Canasta;
