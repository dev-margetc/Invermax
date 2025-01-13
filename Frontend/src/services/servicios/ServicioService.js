// Ejecuta las peticiones donde los servicios son el objeto principal de la relacion
import { api } from "../api";
import { formatServicioData } from "../utils/servicios/ServicioUtils";

// Traer los servicios
const getServicios = async () => {
    let url = "/servicios/";
    try {
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        return formatServicioData(response.data);
    } catch (error) {
        console.log(error);
    }
}
export default {
getServicios
};