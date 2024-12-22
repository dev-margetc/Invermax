import React from "react";
import { auth, provider, signInWithPopup } from "../../services/Firebase";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Enviar el token al backend para validación
      const response = await fetch(`${backendUrl}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: idToken }),
      });

      if (response.ok) {
        //Colocar data
        const data = await response.json();
        const status = await response.status;
        const token = data.token;
        localStorage.setItem("token", token);

        // El codigo 200 (OK) indica que el usuario existe, se redirige a dashboard
        if (status == 200) {
          const redirectUrl = `${window.location.origin}`;
          window.location.href = redirectUrl;
        }
        // El codigo 201 indica que el usuario no existía pero se creó, se redirige a planes
        if (status == 201) {
          const redirectUrl = `${window.location.origin}/planes`;
          window.location.href = redirectUrl;
        }
      } else {
        const errorData = await response.json(); // El servidor debe enviar un cuerpo en formato JSON
        // El código 400 indica que el correo del usuario existía pero no con el UID proporcionado
        alert(errorData.error.message);
      }
    } catch (error) {
      console.error("Error en el login:", error);
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
