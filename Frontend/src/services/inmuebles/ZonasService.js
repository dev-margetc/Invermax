// Ejecuta las peticiones donde los inmuebles son el objeto principal de la relacion
import { api } from "../api";
import { formatZona } from "../utils/inmuebles/ZonaUtil";
// Traer las zonas
const getZonas = async (tipo) => {
    let url;
    try {
        if (tipo == "comunes") {
            url = `/inmuebles/zonas/comunes`;
        } else if (tipo == "interes") {
            url = `/inmuebles/zonas/interes`;
        }
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        return formatZona(response.data);
    } catch (error) {
        console.log(error);
    }
}

export default {
    getZonas
};
