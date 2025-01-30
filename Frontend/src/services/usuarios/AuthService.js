import { api } from "../api";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";

const TOKEN_KEY = "token"; // Clave del token en localStorage

const AuthService = {
    /**
   * Obtiene el token almacenado en localStorage
   * @returns {string|null} Token o null si no existe
   */
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Guarda el token en localStorage
     * @param {string} token - Token de autenticación
     */
    setToken: (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    /**
     * Elimina el token y cierra sesión
     */
    logout: async() => {
        const token = AuthService.getToken(); // Obtiene el token de localStorage
        console.log(token);
        if (token) {
            await api.post("/usuarios/logout", {}, { // Configuración de headers
                headers: { Authorization: `Bearer ${token}` },
            });
        }

        await signOut(auth); // Cierra la sesión en Firebase
        //Eliminar el token del storage
        localStorage.removeItem(TOKEN_KEY);

        window.location.href = "/"; // Redirigir al home
    },

    /**
     * Verifica si el usuario tiene una sesión activa
     * @returns {Promise<boolean>} Devuelve `true` si el token es válido, `false` si expiró o es inválido
     */
    checkAuth: async () => {
        const token = AuthService.getToken();
        if (!token) return false;

        try {
            const response = await api.get("/usuarios/validar", {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data.valid; // Devuelve true si el token es válido
        } catch (err) {
           console.log(err);
            return false;
        }
    },
};

export default AuthService;
