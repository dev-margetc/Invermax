// Ejecuta las peticiones donde los aliados son el objeto principal de la relacion
import { api } from "../api";
import AuthService from "../usuarios/AuthService";

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
    // Traer el token
    const token = await AuthService.getToken();
    console.log(nuevoAliado);
    try {
        const logoAliado = nuevoAliado.logoAliado;
        nuevoAliado.logoAliado = null;
        const response = await api.post(url, nuevoAliado, {
            headers: {
                'Content-Type': 'multipart/form-data', 
                'Authorization': `Bearer ${token}`,
                
            },
        });

        if (logoAliado) {
            const formData = {};
            formData.logoAliado = logoAliado;
            const responseLogo = await editAliado(response.data.aliado, formData);
        }

        // if (!response.data) {
        //     throw new Error("No se recibió confirmación al agregar el aliado.");
        // }
        return response.data;
    } catch (error) {
        console.log(error);
    }

    const data = await response.data;
    console.log(data);
    
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
    // Traer el token
    const token = await AuthService.getToken();

    // Imprimir los datos que vas a enviar
    console.log('Datos a enviar al backend:', datosActualizados);
    console.log('ID del aliado:', idAliado);
    
    // Asegúrate de que el tipo de módulo esté correctamente configurado
    datosActualizados.tipoModulo = "aliados";


    const formData = new FormData();

// Primero, agrega todos los campos que NO sean archivos
for (const key in datosActualizados) {
    if (key !== "logoAliado") { // Evita agregar el archivo en este bucle
        formData.append(key, datosActualizados[key]);
    }
}

// Luego, agrega el archivo al final
if (datosActualizados.logoAliado instanceof File) {
    formData.append("logoAliado", datosActualizados.logoAliado);
}

    try {
        // Imprimir la URL de la solicitud antes de hacer la petición
        console.log('URL de la petición:', url);
        
        // Realiza la solicitud PUT
        const response = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si hay imágenes
                'Authorization': `Bearer ${token}`,
            },
        });
        
        // Imprimir la respuesta para depuración
        console.log('Respuesta del backend:', response);

        if (!response.data) {
            throw new Error("No se recibió confirmación al actualizar el aliado.");
        }
        return response.data;
    } catch (error) {
        // Imprimir el error en caso de que falle la solicitud
        console.log('Error al actualizar el aliado:', error);
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
    deleteAliado,
    uploadLogoAliado
};