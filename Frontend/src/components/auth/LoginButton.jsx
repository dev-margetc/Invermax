import React from "react";
import {api} from "../../services/api";
import { auth, provider, signInWithPopup } from "../../services/Firebase/Firebase";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Enviar el token al backend para validación
      const response = await api.post("/usuarios/login", { idToken });

      const { token } = response.data;

      // Guardar token en el almacenamiento local
      localStorage.setItem("token", token);

      // Redirigir según el código de estado
      if (response.status === 200) {
        window.location.href = `${window.location.origin}`;
      } else if (response.status === 201) {
        window.location.href = `${window.location.origin}/planes`;
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
  };

  return (
    <a className="nav-link menus" onClick={handleLogin} href="#">
      <img
        src="/img/icons/fa-icon-user.svg"
        alt="icon-ingresar"
        loading="lazy"
      />
      <span className="ingresar-text">Ingresar</span>
    </a>
  );
};

export default LoginButton;
