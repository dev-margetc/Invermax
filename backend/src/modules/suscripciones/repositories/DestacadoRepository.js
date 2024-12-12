// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Inmueble = require("../../inmuebles/entities/Inmueble");

const InmuebleDestacado = require("../entities/InmuebleDestacado");


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
            attributes: atributos ? atributos : undefined // Si no hay atributos, se deja undefined
        }
        : null;

    try {
        let destacados = await InmuebleDestacado.findAll({
            where: filtro,
            attributes:{
                exclude:["id_inmueble"]
            },
            include: includeInmueble  ? [includeInmueble] : [] // Agregar el include si existe
        })

        return destacados;
    } catch (err) {
        throw err;
    }
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
    console.log(datos);
    console.log(idDestacado);
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
    modificarDestacado
}
