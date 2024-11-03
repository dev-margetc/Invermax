// Mensajes especificos para el modulo inmuebles
const mensajesInmueble = {

    // Tipo de error y el campo que lo causó
    uniqueConstraint: {
        codigo_inmueble: "Ya existe el código de inmueble en el sistema.",
    },
    foreignKeyConstraint: {
        id_customer: "El id del usuario no puede asignarse",
    }

};

module.exports = mensajesInmueble;