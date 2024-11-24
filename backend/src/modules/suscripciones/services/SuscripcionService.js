/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const sequelize = require("../../../conf/database");

const suscripcionRepository = require("../repositories/SuscripcionRepository");
const planRepo = require("../repositories/PlanRepository");
const Plan = require("../entities/Plan");

/* Metodos POST */

// Crear una suscripcion con la informacion del pago
const crearSuscripcion = async (infoPago) => {
    const { id_customer, id_plan } = infoPago;
    let idCustomer = id_customer;
    let idPlan = id_plan;
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
        const datosCara = await planRepo.getAllPlanes({idPlan:idPlan});

        // Es un objeto de sequelize, por eso se accede asi
        datosCaracteristicas = datosCara[0].dataValues.caracteristicasPlanes;
        
        // Crear la suscripcion y los saldos en el repository
        let creada = suscripcionRepository.crearSuscripcion(datos, datosCaracteristicas)
        console.log(datos);
        //let creada = true;
        if(creada){
            return "Suscripción creada";
        }else{
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
const getSuscripcionesCustomer = async (idCustomer = null, estado=null) => {
    try{
        let cond = {};
         // Si el idCustomer es null se traen todas
        if(idCustomer){
            cond.idCustomer = idCustomer;
        }

        if(estado){
            cond.estadoSuscripcion = estado;
        }
        

        let suscripcionesActivas = await suscripcionRepository.getSuscripcionesPlan(cond);
    
        return suscripcionesActivas
       
        }catch(err){
            console.log(err);
            throw err;
        }
    
   
}


module.exports = {
    crearSuscripcion,
    getSuscripcionesCustomer,

}
