// Ejecuta las peticiones donde los servicios son el objeto principal de la relacion
import { api } from "../api";
import { formatServicioData } from "../utils/servicios/ServicioUtils";
import AuthService from "../usuarios/AuthService";

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


const addServicio = async (nuevoServicio) => {
    let url = "/servicios";

        // Traer el token
        const token = await AuthService.getToken();

    try {
        const fotoServicio = nuevoServicio.fotoServicio;
        nuevoServicio.fotoServicio = null;
        const response = await api.post(url, nuevoServicio, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if(fotoServicio){
            console.log(fotoServicio);
            const formData = {};
            formData.fotoServicio = fotoServicio;
            const responseFoto = await updateServicio(response.data.servicio, formData);
            console.log("📌 Respuesta de la foto del servicio:", responseFoto); // 🔍 IMPRIMIR RESPUESTA DE LA FOTO
        }

        return response.data;
    } catch (error) {
        console.error("Error al agregar el servicio:", error);
        throw error;
    }
};



const updateServicio = async (id, datosActualizados) => {
    let url = `/servicios/${id}`;

     // Traer el token
     const token = await AuthService.getToken();

    datosActualizados.tipoModulo = "servicios";
    console.log('Datos a enviar al backend:', datosActualizados);

      const formData = new FormData();

    for (const key in datosActualizados) {
        if (key !== "fotoServicio") {
            formData.append(key, datosActualizados[key]);
        }
    }

    console.log(datosActualizados.fotoServicio instanceof File); // 🔍 IMPRIMIR FORM DATA
    if (datosActualizados.fotoServicio instanceof File) {
        formData.append("fotoServicio", datosActualizados.fotoServicio);
        console.log("foto enviada: "+datosActualizados.fotoServicio);
    }

    // 🔍 IMPRIMIR EL CONTENIDO DE FORM DATA
    for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]); 
    }

    try {
        const response = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log("📌 Respuesta del backend:", response.data); // 🔍 IMPRIMIR RESPUESTA DEL BACKEND

        return response.data;
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
        throw error;
    }
};




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
