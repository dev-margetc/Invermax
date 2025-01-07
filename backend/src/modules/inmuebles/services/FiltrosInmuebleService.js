/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const Inmueble = require("../entities/Inmueble");
const inmuebleRepository = require("../repositories/InmuebleRepository");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const DetalleInmueble = require("../entities/DetalleInmueble");



// Traer publicados
const getPublicados = async (datos) => {
    try {
        const {
            estadoInmueble, // categoria: nuevo o usado
            modalidad, // compra o arriendo
            codCiudad,
            montoMaximo,
            habitacionesMinimas, // se usará un == 
            bañosMinimos, // se usará un ==
            parqueadero, // se usará un ==
            amoblado, // se usará un ==
            zonas,
            idTipoInmueble, // Usar un ==
            idCustomer
        } = datos;
        // Construir el objeto de filtros
        // Por las multiples consultas a la BD en el metodo del repository el filtro se aplica aca
        resultado = await inmuebleRepository.getPublicados();
        // filtrar la lista
        resultadoFiltrado = resultado.filter((dato) => {
            /* 
                Dato es un registro de la vista VistaInmueblesPublicados
                Los datos que trae directamente de la vista se acceden por medio de 'dato.nombre_campo'

                Los datos que se incluyan por medio de un modelo sequelize se traen como 'dato.inmueble.dataValues.campo'
                - Si el modelo incluido a su vez involucra otro modelo se llama asi: 'dato.inmueble.dataValues.modelo.campo'
            */

            // Datos del modelo inmueble generado
            const inmuebleData = dato.inmueble.dataValues;

            // Filtrar por idCustomer
            if (idCustomer && inmuebleData.customer.idCustomer!= idCustomer) return false;

            // estado
            if (estadoInmueble && dato.estadoInmueble !== estadoInmueble) return false;

            if (modalidad && dato.modalidad !== modalidad) return false;

            // La ciudad llegará como id
            if (codCiudad && dato.codCiudad != codCiudad) return false;

            // El tipo de inmueble llegará como id
            if (idTipoInmueble && dato.inmueble.tipoInmueble.idTipoInmueble != idTipoInmueble) return false;

            // Se quita si el montoMaximo es menor al valor mas bajo de los detalles del inmueble
            if (montoMaximo && parseFloat(inmuebleData.valorMinimoDetalles) >= parseFloat(montoMaximo)) return false;

            // El filtro tiene habitaciones minimas, por lo que se quita un inmueble si tiene menos
            if (habitacionesMinimas && inmuebleData.cantidadMinHabitaciones < Number(habitacionesMinimas)) return false;//Quitar ;

            // Se quita si la cantidad de baños del detalle es menor a la del filtro de baños minimos
            if (bañosMinimos && inmuebleData.cantidadMinBaños < bañosMinimos) return false;


            if (parqueadero) {
                if (!verificarCoincidencia(inmuebleData.detalles, 'parqueadero', (parqueadero))) return false;
            }

            // Se quita si amoblado no coincide
            // Se quita si el parqueadero de ningun detalle coincide

            if (amoblado) {
                if (!verificarCoincidencia(inmuebleData.detalles, 'amoblado', (amoblado))) return false;
            }


            // Verificar zonas
            if (zonas) {
                if (!tieneZonas(inmuebleData.zonas, zonas)) return false;
            }
            return true;
        });

        return resultadoFiltrado;
    } catch (error) {
        console.log(error);
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
    const idZonasInmueble = zonasInmueble.map(zona => zona.dataValues.idZona); // un array con solo id de zonas
    return zonasArray.every(zona => idZonasInmueble.includes(Number(zona))); // Verificar que todas las zonas del filtro estén en la del inmueble
};

// Traer inmuebles de un usuario
const getInmueblesUsuario = async (datos) => {
    const { idCustomer } = datos;
    if (idCustomer) {
        return inmuebleRepository.getInmueblesUsuario(idCustomer);
    } else {
        throw new ErrorNegocio("Customer no colocado");
    }
}

// Traer inmuebles usando un codigo
const getInmueblesCodigo = async (datos) => {
    const { codigo } = datos;

    if (codigo) {
        const inmuebles = await inmuebleRepository.getInmueblesCodigo(codigo);
        if(!inmuebles[0].idInmueble){
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
