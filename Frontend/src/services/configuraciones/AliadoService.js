// Ejecuta las peticiones donde los aliados son el objeto principal de la relacion
import { api } from "../api";

// Traer las configuraciones de informacion de invermax
const getAliados = async () => {
    let url = "/configuraciones/aliados";
    try {
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export default {
    getAliados
};