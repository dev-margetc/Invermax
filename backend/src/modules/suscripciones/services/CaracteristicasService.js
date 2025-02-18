/*
Servicio que se encarga de verificar que las suscripciones sean validas para acciones
Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios
*/

const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const ascensoRepo = require("../repositories/AscensoRepository");
const detalleRepo = require("../../inmuebles/repositories/DetalleInmuebleRepository");
const destacadoRepo = require("../repositories/DestacadoRepository");
const inmueblesRepo = require("../../inmuebles/repositories/InmuebleRepository");
const planRepo = require("../repositories/PlanRepository");
const suscripcionRepo = require("../repositories/SuscripcionRepository");
const caracteristicaRepo = require("../repositories/CaracteristicaRepository");

/* Metodos GET*/

// Verifica que un customer pueda crear un inmueble mas dado su plan ACTIVO
const verificarInmueblesCreacion = async (idCustomer) => {
    try {
        /* Traer la cantidad de inmuebles que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idCustomer, "inmuebles_creados");

        /* Contar la cantidad de inmuebles que tiene el customer */
        let inmueblesCustomer = await inmueblesRepo.getInmueblesUsuario(idCustomer);

        /* Verificar que la cantidad actual no sea mayor o igual */

        if (inmueblesCustomer.length >= cantidadMaxima) {
            // Construir el mensaje base
            let mensajeBase = `Has alcanzado el límite de ${cantidadMaxima} inmuebles. Actualmente tienes ${inmueblesCustomer.length}.`;

            // Agregar un mensaje adicional si se excede el límite
            if (inmueblesCustomer.length > cantidadMaxima) {
                mensajeBase += " Borra los sobrantes antes de poder hacer esto.";
            }

            throw new ErrorNegocio(mensajeBase);
        }
        return true;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

// Verifica que se le puedan asignar mas fotos a un detalle o tipo de inmueble
const verificarFotoDetalle = async (idCustomer, idDetalle) => {
    try {
        /* Traer la cantidad de fotos que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idCustomer, "fotos_tipo_inmueble");
        /* Traer la cantidad de fotos que tiene el detalle */
        let cantidadFotosActual = await detalleRepo.fotosDetalle(idDetalle);

        /* Verificar que la cantidad actual no sea mayor o igual */
        if (cantidadFotosActual.length >= cantidadMaxima) {
            // Si es mayor o igual lanzar un error, si no, no pasa nada
            throw new ErrorNegocio("Tu plan no permite subir mas de " + cantidadMaxima + " fotos por tipo de inmueble. Actualmente tiene "
                + cantidadFotosActual.length
            );
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Verifica que se le puedan asignar mas videos a un detalle o tipo de inmueble
const verificarVideoDetalle = async (idCustomer, idDetalle) => {
    try {
        /* Traer la cantidad de videos que puede crear segun su plan activo*/
        console.log("verificando " + idCustomer);
        let cantidadMaxima = await getValorCaracteristica(idCustomer, "videos_tipo_inmueble");
        /* Traer la cantidad de videos que tiene el detalle */
        let cantidadVideosActual = await detalleRepo.videosDetalle(idDetalle);

        /* Verificar que la cantidad actual no sea mayor o igual */
        if (cantidadVideosActual.length >= cantidadMaxima) {
            // Si es mayor o igual lanzar un error, si no, no pasa nada
            throw new ErrorNegocio("Tu plan no permite subir mas de " + cantidadMaxima + " videos por tipo de inmueble. Actualmente tiene "
                + cantidadVideosActual.length
            );
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Verifica si se puede colocar un inmueble como destacado
const verificarInmuebleDestacado = async (idCustomer) => {
    try {
        /* Traer la cantidad de inmuebles destacados que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idCustomer, "inmuebles_destacados");

        
        /* Traer la suscripcion activa*/
        const suscripcionesActivas = await suscripcionRepo.getSuscripciones({
            estadoSuscripcion:"activa",
            idCustomer:idCustomer
        });

        // Generar el código para la búsqueda teniendo en cuenta el id de suscripcion
        let codigo = destacadoRepo.generarCodigoPeriodo(suscripcionesActivas[0].fechaInicioSuscripcion, suscripcionesActivas[0].idSuscripcion);


        /* Trae la cantidad de inmuebles que ha subido con el código del mes actual y la suscripcion activa*/
        let destacadosMes = await destacadoRepo.traerDestacados({ codigoPeriodo: codigo });
        /* Verificar que la cantidad actual no sea mayor o igual */
        if (destacadosMes.length >= cantidadMaxima) {

            // Si es mayor o igual lanzar un error, si no, no pasa nada
            throw new ErrorNegocio("Tu plan no permite colocar mas de " + cantidadMaxima + " inmuebles en destacados. Actualmente tiene "
                + destacadosMes.length
            );
        }
        return true;
    } catch (err) {
        throw err;
    }
}

// Verifica si se puede colocar un inmueble como destacado
const verificarInmuebleAscenso = async (idCustomer) => {
    try {
        /* Traer la cantidad de inmuebles en ascenso que puede crear segun su plan activo*/
        const cantidadMaxima = await getValorCaracteristica(idCustomer, "inmuebles_ascenso");

        /* Traer la suscripcion activa*/
        const suscripcionesActivas = await suscripcionRepo.getSuscripciones({
            estadoSuscripcion:"activa",
            idCustomer:idCustomer
        });

        // Generar el código para la búsqueda teniendo en cuenta el id de suscripcion
        let codigo = ascensoRepo.generarCodigoPeriodo(suscripcionesActivas[0].fechaInicioSuscripcion, suscripcionesActivas[0].idSuscripcion)


        /* Trae la cantidad de inmuebles que ha subido con el código del mes actual y la suscripcion activa*/
        let ascensosMes = await ascensoRepo.traerInmueblesAscenso({ codigoPeriodo: codigo });
        /* Verificar que la cantidad actual no sea mayor o igual */
        if (ascensosMes.length >= cantidadMaxima) {
            // Si es mayor o igual lanzar un error, si no, no pasa nada
            throw new ErrorNegocio("Tu plan no permite colocar mas de " + cantidadMaxima + " inmuebles en ascenso al mes. Actualmente tiene "
                + ascensosMes.length
            );
        }
        return true;
    } catch (err) {
        throw err;
    }
}


// Verifica la caracteristica que tiene un usuario para colocar un iFrame en un inmueble
const verificarUsoIFrame = async (idCustomer) => {
    /* Traer el valor de iFrame que puede usar segun su plan activo*/
    let valor = await getValorCaracteristica(idCustomer, "uso_iframe");
    if (!valor || valor == 0) {
        throw new ErrorNegocio("El plan no le permite hacer uso de la caracteristica de IFrame");
    }
    return true;
}

// Verifica la caracteristica que tiene un usuario para colocar un iFrame en un tipo de inmueble (detalleInmueble)
const verificarUsoIFrameRecorrido = async (idCustomer) => {
    /* Traer el valor de iFrame que puede usar segun su plan activo*/
    let valor = await getValorCaracteristica(idCustomer, "uso_iframe");
    if (!valor || valor == 0) {
        throw new ErrorNegocio("El plan no le permite hacer uso de la caracteristica de IFrame");
    }
    return true;
}
// Traer el valor de una caracteristica dada la clave de la caracteristica y el id del plan
const getValorCaracteristica = async (idCustomer, claveCaracteristica) => {

    /* Traer la capacidad asociada con la suscripcion activa del customer */
    const resultado = await caracteristicaRepo.obtenerCaracteristicaDisponible(idCustomer, claveCaracteristica);

    // Validar si existe la suscripción activa con la caracteristica
    if (!resultado) {
        // Si no existe verifica que la suscripcion esté activa
        let activa = await suscripcionRepo.getSuscripciones({ estadoSuscripcion: "activa", idCustomer: idCustomer });

        if (!activa || activa.length == 0) {
            throw new ErrorNegocio('El customer no tiene una suscripción activa.');
        }

        // Si existe una suscripción activa pero no tiene la característica
        const caracteristica = await caracteristicaRepo.obtenerCaracteristica({
            claveCaracteristica: claveCaracteristica,
        });

        return null;
    }
    // Retornar el resultado
    return resultado.saldosCaracteristicas[0].capacidadDisponible;
}

module.exports = {
    verificarInmueblesCreacion,
    verificarFotoDetalle,
    verificarVideoDetalle,
    verificarInmuebleDestacado,
    verificarInmuebleAscenso,
    verificarUsoIFrame,
    getValorCaracteristica
}