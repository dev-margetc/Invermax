import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom"; // Usa Link para manejar las rutas

// Muestra los tipos de inmueble como elemento para el banner
const TiposInmueblesBanner = () => {
    const [types, setTypes] = useState([]);

    // Componente de navegacion
    const navigate = useNavigate();

    const fetchTipos = async () => {
        try {
            // Petición al backend.
            const response = await api.get(`inmuebles/tipos`);
            if (!response.status == 200) {
                throw new Error("Error al obtener los tipos.");
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

    // Manejar busqueda de los dropdown
    const handleFilterClick = (filters) => (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        navigate('/filter', { state: { formData: filters } }); // Redirigir y pasar los filtros
    };

    return (
        <div>
            {types.map((type) => (
                <a href="#" key={type.idTipoInmueble} className="highlight" onClick={handleFilterClick({ purpose: "Comprar", category: type.idTipoInmueble })}>
                    {type.tipoInmueble}
                </a>
            ))}
        </div>
    );

}

export default TiposInmueblesBanner;