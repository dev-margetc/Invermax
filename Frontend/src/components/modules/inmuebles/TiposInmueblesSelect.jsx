import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";


const TiposInmueblesSelect = ({ onTipoSelect, selectClass, labelClass, value }) => {
    const [types, setTypes] = useState([]);

    const fetchTipos = async () => {
        try {
            // Petición al backend.
            const response = await api.get(`inmuebles/tipos`);
            if (!response.status == 200) {
                throw new Error("Error al obtener las ciudades.");
            }
            // Transformar datos: Capitalizar la primera letra del nombre del tipo
            const data = response.data.map((type) => ({
                ...type,
                tipoInmueble: type.tipoInmueble
                    ? type.tipoInmueble.charAt(0).toUpperCase() + type.tipoInmueble.slice(1).toLowerCase()
                    : "",
            }));
            setTypes(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Carga los tipos de inmuebles al montar el componente
    useEffect(() => {
        fetchTipos();
    }, []); // Se ejecuta solo una vez al montar

    // Maneja la selección del tipo
    const handleTypeSelect = ({ target: { value } }) => {
        const selectedIDType = value; // Obtener el valor seleccionado
        const selectedType = types.find(type => type.idTipoInmueble == selectedIDType); // Encuentra el tipo en la lista
            onTipoSelect({
                target: { name: "category", value: selectedIDType||null } // Estructura esperada por handleChange
            });
    };

    return (
        <div className="col-md-3 mb-3 mb-md-0">
            <label className={labelClass}>Categoría del Inmueble</label>
            <select name="category" value={value} className={selectClass} onChange={handleTypeSelect}>
                <option value="">
                    Selecciona...
                </option>
                {types.map((type) => (
                    <option key={type.idTipoInmueble} value={type.idTipoInmueble}>
                        {type.tipoInmueble}
                    </option>
                ))}
            </select>
        </div>
    );

}

export default TiposInmueblesSelect;