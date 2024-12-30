import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";

const CityInput = ({ onCitySelect, inputClass, selectClass, labelClass, valorFiltro }) => {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);

    const fetchCities = async (nombreCiudad=null, idCiudad=null) => {
        try {
            // Petición al backend.
            let response;
            //Si es con nombre o con idCiudad
            if(nombreCiudad){
                response = await api.get(`inmuebles/ciudades/${nombreCiudad}`);
            }else{
                response = await api.get(`inmuebles/ciudades/id/${idCiudad}`);
            }
            if (!response.status == 200) {
                throw new Error("Error al obtener las ciudades.");
            }
            const data = response.data;
            setCities(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Este useEffect se ejecutará cada vez que 'valorFiltro' cambie
    useEffect(() => {
        if (valorFiltro) {
            const fetchCityById = async () => {
                const response = await api.get(`inmuebles/ciudades/id/${valorFiltro}`);
                if (response.status === 200) {
                    const city = response.data; // Se asume que la respuesta tiene el nombre y ID
                    setQuery(city.nombreCiudad); // Establece el nombre en el input
                }
            }
            fetchCityById();
        }else{
            setQuery("");
        }
    }, [valorFiltro]||[]); // Solo se ejecuta cuando 'valorFiltro' cambia y al inicio   

    // Manejar el cambio del input
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Hacer la petición si hay al menos 3 caracteres
        if (value.length >= 3) {
            fetchCities(value);
        } else {
            setCities([]); // Limpiar resultados si hay menos de 3 letras
        }

        if(value.length==0){
            setQuery("");
            onCitySelect({
                target: { name: "city", value: null } // Envia el id al componente padre
            });
        }
    };

    // Maneja la selección de la ciudad
    const handleCitySelect = ({ target: { value } }) => {
        // Value es el id de la ciudad
        const selectedCity = cities.find(city => city.codCiudad == value); // Encuentra la ciudad en la lista

        setQuery(selectedCity ? selectedCity.nombreCiudad : ""); // Actualiza el input con el nombre de la ciudad seleccionada

        setCities([]); // Limpiar los resultados

        if (selectedCity) {
            onCitySelect({
                target: { name: "city", value: value } // Envia el id al componente padre
            });
        } // Notificar al componente padre el ID de la ciudad seleccionada
    };

    return (
        <div className="col-md-3 mb-3 mb-md-0">
            <label className={labelClass}>Ciudad</label>

            <input
                type="text"
                name="city"
                value={query||""}
                onChange={handleInputChange}
                placeholder="Busca una ciudad"
                className={inputClass}
            />
            {cities.length > 0 && (
                <select onChange={handleCitySelect} className={selectClass} defaultValue="">
                    <option value="" disabled>
                        Selecciona una ciudad
                    </option>
                    {cities.map((city) => (
                        <option key={city.codCiudad} value={city.codCiudad}>
                            {city.nombreCiudad}, {city.departamento.nombreDepartamento}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}


export default CityInput;
