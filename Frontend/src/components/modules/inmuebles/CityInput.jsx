import React, { useState } from "react";
import { api } from "../../../services/api";

const CityInput = ({ valorFiltro, onCitySelect}) => {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);

    const fetchCities = async (nombreCiudad) => {
        try {
            // Petición al backend.
            const response = await api.get(`inmuebles/ciudades/${nombreCiudad}`);
            console.log(response.data);
            if (!response.status == 200) {
                throw new Error("Error al obtener las ciudades.");
            }
            const data = response.data;
            setCities(data);
        } catch (err) {
            console.error(err);
        }
    };

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
    };

    // Maneja la selección de la ciudad
    const handleCitySelect = ({ target: { value } }) => {
        const selectedCityId = value; // Obtener el valor seleccionado
        const selectedCity = cities.find(city => city.codCiudad == selectedCityId); // Encuentra la ciudad en la lista
        console.log(cities);
        console.log(selectedCity); // Muestra la ciudad seleccionada en la consola

        setQuery(selectedCity.nombreCiudad); // Actualiza el input con el nombre de la ciudad seleccionada
        setCities([]); // Limpiar los resultados
        
        if (selectedCity) {
            onCitySelect({
              target: { name: "city", value: selectedCityId } // Estructura esperada por handleChange
            });
          } // Notificar al componente padre el ID de la ciudad seleccionada
    };

    return (
        <div className="col-md-3 mb-3 mb-md-0">
            <label className="banner-filter-text-white">Ciudad</label>

            <input
                type="text"
                name="city"
                value={query}
                onChange={handleInputChange}
                placeholder="Busca una ciudad"
                className="banner-filter-input-text"
            />
            {cities.length > 0 && (
                <select onChange={handleCitySelect} defaultValue="" value={valorFiltro} className="banner-filter-select">
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
