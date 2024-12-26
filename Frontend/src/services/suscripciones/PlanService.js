import { api } from "../api";
import { jwtDecode } from "jwt-decode";
import { formatPerfilPlanData } from "../utils/PlanUtils";
import { handleTokenExpiration } from "../utils/AuthUtils";

// Traer los planes activos segun un perfil o todos si no se inició sesión
const getPlanesActivosPerfil = async () => {
    let idPerfil = null;
    try {
        const token = localStorage.getItem("token");
        if (token) {

            // Si existe el token hacer peticion para traer planes relacionados al perfil
            const decoded = jwtDecode(token);
            const idUsuario = decoded.idUsuario;
            const responseUser = await api.get(`usuarios/${idUsuario}/customer`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
                    }
                }
            );
            if (responseUser && responseUser.data && responseUser.data.length > 0) {
                idPerfil = responseUser.data[0].perfil.idPerfil;
            }
        }
            const endpoint = idPerfil
                ? `/suscripciones/planes/tipoPerfil/${idPerfil}/activo`
                : `/suscripciones/planes/tipoPerfil/activo`;
            const response = await api.get(endpoint);
            console.log(response.data);
            if (!response.data) {
                throw new Error("No se recibieron datos de la API.");
            }
            // Usar la función de utils para formatear los datos antes de devolverlos
            return formatPerfilPlanData(response.data);
        
    } catch (error) {
        handleTokenExpiration(error);
        // Si el error es debido al token expirado o usuario no encontrado, hacer una petición alternativa
        const responseFallback = await api.get('/suscripciones/planes/tipoPerfil/activo');

        if (!responseFallback.data) {
            throw new Error("No se recibieron datos de la API (ruta alternativa).");
        }

        // Devolver los datos de la ruta alternativa
        return formatPerfilPlanData(responseFallback.data);
    }
}

// Generar la suscripción gratuita
const generarSuscripcionGratuita = async (selectedPlan) => {
    /* Enviar solicitud al backend para generar la suscripcion 
    (este valida que si sea gratuito y que el precio coincida con el plan)
    */
    const { idPlan, idPrecioPlan } = selectedPlan;
    try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const idUsuario = decoded.idUsuario;
        const endpoint = '/suscripciones/suscripcion/gratuita'
        const response = await api.post(endpoint,
            {
                metadata: { // Agrupar los datos
                    idPlan,
                    idPrecioPlan,
                    idUsuario
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
                }
            }
        );

        console.log(response);
        // Redirigir según el código de estado
        if (response.status === 201) {
            alert("suscripción generada exitosamente.");
            window.location.href = `${window.location.origin}`;
        }
    } catch (error) {
        if (error.response) {
            // Errores devueltos por el backend
            const { message } = error.response.data.error;
            alert(message);
        } else {
            // Errores de red u otros problemas
            console.error("Error en el login:", error);
        }
    }
}

export default {
    getPlanesActivosPerfil,
    generarSuscripcionGratuita
};

