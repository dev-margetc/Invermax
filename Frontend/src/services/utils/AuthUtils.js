// utils/authUtils.js
export const handleTokenExpiration = (error) => {
    // Verificar si el error es debido a que el token expiró
    if (error.response && error.response.status === 500 && error.response.data.error.message.includes("expiró")) {
      alert("Token expirado. Inicie sesión nuevamente.");
      
      // Eliminar el token
      localStorage.removeItem("token");
  
      return true; // Significa que el token expiró y se manejó correctamente
    }
    return false; // No es un error relacionado con la expiración del token
  };
  