import { api } from "../api";
import { jwtDecode } from "jwt-decode";
import AuthService from "./AuthService";

// Traer el usuario activo
const getUsuarioActivo = async () => {

    const token = localStorage.getItem("token");
    try {
        if (token) {
            // Decodificar el token y obtener el tipo
            const decoded = jwtDecode(token);
            const idUsuario = decoded.idUsuario;
            const tipoUsuario = decoded.tipoUsuario;
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

// Traer datos necesarios para la creación de un inmueble
const verificarAutenticacion = async (arrayTipoUsuario) => {
    // Traer el token
    const token = await AuthService.getToken();



    try {

        if (token) {
            const endpoint = '/usuarios/validar';
        
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
            console.log(response.data);



            const decoded = jwtDecode(token);
            const idUsuario = decoded.idUsuario;
            const tipoUsuario = decoded.tipoUsuario;
            console.log(tipoUsuario);

            if (!arrayTipoUsuario.includes(tipoUsuario)) {
              
                return false;
            }

            if(!response.data.valid){
                return false;
            }
                


            return data;
        } else {
            alert("Inicie sesión para poder ver esto.");
        }
    } catch (err) {
        console.log(err);
    }
}

export default {
    getUsuarioActivo,
    verificarAutenticacion
}