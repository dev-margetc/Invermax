import { api } from "../api";
import { jwtDecode } from "jwt-decode";
import { formatPerfilPlanData } from "./PlanUtils";

// Traer los planes activos segun un perfil o todos si no se inició sesión
const getPlanesActivosPerfil = async () => {

    const token = localStorage.getItem("token");
    let idPerfil;
    if (token) {
        // Decodificar el token y obtener el tipo
        const decoded = jwtDecode(token);
        const idUsuario = decoded.idUsuario;
        const responseUser = await api.get(`usuarios/${idUsuario}/customer`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
                }
            }
        );
        console.log(responseUser)
        idPerfil = await responseUser.data[0].perfil.idPerfil;
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

        // Redirigir según el código de estado
        if (response.status === 200) {
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

