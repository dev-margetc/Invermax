 // Clase de error personalizada para lógica de negocio
 class ErrorNegocio extends Error {
    constructor(message, type = 'BUSINESS_LOGIC', status=400) {
        super(message);
        this.name = this.constructor.name; // Nombre de la clase de error
        this.type = type; // Tipo de error personalizado
        this.statusCode = status;
    }
}

module.exports = ErrorNegocio;