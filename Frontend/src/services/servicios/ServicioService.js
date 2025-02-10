// Ejecuta las peticiones donde los servicios son el objeto principal de la relacion
import { api } from "../api";
import { formatServicioData } from "../utils/servicios/ServicioUtils";

// Traer los servicios
const getServicios = async () => {
    let url = "/servicios";
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

// Función para agregar un nuevo servicio
// const addServicio = async (data) => {
//     try {
//         const response = await api.post('/servicios', data);
//         return response.data;
//     } catch (error) {
//         console.error("Error al agregar el servicio:", error);
//         throw error;
//     }
// };

const addServicio = async (nuevoServicio) => {
    let url = "/servicios";

    try {
        const response = await api.post(url, nuevoServicio, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al agregar el servicio:", error);
        throw error;
    }
};







// Función para actualizar un servicio
// const updateServicio = async (id, data) => {
//     try {
//         const response = await api.put(`/servicios/${id}`, data);
//         return response.data;
//     } catch (error) {
//         console.error("Error al actualizar el servicio:", error);
//         throw error;
//     }
// };


const updateServicio = async (id, datosActualizados) => {
    let url = `/servicios/${id}`;
    const formData = new FormData();

    for (const key in datosActualizados) {
        if (key !== "fotoServicio") {
            formData.append(key, datosActualizados[key]);
        }
    }

    if (datosActualizados.fotoServicio instanceof File) {
        formData.append("fotoServicio", datosActualizados.fotoServicio);
    }

    // 🔍 IMPRIMIR EL CONTENIDO DE FORM DATA
    for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]); 
    }

    try {
        const response = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log("📌 Respuesta del backend:", response.data); // 🔍 IMPRIMIR RESPUESTA DEL BACKEND

        return response.data;
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
        throw error;
    }
};





// Función para cargar la foto del servicio
// const uploadFotoServicio = async (idServicio, formData) => {
//     try {
//         const response = await api.put(`/servicios/${idServicio}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error al cargar la foto del servicio:", error);
//         throw error;
//     }
// };


const uploadFotoServicio = async (idServicio, formData) => {
    try {
        const response = await api.put(`/servicios/${idServicio}/foto`, formData, {
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


const deleteServicio = async (idServicio) => {
    let url = `/Servicios/${idServicio}`;
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
    getServicios,
    addServicio,
    updateServicio,
    uploadFotoServicio,
    deleteServicio
};
