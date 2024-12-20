// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Inmueble = require("../../inmuebles/entities/Inmueble");

const InmuebleAscenso = require("../entities/InmuebleAscenso");


/* Metodos SELECT */

// Traer todos los inmuebles en ascenso con informacion de inmueble, se pueden especificar condiciones
const traerInmueblesAscenso = async (condiciones = null, whereInmueble = null, atributosInmueble = null) => {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra

    // Si atributosInmueble existe, construir el filtro de atributos
    let atributos;
    if(atributosInmueble){
        atributos = {
            include: [
                ...atributosInmueble, // Atributos adicionales especificados
            ],
            exclude: ['id_customer', 'idCustomer', 'codigoCiudad', 'cod_ciudad', 'idTipoInmueble', 'id_tipo_inmueble'] // Exclusiones    
        }
    }

    // Construir include dinámico para inmueble
    const includeInmueble = whereInmueble || atributos // Si where o atributos existe
        ? {
            model: Inmueble,
            as: "inmueble",
            where: whereInmueble || undefined, // Solo aplica el where si existe
            attributes: atributos ? atributos : undefined // Si no hay atributos, se deja undefined
        }
        : null;

    try {
        let inmueblesAscenso = await InmuebleAscenso.findAll({
            where: filtro,
            attributes:{
                exclude:["id_inmueble"]
            },
            include: includeInmueble  ? [includeInmueble] : [] // Agregar el include si existe
        })

        return inmueblesAscenso;
    } catch (err) {
        throw err;
    }
}

// Generar el codigo para el ascendido
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
const insertarInmuebleAscenso = async (datos) => {
    try {
        await InmuebleAscenso.create({
            ...datos,
        })
    } catch (err) {
        throw err;
    }
}

/* Metodos UPDATE*/

//Metodo actualizacion
const modificarAscenso = async (datos, idInmuebleAscenso) => {
    try {
        InmuebleAscenso.update(datos,{
            where: {
                "idAscenso": idInmuebleAscenso
            }
        }
    )
    } catch (err) {
        throw err;
    }
}

module.exports = {
    traerInmueblesAscenso,
    insertarInmuebleAscenso,
    generarCodigoPeriodo,
    modificarAscenso
}
