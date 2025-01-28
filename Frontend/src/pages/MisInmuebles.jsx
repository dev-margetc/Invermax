import React, { useState } from "react";
import Swal from "sweetalert2";

import "../style/style-costumer/MisInmuebles.css";
import AgregarOtroTipoInmueble from "../components/modules/costumer/AgregarOtroTipoInmueble";
import btnEditar from "../assets/icons/bntEditarMisInmuebles.svg";
import btnEliminar from "../assets/icons/btnEliminarMisInmuebles.svg";

const MisInmuebles = () => {
  const [items, setItems] = useState([
    {
      title: "Título proyecto/inmueble",
      estado: "Borrador",
      codigo: "854-4549-024",
      diasDestacados: "0 / 15",
      horasAscenso: "0 / 24",
      destacado: false,
      altaDemanda: false,
    },
    {
      title: "Título proyecto/inmueble",
      estado: "Publicado",
      codigo: "854-4549-025",
      diasDestacados: "0 / 15",
      horasAscenso: "0 / 24",
      destacado: false,
      altaDemanda: false,
    },
  ]);

  const handleEdit = () => {
    Swal.fire({
      title: "Editar inmueble",
      text: "Serás redirigido a la página de edición.",
      icon: "info",
      showCancelButton: true, // Agrega el botón de cancelar
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ir ahora",
      cancelButtonText: "Cancelar", // Texto del botón de cancelar
      width: "350px", // Tamaño personalizado
    }).then((result) => {
      if (result.isConfirmed) {
        // Solo redirige si se confirma
        window.location.href = "/publicar-nuevo-inmueble";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Mensaje opcional cuando se cancela
        Swal.fire({
          title: "Cancelado",
          text: "La edición ha sido cancelada.",
          icon: "error",
          width: "300px",
        });
      }
    });
  };
  

  const handleDelete = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: "350px", 
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = items.filter((_, idx) => idx !== index);
        setItems(updatedItems);

        Swal.fire(
          "Eliminado",
          "El inmueble ha sido eliminado exitosamente.",
          "success"
        );
      }
    });
  };

  const handleCheckboxChange = (index, key) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, [key]: !item[key] } : item
    );
    setItems(updatedItems);
  };

  const Card = ({ children, className }) => (
    <div className={`mis-inmuebles-card ${className}`}>{children}</div>
  );

  const CardContent = ({ children }) => <div>{children}</div>;

  const Button = ({ children, className, onClick }) => (
    <button onClick={onClick} className={`mis-inmuebles-button ${className}`}>
      {children}
    </button>
  );

  const Checkbox = ({ checked, onChange, className }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`mis-inmuebles-checkbox ${className}`}
    />
  );

  return (
    <>
      <div className="mis-inmuebles">
        <h1>MIS INMUEBLES</h1>
        <div className="main-container-mis-inmuebles">
          {/* Vista de escritorio */}
          <div className="hidden lg:block">
            <table className="mis-inmuebles-table">
              <thead>
                <tr>
                  <th className="mis-inmuebles-th">Título inmueble</th>
                  <th className="mis-inmuebles-th">Estado</th>
                  <th className="mis-inmuebles-th">Código</th>
                  <th className="mis-inmuebles-th">Días destacados</th>
                  <th className="mis-inmuebles-th">Horas en ascenso</th>
                  <th className="mis-inmuebles-th">Activar etiquetas</th>
                  <th className="mis-inmuebles-th">Editar</th>
                  <th className="mis-inmuebles-th">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="mis-inmuebles-tr">
                    <td className="mis-inmuebles-td">{item.title}</td>
                    <td
                      className={`mis-inmuebles-td ${
                        item.estado === "Publicado"
                          ? "mis-inmuebles-estado-publicado"
                          : "mis-inmuebles-estado-borrador"
                      }`}
                    >
                      {item.estado}
                    </td>
                    <td className="mis-inmuebles-td">{item.codigo}</td>
                    <td className="mis-inmuebles-td">{item.diasDestacados}</td>
                    <td className="mis-inmuebles-td">{item.horasAscenso}</td>
                    <td className="mis-inmuebles-td">
                      <label>
                        <Checkbox
                          checked={item.destacado}
                          onChange={() => handleCheckboxChange(index, "destacado")}
                        />
                        Activar Destacado
                      </label>
                      <label className="ml-2">
                        <Checkbox
                          checked={item.altaDemanda}
                          onChange={() =>
                            handleCheckboxChange(index, "altaDemanda")
                          }
                        />
                        Activar Alta demanda
                      </label>
                    </td>
                    <td className="mis-inmuebles-td">
                      <Button
                        className="mis-inmuebles-edit-button"
                        onClick={handleEdit}
                      >
                        <img src={btnEditar} alt="btn-editar" />
                      </Button>
                    </td>
                    <td className="mis-inmuebles-td">
                      <Button
                        className="mis-inmuebles-delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        <img src={btnEliminar} alt="btn-eliminar" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="main-container-mis-inmuebles mt-3">
          <AgregarOtroTipoInmueble />
        </div>
      </div>
    </>
  );
};

export default MisInmuebles;
