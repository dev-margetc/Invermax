/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const Inmueble = require("../entities/Inmueble");
const inmuebleRepository = require("../repositories/InmuebleRepository");
const AscensoRepository = require("../../suscripciones/repositories/AscensoRepository");
const SuscripcionRepo = require("../../suscripciones/repositories/SuscripcionRepository");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const DetalleInmueble = require("../entities/DetalleInmueble");

// traer publicados
const getPublicados = async (datos) => {
    try {
        const {
            estadoInmueble,
            modalidad,
            codCiudad,
            montoMaximo,
            habitacionesMinimas,
            bañosMinimos,
            parqueadero,
            amoblado,
            zonas,
            idTipoInmueble,
            idCustomer
        } = datos;

        const filtrosAvanzados = {};
        if (idCustomer) filtrosAvanzados["idCustomer"] = idCustomer;
        if (estadoInmueble) filtrosAvanzados.estadoInmueble = estadoInmueble;
        if (modalidad) filtrosAvanzados.modalidad = modalidad;
        if (codCiudad) filtrosAvanzados.codCiudad = codCiudad;
        if (idTipoInmueble) filtrosAvanzados["id_tipo_Inmueble"] = idTipoInmueble;
        if (montoMaximo) filtrosAvanzados["valorMaximoDetalles"] = montoMaximo;
        if (habitacionesMinimas) filtrosAvanzados["cantidadMinHabitaciones"] = habitacionesMinimas;
        if (bañosMinimos) filtrosAvanzados["cantidadMinBaños"] = bañosMinimos;

        // Filtrar parqueadero y amoblado en los detalles
        if (parqueadero) filtrosAvanzados["$detalles.parqueadero$"] = parqueadero;

        if (amoblado) filtrosAvanzados["$detalles.amoblado$"] = amoblado;

        console.log(Object.keys(filtrosAvanzados));
        // Obtener inmuebles aplicando filtros directamente en la base de datos
        const resultado = await inmuebleRepository.getPublicados(filtrosAvanzados);
        // Verificar zonas
        if (zonas) {
            let resultadoFiltrado = resultado.filter((dato) => {
                return tieneZonas(dato.zonas, zonas);
            })
            return resultadoFiltrado;
        }
        return resultado;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Función auxiliar para saber si hay coincidencias en detalles de un campo especifico
const verificarCoincidencia = (detalles, campo, valor) => {
    let coincidencia = detalles.length > 0 && detalles.some(detalle => detalle[campo] == valor);
    return coincidencia;
};

// Función auxiliar para verificar zonas
const tieneZonas = (zonasInmueble, zonas) => {
    if (zonasInmueble.length === 0) return false; // Si no hay zonas en el inmueble, no coincide
    const zonasArray = Array.isArray(zonas) ? zonas : [zonas]; // Asegurarse de que sea un array
    const idZonasInmueble = zonasInmueble.map(zona => zona.idZona); // un array con solo id de zonas
    return zonasArray.every(zona => idZonasInmueble.includes(Number(zona))); // Verificar que todas las zonas del filtro estén en la del inmueble
};

// Traer inmuebles de un usuario
const getInmueblesUsuario = async (datosCustomer) => {
    const { idCustomer } = datosCustomer;

    // Generar el código de los inmuebles destacados y en ascenso
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActivas = await SuscripcionRepo.getSuscripcionesPlan(condiciones);
    if (suscripcionesActivas.length == 0) {
        throw new ErrorNegocio("No cuenta con una suscripcion activa.");
    }
    let codigo = AscensoRepository.generarCodigoPeriodo(suscripcionesActivas[0].fechaInicioSuscripcion, suscripcionesActivas[0].idSuscripcion)

    if (idCustomer) {
        return inmuebleRepository.getInmueblesUsuario(idCustomer, codigo);
    } else {
        throw new ErrorNegocio("Customer no colocado");
    }
}

// Traer inmuebles usando un codigo
const getInmueblesCodigo = async (datos) => {
    const { codigo } = datos;

    if (codigo) {
        const inmuebles = await inmuebleRepository.getInmueblesCodigo(codigo);
        if (!inmuebles[0].idInmueble) {
            // Retornar una lista vacía si el id es null (no se encontró)
            return [];
        }
        return inmuebles;
    } else {
        return { error: true, message: "Codigo no colocado" };
    }

}

// Traer inmuebles usando el ID de la BD
const getInmuebleByID = async (datos) => {
    const { idInmueble } = datos;
    try {
        if (idInmueble) {
            return inmuebleRepository.getInmuebleByID(idInmueble);
        } else {
            throw new ErrorNegocio("ID inmueble no colocado");
        }
    } catch (error) {
        throw error;
    }
}

// Traer el customer de un inmueble dado su detalle o idInmueble
const traerCustomerInmueble = async (idDetalle = null, idInmueble = null) => {
    try {
        let inmueble;
        if (idDetalle) {
            const detalle = await DetalleInmueble.findByPk(idDetalle);
            if (detalle) {
                inmueble = await Inmueble.findByPk(detalle.idInmueble);
            }
        } else if (idInmueble) {
            inmueble = await Inmueble.findByPk(idInmueble);
        }

        if (!inmueble) {
            throw new ErrorNegocio("Inmueble no encontrado");
        }
        return inmueble.idCustomer;
    } catch (error) {
        throw error;
    }

}
module.exports = {
    getPublicados, getInmueblesUsuario, getInmueblesCodigo,
    getInmuebleByID, traerCustomerInmueble
}
