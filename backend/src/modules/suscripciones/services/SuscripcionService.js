/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");
const suscripcionRepository = require("../repositories/SuscripcionRepository");
const customerRepo = require("../../usuarios/repositories/CustomerRepository");
const caracteristicaRepo = require("../repositories/CaracteristicaRepository");
const planRepo = require("../repositories/PlanRepository");
const { Sequelize } = require("sequelize");
const inmuebleRepo = require("../../inmuebles/repositories/InmuebleRepository");
const { construirCondiciones } = require("../../../utils/utils");
const detalleInmuebleRepo = require("../../inmuebles/repositories/DetalleInmuebleRepository");
const PrecioPlan = require("../entities/PrecioPlan");

/* Metodos POST */
// Crear suscripcion Pago
const crearSuscripcionPagada = async (infoSuscripcion) => {
    try {
        /* Verificar si el customer no tiene suscripciones activas */

        let cond = { idCustomer: infoSuscripcion.customer.idCustomer, estado: "activa" };
        let suscripcionesActiva = await suscripcionRepository.getSuscripcionesFechaFin(cond);

        let suscripcionActiva = null;
        let ultimaPendiente = null;

        // Si tiene una suscripcion activa entonces la nueva se generará como pendiente
        if (suscripcionesActiva.length > 0) {
            // Un customer solo puede tener una suscripcion activa a la vez
            suscripcionActiva = suscripcionesActiva[0];

            // Verificar que no tenga otras suscripciones pendientes
            cond.estado = "pendiente";
            let suscripcionesPendientes = await suscripcionRepository.getSuscripcionesFechaFin(cond);

            if (suscripcionesPendientes.length > 0) {
                // La más cercana será la primera de la lista (porque es orden descendente)
                ultimaPendiente = suscripcionesPendientes[0];
            }
        }

        // Determinar la fecha de inicio
        let fechaInicio;

        if (ultimaPendiente) {
            infoSuscripcion.estadoSuscripcion = "pendiente";
            // Si hay una pendiente, la nueva comienza después de su fechaFin
            fechaInicio = new Date(ultimaPendiente.fechaFinSuscripcion);
        } else if (suscripcionActiva) {
            // Si la suscripcion activa tiene fechaFin null es porque es gratuita
            if (suscripcionActiva.fechaFinSuscripcion == null) {
                // Cancelar la gratuita
                let datosModGratuita = {};
                datosModGratuita.estadoSuscripcion = "inactiva";
                datosModGratuita.fechaFinSuscripcion = new Date();

                let filtroGratuita = {};
                filtroGratuita.idSuscripcion = suscripcionActiva.idSuscripcion;
                await suscripcionRepository.updateSuscripciones(datosModGratuita, filtroGratuita);
                // Activar la nueva
                infoSuscripcion.estadoSuscripcion = "activa";
                // La nueva tendrá la fecha actual
                fechaInicio = new Date();

                // Al ser activa se modificará el estado del customer a activo si el estado actual no es nuevo
                if (infoSuscripcion.customer.estadoCustomer != "nuevo") {
                    await customerRepo.actualizarCustomer({ estadoCustomer: "activo" }, infoSuscripcion.idCustomer);
                }
            } else {
                infoSuscripcion.estadoSuscripcion = "pendiente";
                // Si hay una activa, la nueva comienza luego de su fechaFin
                fechaInicio = new Date(suscripcionActiva.fechaFinSuscripcion);
            }

        } else {
            infoSuscripcion.estadoSuscripcion = "activa";
            // Si no hay pendientes ni activas se generará con la fecha de inicio hoy
            fechaInicio = new Date();

            // Al ser activa se modificará el estado del customer a activo si el estado actual no es nuevo
            if (infoSuscripcion.customer.estadoCustomer != "nuevo") {
                await customerRepo.actualizarCustomer({ estadoCustomer: "activo" }, infoSuscripcion.idCustomer);
            }
        }

        // Asignar fecha
        infoSuscripcion.fechaInicioSuscripcion = fechaInicio;

        // Asignar fecha de pago aprobado
        infoSuscripcion.fechaPago = new Date();

        // Traer el precioPlan para tomar la duración
        const precioPlan = await PrecioPlan.findByPk(infoSuscripcion.idPrecioPlan);

        // Verificar que el plan si tenga ese idPrecioPlan asociado
        await planRepo.verificarPrecioPlan(infoSuscripcion.idPlan, infoSuscripcion.idPrecioPlan);

        // Calcular la fecha de fin sumando los meses del 
        const fechaFin = new Date(fechaInicio);
        fechaFin.setMonth(fechaFin.getMonth() + precioPlan.duracion);
        infoSuscripcion.fechaFinSuscripcion = fechaFin;

        // Traer las caracteristicas del plan seleccionado
        const datosCara = await planRepo.getAllPlanes({ idPlan: infoSuscripcion.idPlan });

        // Es un objeto de sequelize, por eso se accede asi
        datosCaracteristicas = datosCara[0].caracteristicasPlanes;


        // Crear la suscripcion y los saldos en el repository
        let creada = await suscripcionRepository.crearSuscripcion(infoSuscripcion, datosCaracteristicas)
        //let creada = true;
        if (creada) {
            return "Suscripción creada";
        } else {
            return "error en la creación";
        }

    } catch (err) {
        console.log(err);
        throw err;
    }
}


// Crear suscripcion gratis
const crearSuscripcionGratuita = async (infoSuscripcion) => {
    try {
        // Verificar que el plan si tenga ese idPrecioPlan asociado
        await planRepo.verificarPrecioPlan(infoSuscripcion.idPlan, infoSuscripcion.idPrecioPlan);

        // Verificar que el plan y el precioPlan estén activos
        await planRepo.isActivoPlanPrecio(infoSuscripcion.idPlan, infoSuscripcion.idPrecioPlan);

        // Verificar que ese precioPlan sea gratuito
        const datosPlan = await planRepo.getAllPlanes({ idPlan: infoSuscripcion.idPlan }, { idPrecioPlan: infoSuscripcion.idPrecioPlan });

        let precio = datosPlan[0].precios[0].precio;
        let duracion = datosPlan[0].precios[0].duracion;
        let gratuito = false;

        if (precio == 0 || precio == null) {
            if (duracion == 0 || duracion == null) {
                gratuito = true;
            }
        }

        if (!gratuito) {
            throw new ErrorNegocio("El plan no es gratuito");
        }

        /* Verificar si el customer no tiene suscripciones activas */

        let cond = { idCustomer: infoSuscripcion.customer.idCustomer, estado: "activa" };
        let suscripcionesActiva = await suscripcionRepository.getSuscripcionesFechaFin(cond);

        // Verificar que no tenga otras suscripciones pendientes
        cond.estado = "pendiente";
        let suscripcionesPendientes = await suscripcionRepository.getSuscripcionesFechaFin(cond);

        // Si tiene una suscripcion activa o pendiente entonces no se generará una nueva
        if (suscripcionesActiva.length > 0 || suscripcionesPendientes.length > 0) {
            throw new ErrorNegocio("El usuario ya tiene una suscripcion activa o pendiente, no se puede activar una gratuita");
        }

        // Determinar la fecha de inicio
        let fechaInicio;

        infoSuscripcion.estadoSuscripcion = "activa";

        // Se generará con la fecha de inicio hoy
        fechaInicio = new Date();

        // Al ser activa se modificará el estado del customer a activo si el estado actual no es nuevo
        if (infoSuscripcion.customer.estadoCustomer != "nuevo") {
            await customerRepo.actualizarCustomer({ estadoCustomer: "activo" }, infoSuscripcion.customer.idCustomer);
        }

        // Asignar fecha
        infoSuscripcion.fechaInicioSuscripcion = fechaInicio;

        // Asignar fecha de pago aprobado
        infoSuscripcion.fechaPago = null;

        // Al ser un plan gratuito la fecha fin será null
        infoSuscripcion.fechaFinSuscripcion = null;

        // Extraer los datos de caracteristicas
        let datosCaracteristicas = datosPlan[0].caracteristicasPlanes;

        // Crear la suscripcion y los saldos en el repository
        let creada = suscripcionRepository.crearSuscripcion(infoSuscripcion, datosCaracteristicas)
        //let creada = true;
        if (creada) {
            return "Suscripción creada";
        } else {
            return "error en la creación";
        }

    } catch (err) {
        console.log(err);
        throw err;
    }
}


/* METODOS GET*/
// Traer suscripciones de customers, se puede especificar el estado
// De no especificarse customer los trae todos y si no se especifica estado los trae todos
const getSuscripcionesCustomer = async (idCustomer = null, estado = null) => {
    try {
        let cond = construirCondiciones({ idCustomer, estadoSuscripcion: estado });
        let suscripcionesActivas = await suscripcionRepository.getSuscripcionesPlan(cond);

        return suscripcionesActivas
    } catch (err) {
        console.log(err);
        throw err;
    }


}
/* Metodos PUT*/

//Actualizar estados de las suscripciones dada la fecha actual. 
const actualizarEstadoSuscripciones = async () => {

    // Obtener fecha actual
    const fechaActual = new Date().toISOString(); // Genera una fecha en formato ISO 8601

    // Iniciar una transacción
    const t = await sequelize.transaction();

    try {
        // **1. Activar suscripciones cuya fecha de inicio ya pasó**

        // Buscar las suscripciones pendientes para luego usar su idUsuario
        let condicionesActivar = {};
        condicionesActivar.estadoSuscripcion = 'pendiente';

        // FechaInicio debe ser igual o menor que la actual (que sea menor implica que ya pasó la fecha)
        condicionesActivar.fechaInicioSuscripcion = { [Sequelize.Op.lte]: fechaActual };
        const suscripcionesPendientes = await suscripcionRepository.getSuscripcionesPlan(condicionesActivar);

        // Actualizar las suscripciones pendientes
        let datosActivar = { estadoSuscripcion: 'activa' }; //Campo que se actualizará de la suscripción
        if (suscripcionesPendientes.length > 0) {
             await suscripcionRepository.updateSuscripciones(datosActivar, condicionesActivar, t);
        } else {
            console.log("No hay suscripciones pendientes que activar. " + fechaActual);
        }

        // **2. Desactivar suscripciones vencidas**

        // Buscar las suscripciones activas a vencer para luego usar su idUsuario
        let condicionesDesactivar = {};
        condicionesDesactivar.estadoSuscripcion = 'activa';

        // FechaFin debe ser igual o menor que la actual (que sea menor implica que ya pasó la fecha)
        condicionesDesactivar.fechaFinSuscripcion = { [Sequelize.Op.lte]: fechaActual };
        const suscripcionesActivas = await suscripcionRepository.getSuscripcionesPlan(condicionesDesactivar)

        // Actualizar las suscripciones activas
        let datosDesactivar = { estadoSuscripcion: 'inactiva' }; //Campo que se actualizará de la suscripción
        if (suscripcionesActivas.length > 0) {
               await suscripcionRepository.updateSuscripciones(datosDesactivar, condicionesDesactivar, t);
        } else {
            console.log("No hay suscripciones activas para desactivar. " + fechaActual)
        }
        // Obtener customer afectados por suscripciones activadas y desactivadas

        const customerActivados = suscripcionesPendientes.map(s => s.idCustomer);
        const customerDesactivados = suscripcionesActivas.map(s => s.idCustomer);

        // **3. Verificar customer que están en ambas listas (ya no necesitan cambios)**
        const customerConCambio = customerActivados.filter(idCustomer => customerDesactivados.includes(idCustomer));

        // **4. Actualizar el estado de los customer**

        // 4.1. Actualizar a "activo" los customer que tienen suscripción recien activada y no se les desactivó otra 
        // ( Su estado antes de esto sería inactivo)
        for (const idCustomer of customerActivados) {
            if (!customerConCambio.includes(idCustomer)) { // Usar solo aquellos id que no estén en la lista conCambio
                let dataActivarCustomer = {};
                dataActivarCustomer.estadoCustomer = "activo";
                await customerRepo.actualizarCustomer(dataActivarCustomer, idCustomer, t);
            }
        }

        // 4.2. Actualizar a "inactivo" los customer que tienen suscripción recien desactivada y no se les activó otra 
        // ( Su estado antes de esto sería activo)
        for (const idCustomer of customerDesactivados) {
            if (!customerConCambio.includes(idCustomer)) { // Usar solo aquellos id que no estén en la lista conCambio
                let dataDesactivarCustomer = {};
                dataDesactivarCustomer.estadoCustomer = "inactivo";
                await customerRepo.actualizarCustomer(dataDesactivarCustomer, idCustomer, t);
            }
        }
        await actualizarInmueblesSuscripcion(customerConCambio, suscripcionesActivas, suscripcionesPendientes);

        await t.commit();
    } catch (err) {
        console.log(err);
        await t.rollback();
        throw err;
    }

}

// Actualizar los inmuebles dadas unas suscripciones vencidas
// Recibe una lista de ID de customer que cambiaron su suscripcion
// Una lista de objetos suscripciones activas que se desactivaron
// Una lista de objetos suscripciones pendientes que se activaron
const actualizarInmueblesSuscripcion = async (customerConCambio, suscripcionesActivas, suscripcionesPendientes) => {
    // 4.3. Actualizar estado de los inmuebles si un usuario tiene menos cantidad por su suscripcion
    for (const idCustomer of customerConCambio) {

        // Obtener la suscripción anterior (desactivada)
        const suscripcionesViejas = suscripcionesActivas.filter(s => s.idCustomer == idCustomer);
        const suscripcionVieja = suscripcionesViejas[0]; // Tomar la primera, si existe
        // Obtener la nueva suscripción (activada)
        const suscripcionesNuevas = suscripcionesPendientes.filter(s => s.idCustomer === idCustomer);
        const suscripcionNueva = suscripcionesNuevas[0]; // Tomar la primera, si existe

        // Verificar que existan ambas suscripciones (anterior y nueva)
        const idPlanAntiguo = suscripcionVieja ? suscripcionVieja.precioPlan.plan.idPlan : null;
        const idPlanNuevo = suscripcionNueva ? suscripcionNueva.precioPlan.plan.idPlan : null;
        if (idPlanAntiguo && idPlanNuevo) {
            // Llamar a la función que actualiza el estado de los inmuebles
            await actualizarEstadoInmuebles(idCustomer, idPlanAntiguo, idPlanNuevo, "borrador");

            // Actualizar aquellos inmuebles con iFrame si el plan nuevo no se les permite
            await actualizarFrameInmuebles(idCustomer, idPlanAntiguo, idPlanNuevo);

        } else {
            console.log(`No se encontraron planes válidos para el customer ${idCustomer}`);
        }
    }
}

// Metodo que coloca en un estado los inmuebles de un usuario si su sucripcion cambia
const actualizarEstadoInmuebles = async (idCustomer, idPlanAntiguo, idPlanNuevo, estado) => {
    try {
        // 1. Verificar si el plan ha cambiado
        if (idPlanAntiguo === idPlanNuevo) return;

        // 2. Obtener los límites de inmuebles creados en ambos planes
        const valorAntiguo = await caracteristicaRepo.obtenerCaracteristicaPlan(idPlanAntiguo, "inmuebles_creados");
        const valorNuevo = await caracteristicaRepo.obtenerCaracteristicaPlan(idPlanNuevo, "inmuebles_creados");

        // Si algún valor no existe, asumir como 0
        const limiteAntiguo = valorAntiguo.caracteristicasPlanes[0].valorCaracteristica || 0;
        const limiteNuevo = valorNuevo.caracteristicasPlanes[0].valorCaracteristica || 0;

        // 3. Si el límite antiguo es mayor al nuevo, calcular la diferencia

        if (limiteAntiguo > limiteNuevo) {
            const diferencia = limiteAntiguo - limiteNuevo;

            console.log(`Actualizando ${diferencia} inmuebles a estado '${estado}' para el usuario ${idCustomer}`);

            // 4. Obtener los inmuebles activos del usuario
            const inmuebles = await inmuebleRepo.getInmueblesUsuario(idCustomer);

            // 5. Seleccionar los "sobrantes" y actualizarlos al nuevo estado
            const inmueblesSobrantes = inmuebles.slice(0, diferencia); // Tomar solo la cantidad necesaria
            for (const inmuebleData of inmueblesSobrantes) {
                const inmueble = inmuebleData.get({ plain: true });
                await inmuebleRepo.actualizarInmueble({ estadoPublicacionInmueble: estado }, inmueble.idInmueble);
            }
        }
    } catch (error) {
        console.error(`Error al actualizar inmuebles para el usuario ${idCustomer}:`, error);
        throw error; // Relanzar el error para manejarlo en otro lugar si es necesario
    }
}

// Coloca en null aquellos iFrame de inmuebles cuyo nuevo plan no permita tenerlo 
const actualizarFrameInmuebles = async (idCustomer, idPlanAntiguo, idPlanNuevo) => {
    try {
        // 1. Verificar si el plan ha cambiado
        if (idPlanAntiguo === idPlanNuevo) return;

        // 2. Obtener los límites de inmuebles creados en ambos planes
        const valorAntiguo = await caracteristicaRepo.obtenerCaracteristicaPlan(idPlanAntiguo, "uso_iframe");
        const valorNuevo = await caracteristicaRepo.obtenerCaracteristicaPlan(idPlanNuevo, "uso_iframe");

        // Verificar si el primer elemento existe y tiene un valor, de lo contrario, asumir como 0
        const limiteAntiguo = valorAntiguo.caracteristicasPlanes?.[0]?.valorCaracteristica || 0;
        const limiteNuevo = valorNuevo.caracteristicasPlanes?.[0]?.valorCaracteristica || 0;
        // 3. Si el limite antiguo es 1 y diferente al nuevo se actualizan los inmuebles
        if ((limiteAntiguo == 1 && limiteAntiguo != limiteNuevo)|| limiteAntiguo==limiteNuevo) {
            console.log(`Actualizando iFrame inmuebles a null para el usuario ${idCustomer}`);

            // 4. Obtener los inmuebles activos del usuario
            const inmuebles = await inmuebleRepo.getInmueblesUsuario(idCustomer);
            // 5. actualizarlos al nuevo valor
            for (const inmuebleData of inmuebles) {
                const inmueble = inmuebleData.get({ plain: true });
                await inmuebleRepo.actualizarInmueble({ frameMaps: null }, inmueble.idInmueble);
                let listaDetalles = inmueble.detalles;
                // Actualizar los valores de frame de los detalles
                for (const detalle of listaDetalles) {
                    if(detalle.frameRecorrido){
                        await detalleInmuebleRepo.actualizarDetalle(
                            {frameRecorrido:null}, detalle.idDetalle,inmueble.idInmueble
                        )
                    }
                };

            }
        }
    } catch (error) {
        console.error(`Error al actualizar iFrame para el usuario ${idCustomer}:`, error);
        throw error; // Relanzar el error para manejarlo en otro lugar si es necesario
    }
}
module.exports = {
    crearSuscripcionPagada,
    crearSuscripcionGratuita,
    getSuscripcionesCustomer,
    actualizarEstadoSuscripciones,
    actualizarFrameInmuebles
}
