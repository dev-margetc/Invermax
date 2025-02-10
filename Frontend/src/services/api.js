import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "skip-browser-warning"
  },
});

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la devuelve
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401 || response.status === 403) {
        alert(response.data.error.message);  // Muestra el mensaje de error
        
        // Elimina el token si el error es 401 (token expirado o inválido)
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/"; // Redirigir al home o login
        }
    
        // Si es error 403 (sin permisos), redirigir a una página específica de permisos
        else if (response.status === 403) {
            window.location.href = "/planes"; // Redirigir a la página de la interna
        }
    }
    } else {
      console.error("Error sin respuesta del servidor:", error.message);
    }
    // Manejo de errores global
    return Promise.reject(error);
  }
);
