/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const sequelize = require("../../../conf/database");
const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");
const { filtrarCampos } = require("../../../utils/utils");

const Customer = require("../entities/Customer");
const PerfilService = require("./PerfilCustomerService");
const UsuarioRepo = require("../repositories/UsuariosRepository");
const CustomerRepo = require("../repositories/CustomerRepository");
const SuscripcionService = require("../../suscripciones/services/SuscripcionService");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

/* Metodos de consulta */

// Traer todos los customers. Valida si hay condiciones qué aplicar en la consulta
const getAllCustomers = async (datos) => {
    const { perfilCustomer, idUsuario, idCustomer } = datos;

    const condiciones = {};
    if (perfilCustomer) {
        condiciones.idPerfil = perfilCustomer;
    }

    if (idUsuario) {
        condiciones.idUsuario = idUsuario;
    }

    if (idCustomer) {
        condiciones.idCustomer = idCustomer;
    }
    console.log(condiciones);
    const customers = await CustomerRepo.getAllCustomers(condiciones);
    return customers;
}

// Verificar que el id de un usuario coincida con el de un customer
const coincideIdUsuario = async (idUsuario, idCustomer) => {
    // Obtener el customer
    let dato = {};
    dato.idCustomer = idCustomer;
    const customer = await getAllCustomers(dato); // Traer customer
    if (!customer || !customer[0]) {
        return false;
    }
    return (customer[0].dataValues.idUsuario == idUsuario); // Validar si es el mismo que el del parametro
}

// Traer todos los customers pero limita a nombre, logo y tipo. 
//Valida si hay condiciones qué aplicar en la consulta
const getAllCustomersBasic = async (datos) => {
    const { perfilCustomer } = datos;
    const condiciones = {};
    if (perfilCustomer) {
        // Buscar los perfiles que coincidan con el nombre dado
        let perfiles = await PerfilService.getPerfilNombre(perfilCustomer);
        // Si encuentra tomar el primer valor y colocarlo en las condiciones
        condiciones.idPerfil = perfiles[0].dataValues.idPerfil;
    }
    const customers = await CustomerRepo.getAllCustomers(condiciones);

    // Retornar solo info basica
    const results = customers.map(customer => ({
        nombreCustomer: customer.nombreCustomer,
        logoCustomer: customer.logoCustomer,
        perfilCustomer: customer.perfilCustomer
    }));
    return results;
}

/* Metodos de actualizacion*/
// Actualizar un customer
const actualizarCustomer = async (datos, params) => {
    const { customer } = datos;
    const { idCustomer } = params;
    const { tipoUsuario } = datos;

    // Dependiendo del tipo de usuario se pueden cambiar ciertas cosas (GOOGLEAUTH REQUERIDO)
    const campos = ["nombreCustomer", "correoNotiCustomer", "telefonoNotiCustomer", "telefonoFijoCustomer",
        "codigoCustomer", "perfilCustomer", "numComercialCustomer"];

    // Para el admin ademas de estos campos se agrega el de estado
    if (tipoUsuario === "admin") {
        campos.push("estadoCustomer");
    }


    // Extraer los datos respectivos
    const customerData = filtrarCampos(customer, campos);

    await CustomerRepo.actualizarCustomer(customerData, idCustomer);

    // Si no fue un admin se hace la actualizacion de estado segun suscripciones
    if (tipoUsuario != "admin") {
        // Hacer la modificación automatica segun suscripciones
        let customerTemp = await Customer.findByPk(idCustomer);

        modificarEstadoPago(customerTemp);
    }


    return "Datos actualizados";
}

/* Modificar los estados de un usuario si tiene suscripciones activas*/
const modificarEstadoPago = async (customer) => {
    let estadoActual = customer.estadoCustomer; // Estado actual
    let nuevoEstado = null;
    // Verificar si tiene suscripcion activa
    let suscripcionActiva = await SuscripcionService.getSuscripcionesCustomer(customer.idCustomer, "activa"); // Validar con modulo de suscripciones
    let tieneSuscripcionActiva = false;
    if (suscripcionActiva) {
        tieneSuscripcionActiva = true;
    }
    if (tieneSuscripcionActiva && (estadoActual == "inactivo" || estadoActual == "nuevo")) {
        nuevoEstado = "activo";
    } else if (!tieneSuscripcionActiva && (estadoActual == "activo" || estadoActual == "nuevo")) {
        nuevoEstado = "inactivo";
    }

    if (nuevoEstado) {
        let data = {};
        data.estadoCustomer = nuevoEstado;
        await CustomerRepo.actualizarCustomer(data, customer.idCustomer);
    }

};

// Actualizar un logo
const actualizarLogo = async (idCustomer, nombreArchivo, tipoArchivo) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción

    try {

        if (!nombreArchivo || !tipoArchivo) {
            throw new ErrorNegocio("Ruta no encontrada o tipo de archivo no correcto");
        }

        // Verificar que exista el id del customer
        const customer = await Customer.findByPk(idCustomer);

        if (!customer) {
            throw new ErrorNegocio("Customer no encontrado");
        }

        /*Si es valido se actualiza el customer con el nuevo nombre de archivo*/
        msg = "";
        if (tipoArchivo === 'foto') {
            let fotoVieja = customer.logoCustomer;
            let newData = { logoCustomer: nombreArchivo };
            // Borrar la foto vieja. Se usa el metodo del servicio de detalles que ya lo incluye
            if (fotoVieja) {
                await deleteMultimediaServidor("fotos", fotoVieja, "customers");
            }

            // Se usa el metodo de actualizacion del repositorio
            await CustomerRepo.actualizarCustomer(newData, idCustomer, transaction);
            transaction.commit();
            msg = "Logo actualizado";
        } else {
            throw new ErrorNegocio("Tipo de archivo no especificado");
        }

        return msg;
    } catch (err) {
        transaction.rollback();
        throw err;
    }
}

/* Metodos de creacion */

// Crear un customer con datos basicos, se pide su perfil , ID usuario y correo para notificaciones
const crearCustomerBasico = async (idUsuario, idPerfil, correoUsuario) => {
    try {

        if (!idUsuario || !idPerfil || !correoUsuario) {
            throw new ErrorNegocio("Faltan datos en la creacion del customer");
        }

        let datosCustomer = {};
        datosCustomer.idUsuario = idUsuario;
        datosCustomer.idPerfil = idPerfil;
        datosCustomer.nombreCustomer = "NOMBRE CUSTOMER";
        datosCustomer.correoNotiCustomer = correoUsuario;
        datosCustomer.telefonoNotiCustomer = "NUMERO NOTIFICACION"
        datosCustomer.telefonoFijoCustomer = "TELEFONO FIJO";
        datosCustomer.estadoCustomer = "nuevo";

        let customer = await CustomerRepo.insertarCustomer(datosCustomer);
        return customer;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Generar o traer un customer dado un idUsuario
const generarOCrearCustomer = async (idUsuario, idPerfil) => {

    // Verificar que el customer asociado exista
    let result = await getAllCustomers({ idUsuario: idUsuario });

    let customer;
    // Si no existe crearlo
    if (!result || result.length == 0) {

        // Buscar el correo del usuario respectivo
        let usuario = await UsuarioRepo.getAllUsuarios({ idUsuario: idUsuario });

        if (!usuario || usuario.length == 0) {
            throw new ErrorNegocio("Error, no existe este usuario");
        }

        // Crear el customer
        customer = await crearCustomerBasico(idUsuario, idPerfil, usuario[0].dataValues.emailUsuario);
    } else {
        // Si exite el customer se accede a su ID
        customer = result[0];
    }
    return customer;
}
module.exports = {
    getAllCustomers,
    getAllCustomersBasic,
    actualizarCustomer,
    actualizarLogo,
    coincideIdUsuario,
    crearCustomerBasico,
    generarOCrearCustomer
}