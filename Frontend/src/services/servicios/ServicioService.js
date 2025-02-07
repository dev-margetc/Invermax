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
// Función para agregar un nuevo servicio
const addServicio = async (data) => {
    try {
        const response = await api.post('/servicios', data);
        return response.data;
    } catch (error) {
        console.error("Error al agregar el servicio:", error);
        throw error;
    }
};

// Función para actualizar un servicio
const updateServicio = async (id, data) => {
    try {
        const response = await api.put(`/servicios/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
        throw error;
    }
};

// Función para cargar la foto del servicio
const uploadFotoServicio = async (idServicio, formData) => {
    try {
        const response = await api.put(`/servicios/${idServicio}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al cargar la foto del servicio:", error);
        throw error;
    }
};

export default {
    getServicios,
    addServicio,
    updateServicio,
    uploadFotoServicio
};
