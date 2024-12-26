// Ejecuta las peticiones donde los inmuebles son el objeto principal de la relacion
import { api } from "../api";
import { formatInmueblePublicadoData } from "../utils/InmuebleUtils";

// Traer los inmuebles publicados
const getInmueblesPublicados = async () => {
    try {
        const response = await api.get(`inmuebles/publicados`);
        console.log(response.data);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }

        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
    }
}

// Traer los inmuebles destacados
const getInmueblesDestacados = async () => {
    try {
        const response = await api.get(`suscripciones/destacados/activos`);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        console.log(response.data);
        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
    }
}

// Traer los inmuebles en alta demanda
const getInmueblesDemanda = async () => {
    try {
        const response = await api.get(`suscripciones/ascenso/activos/`);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        console.log(response.data);
        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
    }
}
export default {
    getInmueblesPublicados,
    getInmueblesDestacados,
    getInmueblesDemanda
};
