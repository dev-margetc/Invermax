// Ejecuta las peticiones donde los inmuebles son el objeto principal de la relacion
import { api } from "../api";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { formatInmueblePublicadoData } from "../utils/inmuebles/FilterUtil";
import { formatInmuebleData } from "../utils/inmuebles/InmuebleUtils";
import { formatProyectoData } from "../utils/inmuebles/ProyectoUtils";
import { formatFrontendFilter } from "../utils/inmuebles/FilterUtil";
import { createQueryString } from "../utils/GeneralUtils";
import AuthService from "../usuarios/AuthService";
import {clasificarZonas} from "../utils/inmuebles/ZonaUtil";

// Redireccionar a la vista completa de un inmueble dependiendo de modalidad y proyecto, solicita el navigate de react
const handleNavigate = (item, navigate) => {
    // 3 plantillas - para proyectos(compra), para comprar (otros) y arrendar (otros)
    let idInmueble = item.idInmueble;
    let modalidad = item.modalidad//arriendo o compra
    let isProyecto = item.proyecto;
    let ruta = '/'
    if (isProyecto) {
        ruta = '/compra'; // Para proyectos
    } else {
        if (modalidad == "arriendo") {
            ruta = '/arriendo' // Otros para arrendar
        } else {
            ruta = '/usado' //Otros para venta   
        }

    }
    navigate(ruta, { state: { idInmueble } }); // Pasa los datos como estado
};

// Traer los inmuebles publicados, usa un navigate en caso de que la busqueda sea por codigo
const getInmueblesPublicados = async (filters, navigate = null) => {
    try {
        let url;

        // Verificar si la consulta es por código
        if (filters.code) {
            // Si es por código realizar la redirección directa al inmueble
            url = `/inmuebles/codigo/${filters.code}`;
            const response = await api.get(url);
            if (!response.data) {
                throw new Error("No se recibieron datos de la API.");
            }
            if (response.data.length > 0) {
                // Realizar la redirección si se encontró
                handleNavigate(response.data[0], navigate);
            } else {
                alert("Inmueble con código: " + filters.code + " no encontrado.");
            }

        } else {

            // Si no es por código usar el filtro de públicados
            const filtrosMapeados = formatFrontendFilter(filters);
            const query = createQueryString(filtrosMapeados);
            if (query) {
                url = `/inmuebles/publicados?${query}`; // Adjuntar los filtros como query string
            } else {
                url = `/inmuebles/publicados`;
            }
            const response = await api.get(url);
            if (!response.data) {
                throw new Error("No se recibieron datos de la API.");
            }

            return formatInmueblePublicadoData(response.data)
        }

    } catch (error) {
        console.log(error);
    }
}

// Traer inmueble dado un ID o un codigo
const getInmuebleByIDCode = async (idInmueble = null, codigo = null, isProyecto = false) => {
    try {
        // Si usa el ID
        let url = '/'
        if (idInmueble) {
            url = `/inmuebles/${idInmueble}`
        } else {
            url = `/codigo/${codigo}`
        }
        const response = await api.get(url);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        console.log(response.data);
        // Si es proyecto o no formatea los datos del backend
        if (isProyecto) {
            return formatProyectoData(response.data);
        } else {
            return formatInmuebleData(response.data);
        }

    } catch (err) {
        console.log(err);
    }
}

// Traer los inmuebles destacados
const getInmueblesDestacados = async () => {
    try {
        const response = await api.get(`suscripciones/destacados/activos`);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
    }
}

// Traer los inmuebles en alta demanda
const getInmueblesDemanda = async () => {
    try {
        const response = await api.get(`suscripciones/ascenso/activos/`);
        if (!response.data) {
            throw new Error("No se recibieron datos de la API.");
        }
        return formatInmueblePublicadoData(response.data)
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Traer datos necesarios para la creación de un inmueble
const getConfiguracionCreacion = async () => {
    // Traer el token
    const token = await AuthService.getToken();
    try {
        if (token) {
            const endpoint = '/inmuebles/configuracion/creacion'
            // ----------------------------------
            const response = await api.get(endpoint,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
                    }
                }
            );
            // Convertir datos a los formatos usados en el frontend
            const data = {};
            data.zonas = clasificarZonas(response.data.zonas);
            data.tiposInmueble = response.data.tiposInmueble;
            return data;
        } else {
            alert("Inicie sesión para poder ver esto.");
        }
    } catch (err) {
        console.log(err);
    }
}


const registrarInmueble = async (formData, estado, navigate) => {
    try {
        const token = await AuthService.getToken();
        if (!token) {
            alert("⚠️ Inicie sesión para continuar.");
            return;
        }

        // Asegurar que los datos estén dentro del objeto `inmueble`
        const inmuebleData = {
            inmueble: {
                ...formData, // Datos generales del inmueble
                estadoInmueble: estado, // Agregar estado (publicado o borrador)
                detalles: formData.detalles || [], // Asegurar que detalles es una lista
                zonas: formData.zonas || [] // Asegurar que zonas es una lista
            }
        };

        console.log("📌 Enviando inmueble al backend:", JSON.stringify(inmuebleData, null, 2));

        const response = await api.post("/inmuebles", inmuebleData, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201 || response.status === 200) {
            alert(`✅ Inmueble ${estado === "publicado" ? "publicado" : "guardado como borrador"} exitosamente.`);
            navigate("/mis-inmuebles");
        } else {
            alert("⚠️ Hubo un problema al guardar el inmueble.");
        }
    } catch (error) {
        console.error("❌ Error al guardar el inmueble:", error);
        alert("❌ Ocurrió un error. Inténtalo de nuevo.");
    }
};



export default {
    getInmueblesPublicados,
    getInmueblesDestacados,
    getInmueblesDemanda,
    getInmuebleByIDCode,
    getConfiguracionCreacion,
    handleNavigate,
    registrarInmueble
};
