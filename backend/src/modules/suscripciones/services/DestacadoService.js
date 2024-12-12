/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

const CustomerService = require("../../usuarios/services/CustomerService");
const InmuebleRepo = require("../../inmuebles/repositories/InmuebleRepository");

const destacadoRepo = require("../repositories/DestacadoRepository");

/* Metodos GET */

// Trae un InmuebleDestacado segun su idInmueble
const getDestacadoInmueble = async (idInmueble) => {
    try {
        let cond = {}

        if (idInmueble) {
            cond.idInmueble = idInmueble;
        }
        let destacado = await destacadoRepo.traerDestacados(cond);

        return destacado;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Traer destacados segun idCustomer o estado (0 o 1), se puede especificar si traer info especifica de inmueble
const getDestacadoCustomerEstado = async (estado = null, idCustomer = null, infoInmueble = null) => {
    try {
        let whereDestacado = {} // Objeto que contendrá parametros adicionales del destacado

        let whereInmueble = {} // Objeto que contendrá parametros adicionales del inmueble


        let atributosInmueble = {};

        if (estado) {
            whereDestacado.estadoDestacado = estado;
        }

        if (idCustomer) {
            whereInmueble.idCustomer = idCustomer;
        }

        if (infoInmueble) {
            atributosInmueble = InmuebleRepo.traerAtributosAvanzados(false);
        } else {
            atributosInmueble = [];
        }

        let destacados = await destacadoRepo.traerDestacados(whereDestacado, whereInmueble, atributosInmueble);
        return destacados;
    } catch (err) {
        console.log(err);
        throw err;
    }


}

/* Metodos POST */

// Insertar o actualizar un inmueble destacado
const manejarRegistroDestacado = async (idInmueble) => {
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

            // Verificar si existe ya el inmueble destacado
            let destacado = await getDestacadoInmueble(idInmueble);

            // Si existe cambiar el estado por el inverso al que tiene
            if (destacado && destacado.length >0) {

                let datos = destacado[0].dataValues;
                let nuevaData = {};
                nuevaData.estadoDestacado = 1; // Colocar estado activo por defecto
                nuevaData.fechaInicio = new Date();

                // Si el estado actual es inactivo entonces se colocará en activo y viceversa
                if (datos.estadoDestacado == 1) {
                    nuevaData.estadoDestacado = 0;
                }


                // Si el estado nuevo es inactivo colocar la fecha en null, caso contrario se usa la fecha actual
                if (nuevaData.estadoDestacado == 0) {
                    nuevaData.fechaInicio = null;
                }

                await destacadoRepo.modificarDestacado(nuevaData, datos.idDestacado)

                // Actualizar registro
                return "Inmueble destacado actualizado";
            } else {

                // Si no existe registrar

                // Tomar idInmueble, fechaActual y estado como true
                let datos = {};

                datos.idInmueble = idInmueble;

                datos.fechaInicio = new Date();
                datos.estadoDestacado = 1;

                await destacadoRepo.insertarDestacado(datos);

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
    getDestacadoInmueble,
    manejarRegistroDestacado,
    getDestacadoCustomerEstado
}
