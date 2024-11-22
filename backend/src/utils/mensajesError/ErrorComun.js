// Errores comunes y generales de la aplicacion
const commonErrorMessages = {
    validationError: "Algunos campos son inválidos o faltan datos.",
    foreignKeyConstraint: "La referencia a una clave foránea no es válida.",
    uniqueConstraint: "Existe un valor que debe ser unico y ya existe en la base de datos."
};

module.exports = commonErrorMessages;