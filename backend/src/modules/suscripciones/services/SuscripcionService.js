/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");

const suscripcionRepository = require("../repositories/SuscripcionRepository");
const customerRepo = require("../../usuarios/repositories/CustomerRepository");
const planRepo = require("../repositories/PlanRepository");
const { Sequelize } = require("sequelize");
const Customer = require("../../usuarios/entities/Customer");
const PrecioPlan = require("../entities/PrecioPlan");

/* Metodos POST */

// Crear una suscripcion con la informacion del pago
const crearSuscripcion = async (infoPago) => {
    const { idCustomer, idPlan, idPrecioPlan } = infoPago;
    let datos = {};
    let datosCaracteristicas = {};

    // Datos propios de la suscripcion dados por la pasarela
    datos.idCustomer = idCustomer;
    datos.idPlan = idPlan;
    datos.idPrecioPlan = idPrecioPlan;

    // Asignar monto pagado
    datos.montoPagado = infoPago.montoPago;

    // Asignar medio de pago
    datos.medioPago = infoPago.medioPago;

    // Asignar id de transaccion
    datos.idTransaccion = infoPago.idTransaccion;

    try {
        // Verificar si el customer no tiene suscripciones activas
        let cond = { idCustomer: idCustomer, estado: "activa" };
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
                // La más cercana será la última de la lista (porque es orden descendente)
                ultimaPendiente = suscripcionesPendientes[suscripcionesPendientes.length - 1];
            }
        }

        // Determinar la fecha de inicio
        let fechaInicio;

        if (ultimaPendiente) {
            datos.estadoSuscripcion = "pendiente";
            // Si hay una pendiente, la nueva comienza después de su fechaFin
            fechaInicio = new Date(ultimaPendiente.fechaFinSuscripcion);
        } else if (suscripcionActiva) {
            datos.estadoSuscripcion = "pendiente";
            // Si hay una activa, la nueva comienza luego de su fechaFin
            fechaInicio = new Date(suscripcionActiva.fechaFinSuscripcion);
        } else {
            datos.estadoSuscripcion = "activa";
            // Si no hay pendientes ni activas se generará con la fecha de inicio hoy
            fechaInicio = new Date();

            // Al ser activa se modificará el estado del customer a activo
            await customerRepo.actualizarCustomer({estadoCustomer:"activo"}, idCustomer);
        }

        // Asignar fecha
        datos.fechaInicioSuscripcion = fechaInicio;

        // Asignar fecha de pago aprobado
        datos.fechaPago = fechaInicio;

        // Traer el precioPlan para tomar la duración
        const precioPlan = await PrecioPlan.findByPk(idPrecioPlan);

        // Verificar que el plan si tenga ese idPrecioPlan asociado
        await planRepo.verificarPrecioPlan(idPlan, idPrecioPlan);

        // Calcular la fecha de fin sumando los meses del 
        const fechaFin = new Date(fechaInicio);
        fechaFin.setMonth(fechaFin.getMonth() + precioPlan.duracion);
        datos.fechaFinSuscripcion = fechaFin;

        // Traer las caracteristicas del plan seleccionado
        const datosCara = await planRepo.getAllPlanes({ idPlan: idPlan });

        // Es un objeto de sequelize, por eso se accede asi
        datosCaracteristicas = datosCara[0].caracteristicasPlanes;


        // Crear la suscripcion y los saldos en el repository
        let creada = suscripcionRepository.crearSuscripcion(datos, datosCaracteristicas)
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
        let cond = {};
        // Si el idCustomer es null se traen todas
        if (idCustomer) {
            cond.idCustomer = idCustomer;
        }

        if (estado) {
            cond.estadoSuscripcion = estado;
        }


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
        const suscripcionesPendientes = await suscripcionRepository.getSuscripciones(condicionesActivar);

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
        const suscripcionesActivas = await suscripcionRepository.getSuscripciones(condicionesDesactivar)

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
                console.log("actualizando " + idCustomer);
                let dataDesactivarCustomer = {};
                dataDesactivarCustomer.estadoCustomer = "inactivo";
                await customerRepo.actualizarCustomer(dataDesactivarCustomer, idCustomer, t);
            }
        }

        //throw new ErrorNegocio("problem?");
        await t.commit();

    } catch (err) {
        console.log(err);
        await t.rollback();

        throw err;
    }
}


module.exports = {
    crearSuscripcion,
    getSuscripcionesCustomer,
    actualizarEstadoSuscripciones
}
