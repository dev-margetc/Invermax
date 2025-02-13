import React from "react";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.alertBox}>
        <h3 style={styles.title}>⚠️ Acceso Denegado</h3>
        <p style={styles.message}>{message}</p>
        <button style={styles.button} onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

// ✅ Definimos los estilos en el mismo archivo
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)", // Fondo oscuro con transparencia
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  alertBox: {
    background: "white", // Fondo blanco
    color: "black", // Texto negro
    border: "2px solid red", // Borde rojo
    padding: "20px",
    textAlign: "center",
    width: "300px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "red", // Título en rojo
    marginBottom: "10px",
  },
  message: {
    marginBottom: "15px",
  },
  button: {
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  buttonHover: {
    background: "darkred",
  },
};

export default CustomAlert;
