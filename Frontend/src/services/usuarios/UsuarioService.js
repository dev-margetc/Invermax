import { api } from "../api";
import { jwtDecode } from "jwt-decode";

// Traer el usuario activo
const getUsuarioActivo = async () => {

    const token = localStorage.getItem("token");
    try {
        if (token) {
            // Decodificar el token y obtener el tipo
            const decoded = jwtDecode(token);
            const idUsuario = decoded.idUsuario;
            const responseUser = await api.get(`usuarios/${idUsuario}/customer`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
                }
            }
            );
            return responseUser.data[0];
        }
    } catch (error) {
        if(error.response.status == 400){
            return null;
        }else{
            console.error("Error solicitando los planes:", error);
            return null; // Retornar null en caso de error para evitar continuar el flujo
        }     
    }
}

export default {
    getUsuarioActivo
}