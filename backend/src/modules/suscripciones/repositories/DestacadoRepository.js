// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Inmueble = require("../../inmuebles/entities/Inmueble");
const DetalleInmueble = require("../../inmuebles/entities/DetalleInmueble");

const TipoInmueble = require("../../inmuebles/entities/TipoInmueble");
const Zona = require("../../inmuebles/entities/Zona");
const Customer = require("../../usuarios/entities/Customer");
const InmuebleDestacado = require("../entities/InmuebleDestacado");
const Ciudad = require("../../inmuebles/entities/Ciudad");


/* Metodos SELECT */

// Traer todos los destacados con informacion de inmueble, se pueden especificar condiciones
const traerDestacados = async (condicionesDestacado = null, whereInmueble = null, atributosInmueble = null) => {
    try {
        // Includes para consultas sencillas
        const includes = [
            {
                model: InmuebleDestacado,
                as: "inmueblesDestacados",
                attributes: ["idDestacado", "fechaInicio", "estadoDestacado", "tiempoAcumulado", "codigoPeriodo", "idInmueble"],
                where: { ...condicionesDestacado }, // Filtrar los que están activos
                required: true // Asegura que solo se traen inmuebles con destacados activos
            },
            {
                model: Customer,
                as: "customer",
                attributes: ['nombreCustomer']
            }
        ];
        // Si se necesita informacion del inmueble se agregan los demas include
        if (atributosInmueble) {
            includes.push(
                {
                    model: DetalleInmueble,
                    as: "detalles",
                    attributes: ["parqueadero", "amoblado"]
                },
                {
                    model: TipoInmueble,
                    as: "tipoInmueble",
                    attributes: ["tipoInmueble"]
                },
                {
                    model: Zona,
                    as: "zonas",
                    attributes: ['idZona'],
                    through: { attributes: [] } // Excluir los atributos de la tabla pivote
                },
                {
                    as: 'ciudad',
                    model: Ciudad,
                    attributes: ['nombreCiudad']
                }
            )
        }
        return await Inmueble.findAll({
            attributes: atributosInmueble
                ? { include: atributosInmueble }
                : { exclude: ['idCustomer', 'codigoCiudad', 'idTipoInmueble'] }, // Excluir algunos atributos por defecto
            where: whereInmueble, // Filtro para inmuebles

            include: includes,
            group: ['idInmueble']
        });
    } catch (err) {
        throw err;
    }
}

// Generar el codigo para el destacado
function generarCodigoPeriodo(fechaInicioSuscripcion, idSuscripcion) {
    const fechaActual = new Date(); // Fecha actual
    const inicioSuscripcion = new Date(fechaInicioSuscripcion); // Fecha de inicio de la suscripción

    const mesesTranscurridos =
        (fechaActual.getFullYear() - inicioSuscripcion.getFullYear()) * 12 +
        fechaActual.getMonth() - inicioSuscripcion.getMonth() + 1; // +1 porque el primer mes cuenta como 1

    // Retorna el código (idSuscripcion-mes)
    return `${idSuscripcion}-${mesesTranscurridos}`;
}



/* Metodos INSERT */

//Metodos insercion
const insertarDestacado = async (datos) => {
    try {
        await InmuebleDestacado.create({
            ...datos,
        })
    } catch (err) {
        throw err;
    }
}

/* Metodos UPDATE*/

//Metodo actualizacion
const modificarDestacado = async (datos, idDestacado) => {
    try {
        InmuebleDestacado.update(datos, {
            where: {
                "idDestacado": idDestacado
            }
        }
        )
    } catch (err) {
        throw err;
    }
}

module.exports = {
    traerDestacados,
    insertarDestacado,
    modificarDestacado,
    generarCodigoPeriodo
}
