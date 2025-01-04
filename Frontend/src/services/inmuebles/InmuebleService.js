// Ejecuta las peticiones donde los inmuebles son el objeto principal de la relacion
import { api } from "../api";
import { formatInmueblePublicadoData } from "../utils/FilterUtil";
import { formatInmuebleData} from "../utils/InmuebleUtils";
import {formatProyectoData} from "../utils/ProyectoUtils";
import { formatFrontendFilter } from "../utils/FilterUtil";
import { createQueryString } from "../utils/GeneralUtils";

// Traer los inmuebles publicados
const getInmueblesPublicados = async (filters) => {
    try {
        const filtrosMapeados = formatFrontendFilter(filters);
        const query = createQueryString(filtrosMapeados);
        console.log(query);
        let url;
        if (query) {
            url = `/inmuebles/publicados?${query}`; // Adjuntar los filtros como query string
        } else {
            url = `/inmuebles/publicados`;
        }
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }

        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
    }
}

// Traer inmueble dado un ID o un codigo
const getInmuebleByIDCode = async (idInmueble = null, codigo = null, isProyecto=false) => {
    try {
        // Si usa el ID
        let url = '/'
        if (idInmueble) {
            url = `/inmuebles/${idInmueble}`
        } else {
            url = `/codigo/${codigo}`
        }
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        console.log(response.data);
        // Si es proyecto o no formatea los datos del backend
        if(isProyecto){
            return formatProyectoData(response.data);
        }else{
            return formatInmuebleData(response.data);
        }
       
    } catch (err) {
        console.log(err);
    }
}

// Traer los inmuebles destacados
const getInmueblesDestacados = async () => {
    try {
        const response = await api.get(`suscripciones/destacados/activos`);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
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
        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
        return [];
    }
}
export default {
    getInmueblesPublicados,
    getInmueblesDestacados,
    getInmueblesDemanda,
    getInmuebleByIDCode
};
