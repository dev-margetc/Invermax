/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

const CustomerService = require("../../usuarios/services/CustomerService");
const InmuebleRepo = require("../../inmuebles/repositories/InmuebleRepository");

const ascensoRepo = require("../repositories/AscensoRepository");

/* Metodos GET */

// Trae un InmuebleAscenso segun su idInmueble
const getAscensoInmueble = async (idInmueble) => {
    try {
        let cond = {}

        if (idInmueble) {
            cond.idInmueble = idInmueble;
        }
        let ascenso = await ascensoRepo.traerInmueblesAscenso(cond);

        return ascenso;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Traer inmuebles en ascenso segun idCustomer o estado (0 o 1), se puede especificar si traer info especifica de inmueble
const getAscensoCustomerEstado = async (estado = null, idCustomer = null, infoInmueble = null) => {
    try {
        let whereAscenso = {} // Objeto que contendrá parametros adicionales del ascensoInmueble

        let whereInmueble = {} // Objeto que contendrá parametros adicionales del inmueble


        let atributosInmueble = {};

        if (estado) {
            whereAscenso.estadoAscenso = estado;
        }

        if (idCustomer) {
            whereInmueble.idCustomer = idCustomer;
        }

        if (infoInmueble) {
            atributosInmueble = InmuebleRepo.traerAtributosAvanzados(false);
        } else {
            atributosInmueble = [];
        }

        let inmueblesAscenso = await ascensoRepo.traerInmueblesAscenso(whereAscenso, whereInmueble, atributosInmueble);
        return inmueblesAscenso;
    } catch (err) {
        console.log(err);
        throw err;
    }


}

/* Metodos POST */

// Insertar o actualizar un inmueble en ascenso
const manejarRegistroAscenso = async (idInmueble) => {
    try {

        // Si el estado del inmueble no es publicado entonces no lo deja
        let inmueble = await InmuebleRepo.getInmuebleByID(idInmueble);

        let dataInmueble = inmueble[0].dataValues;

        // Traer el customer
        let customer = await CustomerService.getAllCustomers({ idCustomer: dataInmueble.idCustomer });

        // Validar que el estado del customer permita usar esta función
        let customerData = customer[0].dataValues;

        // Validar que el plan le permita realizar la funcion
        let planValido = true; // Verificar luego cuando se agreguen las caracteristicas

        if (customerData.estadoCustomer == "activo" && planValido) {

            // Verificar que el inmueble esté como publicado
            if (dataInmueble.estadoPublicacionInmueble != "publicado") {
                throw new ErrorNegocio("El estado del inmueble: " + dataInmueble.estadoPublicacionInmueble + " no permite que haga uso de esta función");
            }

            // Verificar si existe ya el inmueble en ascenso
            let ascenso = await getAscensoInmueble(idInmueble);

            console.log(ascenso);

            // Si existe cambiar el estado por el inverso al que tiene
            if (ascenso && ascenso.length>0) {

                let datos = ascenso[0].dataValues;
                let nuevaData = {};
                nuevaData.estadoAscenso = 1; // Colocar estado activo por defecto
                nuevaData.fechaInicio = new Date();

                // Si el estado actual es inactivo entonces se colocará en activo y viceversa
                if (datos.estadoAscenso == 1) {
                    nuevaData.estadoAscenso = 0;
                }


                // Si el estado nuevo es inactivo colocar la fecha en null, caso contrario se usa la fecha actual
                if (nuevaData.estadoAscenso == 0) {
                    nuevaData.fechaInicio = null;
                }

                await ascensoRepo.modificarAscenso(nuevaData, datos.idAscenso);

                // Actualizar registro
                return "Inmueble en ascenso actualizado";
            } else {

                // Si no existe registrar

                // Tomar idInmueble, fechaActual y estado como true
                let datos = {};

                datos.idInmueble = idInmueble;

                datos.fechaInicio = new Date();
                datos.estadoAscenso = 1;

                await ascensoRepo.insertarInmuebleAscenso(datos);
                

                return "Inmueble registrado como destacado";
            }
        }else{
            throw new ErrorNegocio("El estado actual del customer o su plan no le permite llevar a cabo esta acción");
        }

    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAscensoInmueble,
    manejarRegistroAscenso,
    getAscensoCustomerEstado
}
