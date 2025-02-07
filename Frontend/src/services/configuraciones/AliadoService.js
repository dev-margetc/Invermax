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


// Agregar un nuevo aliado
const addAliado = async (nuevoAliado) => {
    let url = "/configuraciones/aliados";
    try {
        const response = await api.post(url, nuevoAliado, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si hay imágenes
            },
        });
        if (!response.data) {
            throw new Error("No se recibió confirmación al agregar el aliado.");
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Función para cargar el logo del aliado
const uploadLogoAliado = async (idAliado, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/aliados/${idAliado}/logo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al cargar el logo del aliado:", error);
        throw error;
    }
};


// Editar un aliado
const editAliado = async (idAliado, datosActualizados) => {
    let url = `/configuraciones/aliados/${idAliado}`;
    try {
        const response = await api.put(url, datosActualizados, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si hay imágenes
            },
        });
        if (!response.data) {
            throw new Error("No se recibió confirmación al actualizar el aliado.");
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Eliminar un aliado
const deleteAliado = async (idAliado) => {
    let url = `/configuraciones/aliados/${idAliado}`;
    try {
        const response = await api.delete(url);
        if (!response.data) {
            throw new Error("No se recibió confirmación al eliminar el aliado.");
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default {
    getAliados,
    addAliado,
    editAliado,
    deleteAliado
};