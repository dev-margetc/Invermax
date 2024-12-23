import { api } from "../api";
import { formatPerfilPlanData } from "./PlanUtils";


const getPlanesActivosPerfil = async (idPerfil = null) => {
    const endpoint = idPerfil
        ? `/suscripciones/planes/tipoPerfil/${idPerfil}/activo`
        : `/suscripciones/planes/tipoPerfil/activo`;
    const response = await api.get(endpoint);
    if (!response.data) {
        throw new Error("No se recibieron datos de la API.");
    }
    console.log(response.data);
    // Usar la función de utils para formatear los datos antes de devolverlos
    return formatPerfilPlanData(response.data);
}

export default {
    getPlanesActivosPerfil,
};

