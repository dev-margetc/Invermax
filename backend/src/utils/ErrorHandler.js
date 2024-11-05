// Maneja las excepciones para retornar un mensaje

const ErrorNegocio = require('./errores/ErrorNegocio');
const mensajesInmueble = require('./mensajesError/ErrorInmueble');
const mensajesComunes = require('./mensajesError/ErrorComun');

// Map con los errores
const errorMessagesMap = {
    inmuebles: mensajesInmueble
};

//Manejar el texto de los errores tomando el error y el modulo del que se originó
const handleSequelizeErrors = (error, modulo) => {

    // Si el error es de tipo ErrorNegocio muestra el mensaje
    if (error instanceof ErrorNegocio) {
        return error.message;
    }

    // Toma los mensajes de error del modulo seleccionado
    const mensajesModulo = errorMessagesMap[modulo] || {};

    // Error de llaves unicas

    if (error.name === 'SequelizeUniqueConstraintError') {
        const campo = error.errors[0].path;
        // Se busca el tipo de error y el campo, de no encontrarse se usa el de errores comunes
        return mensajesModulo.uniqueConstraint?.[campo] || mensajesComunes.uniqueConstraint + " - " + campo;
    }

    // Si el error es de validacion
    if (error.name === 'SequelizeValidationError') {
        const campo = error.errors[0].path;

        // Error de null
        if (error.errors[0].type === 'notNull Violation') {
            return mensajesModulo.notNullViolation?.[campo] || `El campo ${campo} es obligatorio.`;
        }
    }

    // Error de relaciones entre llaves
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        // Se busca el campo causante del error usando su indice o el de error.fields
        const campoBD = error.fields[0];
        return mensajesModulo.foreignKeyConstraint?.[campoBD] || mensajesComunes.foreignKeyConstraint + " - " + campoBD;
    }


    return mensajesComunes.validationError; // Mensaje genérico si no hay campos inválidos
}


// metodo que permite asignar un status a un error especifico. Se llama desde los controllers
const handleControllerError = (res, error, moduleName) => {

    // Verificar si el error es una instancia de ErrorNegocio
    if (error instanceof ErrorNegocio) {
        return res.status(error.statusCode).json({
            error: {
                message: error.message,
                type: error.type || 'UNKNOWN', // UNKNOWN como tipo por defecto
            },
        });
    }

    const mensajeError = handleSequelizeErrors(error, moduleName);

    if (error.name === 'SequelizeValidationError') {
        return res.status(422).json({ error: {message: mensajeError} }); // 422 para errores de validación
    }

    if (error.name === 'SequelizeForeignKeyConstraintError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({  error: {message: mensajeError} }); // 409 para conflictos de claves
    }



    // Manejo de otros tipos de errores
    return res.status(500).json({ error: "Error interno del servidor" }); // 500 para errores no manejados
};

module.exports = {
    handleSequelizeErrors,
    handleControllerError
};
