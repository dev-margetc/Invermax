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
const traerDestacados = async (condiciones = null, whereInmueble = null, atributosInmueble = null) => {
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
            attributes: atributos ? atributos : undefined, // Si no hay atributos, se deja undefined
            //Incluir los detalles
            include:[
                {
                    model: DetalleInmueble,
                    as: "detalles",
                    attributes: ["parqueadero", "amoblado",]
                  },
                  { // Incluir el tipo
                    model: TipoInmueble,
                    as: "tipoInmueble",
                    attributes: ["tipoInmueble"]
                  },
                  // Incluir zonas
                  {
                    model: Zona,
                    as: "zonas",
                    attributes: ['idZona'],
                    through: { attributes: [] }, // Excluir los atributos de la tabla pivote
                  },
                  // Incluir el customer
                  {
                    model: Customer,
                    as: "customer",
                    attributes: ['nombreCustomer']
                  },
                  {
                    as: 'ciudad', // Se usa el alias definido en la relacion
                    model: Ciudad,
                    attributes: ['nombreCiudad'], // Traer solo el nombre de la ciudad
                  }
            ]
        }
        : null;

    try {
        let destacados = await InmuebleDestacado.findAll({
            where: filtro,
            attributes:{
                exclude:["id_inmueble","fechaInicio","estadoDestacado","id_destacado"]
            },
            include: includeInmueble  ? [includeInmueble] : [] // Agregar el include si existe
        })

        return destacados;
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
        InmuebleDestacado.update(datos,{
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
