import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la devuelve
  (error) => {
    // Manejo de errores global
    console.error("Error en la petición:", error);
    return Promise.reject(error);
  }
);
