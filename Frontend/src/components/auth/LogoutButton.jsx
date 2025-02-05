import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { auth } from "../../services/Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthService from "../../services/usuarios/AuthService";

const LogoutButton = () => {
    // Estado para almacenar el email decodificado
    const [email, setEmail] = useState(null);

    const [name, setName] = useState(null);
    // Efecto para decodificar el token al cargar el componente
    useEffect(() => {
        const fetchUser = async () => {
            // Obtener el token del almacenamiento local
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            setName(user.displayName);
                            setEmail(user.email);
                        } else {
                            setName(null);
                            setEmail(null);
                        }
                    });

                    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonta

                } catch (error) {
                    console.error("Error al decodificar el token o obtener el usuario", error);
                }
            }
        };

        fetchUser(); // Llamar la función asíncrona dentro del useEffect
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
        <button className="btn btn-secondary ms-2" onClick={handleLogout} style={{ color: 'red', background: 'none', border: "none" }}>
            <i className="fas fa-sign-out"></i> Cerrar Sesión {name && `(${name})`}
        </button>
    );
};

export default LogoutButton;
