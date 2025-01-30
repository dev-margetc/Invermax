import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { auth } from "../../services/Firebase/Firebase";
import { signOut } from "firebase/auth";
import AuthService from "../../services/usuarios/AuthService";

const LogoutButton = ({setToken}) => {
    // Estado para almacenar el email decodificado
    const [email, setEmail] = useState(null);

    // Efecto para decodificar el token al cargar el componente
    useEffect(() => {
        // Obtener el token del almacenamiento local
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // Decodificar el token y obtener el email
                const decoded = jwtDecode(token);
                setEmail(decoded.email); // Suponiendo que el campo 'email' está en el payload del token
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }
        }
    }, []); // Se ejecuta solo al montar el componente

    // Manejar Logout
    const handleLogout = async () => {
        try {
            // Cerrar la sesion 
            await AuthService.logout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };


    return (
        <a className="nav-link menus" onClick={handleLogout} href="#">
            <img
                src="/img/icons/fa-icon-user.svg"
                alt="icon-ingresar"
                loading="lazy"
            />
            <span className="ingresar-text">
                Salir {email && `(${email})`} {/* Mostrar el email si está disponible */}
            </span>
        </a>
    );
};

export default LogoutButton;
