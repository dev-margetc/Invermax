/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");

const suscripcionRepository = require("../repositories/SuscripcionRepository");
const customerRepo = require("../../usuarios/repositories/CustomerRepository");
const planRepo = require("../repositories/PlanRepository");
const Plan = require("../entities/Plan");
const { Sequelize } = require("sequelize");
const Customer = require("../../usuarios/entities/Customer");

/* Metodos POST */

// Crear una suscripcion con la informacion del pago
const crearSuscripcion = async (infoPago) => {
    const { idCustomer, idPlan } = infoPago;
    let datos = {};
    let datosCaracteristicas = {};
    datos.idCustomer = idCustomer;
    datos.idPlan = idPlan;
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
            fechaInicio = new Date(ultimaPendiente.dataValues.fechaFinSuscripcion);
        } else if (suscripcionActiva) {
            datos.estadoSuscripcion = "pendiente";
            // Si hay una activa, la nueva comienza luego de su fechaFin
            fechaInicio = new Date(suscripcionActiva.dataValues.fechaFinSuscripcion);
        } else {
            datos.estadoSuscripcion = "activa";
            // Si no hay pendientes ni activas se generará con la fecha de inicio hoy
            fechaInicio = new Date();
        }

        // Asignar fecha
        datos.fechaInicioSuscripcion = fechaInicio;

        // Traer el plan para tomar la duración
        const plan = await Plan.findByPk(idPlan);

        // Calcular la fecha de fin sumando los meses del plan
        const fechaFin = new Date(fechaInicio);
        fechaFin.setMonth(fechaFin.getMonth() + plan.duracionPlan);

        datos.fechaFinSuscripcion = fechaFin;

        // Traer las caracteristicas del plan seleccionado
        const datosCara = await planRepo.getAllPlanes({ idPlan: idPlan });

        // Es un objeto de sequelize, por eso se accede asi
        datosCaracteristicas = datosCara[0].dataValues.caracteristicasPlanes;

        // Crear la suscripcion y los saldos en el repository
        let creada = suscripcionRepository.crearSuscripcion(datos, datosCaracteristicas)
        console.log(datos);
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
        let datosActivar = {estadoSuscripcion: 'activa'}; //Campo que se actualizará de la suscripción
        await suscripcionRepository.updateSuscripciones(datosActivar,condicionesActivar, t);

        // **2. Desactivar suscripciones vencidas**

        // Buscar las suscripciones activas a vencer para luego usar su idUsuario
        let condicionesDesactivar = {};
        condicionesDesactivar.estadoSuscripcion = 'activa';

        // FechaFin debe ser igual o menor que la actual (que sea menor implica que ya pasó la fecha)
        condicionesDesactivar.fechaFinSuscripcion = { [Sequelize.Op.lte]: fechaActual };
        const suscripcionesActivas = await suscripcionRepository.getSuscripciones(condicionesDesactivar)

        // Actualizar las suscripciones activas
        let datosDesactivar = {estadoSuscripcion: 'inactiva'}; //Campo que se actualizará de la suscripción
       
        await suscripcionRepository.updateSuscripciones(datosDesactivar,condicionesDesactivar, t);

        // Obtener customer afectados por suscripciones activadas y desactivadas

        const customerActivados = suscripcionesPendientes.map(s => s.idCustomer);
        const customerDesactivados = suscripcionesActivas.map(s => s.idCustomer);

        // **3. Verificar customer que están en ambas listas (ya no necesitan cambios)**
        const customerConCambio = customerActivados.filter(idCustomer => customerDesactivados.includes(idCustomer));


        console.log(customerActivados);
        console.log(customerDesactivados);
        console.log(customerConCambio);

        // **4. Actualizar el estado de los customer**

        // 4.1. Actualizar a "activo" los customer que tienen suscripción recien activada y no se les desactivó otra 
        // ( Su estado antes de esto sería inactivo)
        for (const idCustomer of customerActivados) {
            if (!customerConCambio.includes(idCustomer)) { // Usar solo aquellos id que no estén en la lista conCambio
                console.log("actualizando "+idCustomer);
                let dataActivarCustomer = {};
                dataActivarCustomer.estadoCustomer = "activo";
                await customerRepo.actualizarCustomer(dataActivarCustomer, idCustomer, t);
            }
        }

        // 4.2. Actualizar a "inactivo" los customer que tienen suscripción recien desactivada y no se les activó otra 
        // ( Su estado antes de esto sería activo)
        for (const idCustomer of customerDesactivados) {
            if (!customerConCambio.includes(idCustomer)) { // Usar solo aquellos id que no estén en la lista conCambio
                console.log("actualizando "+idCustomer);
                let dataDesactivarCustomer = {};
                dataDesactivarCustomer.estadoCustomer = "inactivo";
                await customerRepo.actualizarCustomer(dataDesactivarCustomer, idCustomer, t);
            }
        }

        throw new ErrorNegocio("problem?");
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
