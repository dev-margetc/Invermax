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

/* Metodos GET*/

// Verifica que un customer pueda crear un inmueble mas dado su plan ACTIVO
const verificarInmueblesCreacion = async (idCustomer) => {
    try {
        /* Traer la suscripcion activa  del customer y el precioPlan asociado*/
        let condicionesSuscripcion = { idCustomer: idCustomer, estado: "activa" };
        let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condicionesSuscripcion);

        if (suscripcionesActivas.length <= 0) {
            throw new ErrorNegocio("El usuario no tiene suscripciones que le permitan realizar esta acción");
        }

        /* Traer el plan asociado a la suscripcion activa*/
        let precioPlanActivo = suscripcionesActivas[0].precioPlan;
        let idPlan = precioPlanActivo.plan.idPlan;

        /* Traer la cantidad de inmuebles que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idPlan, "inmuebles_creados");

        /* Contar la cantidad de inmuebles que tiene el customer */
        let inmueblesCustomer = await inmueblesRepo.getInmueblesUsuario(idCustomer);

        /* Verificar que la cantidad actual no sea mayor o igual */
        if (inmueblesCustomer.length >= cantidadMaxima) {

            // Si es mayor o igual lanzar un error, si no, no pasa nada
            throw new ErrorNegocio("Has alcanzado el limite de " + cantidadMaxima + " inmuebles. Actualmente tiene "
                + inmueblesCustomer.length
            );
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
        /* Traer la suscripcion activa del customer */
        let condiciones = { idCustomer: idCustomer, estado: "activa" };
        let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);

        if (suscripcionesActivas.length <= 0) {
            throw new ErrorNegocio("El usuario no tiene suscripciones que le permitan realizar esta acción");
        }

        /* Traer el plan asociado a la suscripcion activa*/
        let precioPlanActivo = suscripcionesActivas[0].precioPlan;
        let idPlan = precioPlanActivo.plan.idPlan;

        /* Traer la cantidad de fotos que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idPlan, "fotos_tipo_inmueble");
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
        /* Traer la suscripcion activa del customer */
        let condiciones = { idCustomer: idCustomer, estado: "activa" };
        let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);

        if (suscripcionesActivas.length <= 0) {
            throw new ErrorNegocio("El usuario no tiene suscripciones que le permitan realizar esta acción");
        }

        /* Traer el plan asociado a la suscripcion activa*/
        let precioPlanActivo = suscripcionesActivas[0].precioPlan;
        let idPlan = precioPlanActivo.plan.idPlan;

        /* Traer la cantidad de videos que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idPlan, "videos_tipo_inmueble");
        /* Traer la cantidad de videos que tiene el detalle */
        let cantidadVideosActual = await detalleRepo.fotosDetalle(idDetalle);

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
        /* Traer la suscripcion activa del customer */
        let condiciones = { idCustomer: idCustomer, estado: "activa" };
        let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);
        if (suscripcionesActivas.length <= 0) {
            throw new ErrorNegocio("El usuario no tiene suscripciones que le permitan realizar esta acción");
        }
        /* Traer el plan con sus caracteristicas*/
        let precioPlanActivo = suscripcionesActivas[0].precioPlan;
        let idPlan = precioPlanActivo.plan.idPlan;

        /* Traer la cantidad de inmuebles destacados que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idPlan, "inmuebles_destacados");

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
        /* Traer la suscripcion activa del customer */
        let condiciones = { idCustomer: idCustomer, estado: "activa" };
        let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);
        if (suscripcionesActivas.length <= 0) {
            throw new ErrorNegocio("El usuario no tiene suscripciones que le permitan realizar esta acción");
        }
        /* Traer el plan con sus caracteristicas*/
        let precioPlanActivo = suscripcionesActivas[0].precioPlan;
        let idPlan = precioPlanActivo.plan.idPlan;

        /* Traer la cantidad de inmuebles en ascenso que puede crear segun su plan activo*/
        let cantidadMaxima = await getValorCaracteristica(idPlan, "inmuebles_ascenso");

        // Generar el código para la búsqueda teniendo en cuenta el id de suscripcion
        let codigo = ascensoRepo.generarCodigoPeriodo(suscripcionesActivas[0].fechaInicioSuscripcion, suscripcionesActivas[0].idSuscripcion)


        /* Trae la cantidad de inmuebles que ha subido con el código del mes actual y la suscripcion activa*/
        let ascensosMes = await ascensoRepo.traerInmueblesAscenso({ codigoPeriodo: codigo });
        /* Verificar que la cantidad actual no sea mayor o igual */
        if (ascensosMes.length >= cantidadMaxima) {
            // Si es mayor o igual lanzar un error, si no, no pasa nada
            throw new ErrorNegocio("Tu plan no permite colocar mas de " + cantidadMaxima + " inmuebles en ascenso. Actualmente tiene "
                + destacadosMes.length
            );
        }
        return true;
    } catch (err) {
        throw err;
    }
}


// Verifica la caracteristica que tiene un usuario para colocar un iFrame en un inmueble
const verificarUsoIFrame = async (idCustomer) => {
    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);
    /* Traer el plan con sus caracteristicas*/
    let precioPlanActivo = suscripcionesActivas[0].precioPlan;
    let idPlan = precioPlanActivo.plan.idPlan;
    if (suscripcionesActivas.length <= 0) {
        throw new ErrorNegocio("El usuario no tiene suscripciones que le permitan realizar esta acción");
    }
    /* Traer el valor de iFrame que puede usar segun su plan activo*/
    let valor = await getValorCaracteristica(idPlan, "uso_iframe");
    if (!valor || valor == 0) {
        throw new ErrorNegocio("El plan no le permite hacer uso de la caracteristica de IFrame");
    }
    return true;
}
// Traer el valor de una caracteristica dada la clave de la caracteristica y el id del plan
const getValorCaracteristica = async (idPlan, claveCaracteristica) => {
    /* Traer el plan con sus caracteristicas*/
    let condicionesPlan = { idPlan: idPlan }
    const planData = await planRepo.getAllPlanes(condicionesPlan);

    /* Traer la caracteristica de inmuebles que se pueden crear */
    let caracteristicasPlan = planData[0].caracteristicasPlanes;

    // Filtrar los elementos donde caracteristica.clave sea igual a la de la clave dada
    let caracteristicaFiltrada = caracteristicasPlan.filter(
        caracteristicaPlan => caracteristicaPlan.caracteristica?.claveCaracteristica == claveCaracteristica
    );

    // Retornar el valor de la caracteristica
    if (caracteristicaFiltrada.length == 0) {
        throw new ErrorNegocio("El plan no le permite hacer uso de esta caracteristica.");
    } else {
        return caracteristicaFiltrada[0].valorCaracteristica;
    }

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