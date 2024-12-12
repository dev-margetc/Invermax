/*
Servicio que se encarga de verificar que las suscripciones sean validas para acciones
Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios
*/

const customerRepo = require("../../usuarios/repositories/CustomerRepository");
const planRepo = require("../repositories/PlanRepository");
const suscripcionRepo = require("../repositories/SuscripcionRepository");

/* Metodos GET*/

// Verifica que un customer pueda crear un inmueble mas dado su plan ACTIVO
const verificarInmueblesCreacion = async(idCustomer) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Traer el plan con sus caracteristicas*/

    /* Traer la caracteristica de inmuebles que se pueden crear */

    /* Contar la cantidad de inmuebles que tiene el customer */

    /* Verificar que la cantidad no sea mayor o igual */

    // Si es mayor o igual lanzar un error, si no, no pasa nada

}

// Verifica que se le puedan asignar mas fotos a un detalle o tipo de inmueble
const verificarFotoDetalle = async(idCustomer, idDetalle) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Traer el plan con sus caracteristicas*/

    /* Traer la caracteristica de fotos de inmuebles */

    /* Traer la cantidad de fotos que tiene el detalle */

    /* Verificar que la cantidad no sea mayor o igual */

    // Si es mayor o igual lanzar un error, si no, no pasa nada

}

// Verifica que se le puedan asignar mas videos a un detalle o tipo de inmueble
const verificarVideoDetalle = async(idCustomer, idDetalle) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Traer el plan con sus caracteristicas*/

    /* Traer la caracteristica de videos de inmuebles */

    /* Traer la cantidad de videos que tiene el detalle */
    
    /* Verificar que la cantidad no sea mayor o igual */

    // Si es mayor o igual lanzar un error, si no, no pasa nada

}

// Verifica si se puede colocar un inmueble como destacado
const verificarInmuebleDestacado = async(idCustomer) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Traer el plan con sus caracteristicas*/

    /* Traer la caracteristica de destacados */

}

// Verifica si se puede colocar un inmueble como destacado
const verificarInmuebleAscenso = async(idCustomer) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Traer el plan con sus caracteristicas*/

    /* Traer la caracteristica de ascenso */

}


/* Metodos PUT*/

// Reducir la cantidad de capacidad en un saldo 
const reducirCapacidadSaldo = async(idCustomer, claveCaracteristica, cantidadReducir) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = { idCustomer: idCustomer, estado: "activa" };
    let suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Buscar la caracteristica con su clave */

    /* Actualizar la cantidad de la capacidad*/

}

// Reiniciar capacidades de una caracteristica para todas las suscripciones activas
const reiniciarCapacidadSaldo = async(claveCaracteristica) =>{

    /* Traer la suscripcion activa del customer */
    let condiciones = {estado: "activa" };
    let suscripcionesActivas = await suscripcionRepo.getSuscripcionesFechaFin(cond);

    /* Buscar la caracteristica con su clave */

    
    /* Traer el plan y el valor de la caracteristica*/


    /* Actualizar la cantidad de la capacidad a la de la caracteristica*/

}