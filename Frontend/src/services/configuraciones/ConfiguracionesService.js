// Ejecuta las peticiones donde las configuraciones son el objeto principal de la relacion
import { api } from "../api";

// Traer las configuraciones de informacion de invermax
const getInfoInvermax = async () => {
    let url = "/configuraciones/infoInvermax";
    try {
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        // Verificar si `response.data` es una cadena
        if (typeof response.data === "string") {
            // Convertir la cadena JSON a un objeto
            return JSON.parse(response.data);
        }

        // Si ya es un objeto, devolver directamente
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export default {
    getInfoInvermax
};