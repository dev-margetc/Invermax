/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const sequelize = require("../../../conf/database");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio")

const UsuariosRepo = require("../repositories/UsuariosRepository");
const CustomerRepo = require("../repositories/CustomerRepository");
const InmuebleService = require("../../inmuebles/services/InmuebleService");
const FiltrosInmuebleService = require("../../inmuebles/services/FiltrosInmuebleService");
const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");
const Customer = require("../entities/Customer");

/* Metodos de consulta*/

//Obtener todos los usuarios
const getAllUsuarios = async (condiciones = null) => {
    if (condiciones) {
        const usuarios = await UsuariosRepo.getAllUsuarios(condiciones);
        return usuarios;
    }else{
        return await UsuariosRepo.getAllUsuarios();
    }

}

// Obtener un usuario con el UID (unique ID)
const getUserByUID = async (uid) => {
    if (!uid) {
        throw new ErrorNegocio("ID firebase no existe");
    }
    const usuarios = await UsuariosRepo.getUsuarioUIDEmail(uid, null);
    return usuarios;
}

// Obtener un usuario con el correo
const getUserByEmail = async (email) => {
    if (!email) {
        throw new ErrorNegocio("Email no proporcionado");
    }
    const usuarios = await UsuariosRepo.getUsuarioUIDEmail(null, email);
    return usuarios;
}

/* Metodos de insert*/
// Insertar un usuario y un customer correspondiente
const insertUsuarioCustomer = async (datosUsuario, datosCustomer) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción

    try {
        if (!datosUsuario || !datosCustomer) {
            throw new ErrorNegocio("Hacen falta datos");
        }
        // Insertar el usuario

        // Colocar el tipo como customer
        datosUsuario.tipoUsuario = "customer";
        datosUsuario.estadoUsuario = "nuevo"; // Estado customer

        usuario = await UsuariosRepo.insertarUsuario(datosUsuario, transaction);

        // Insertar el customer

        // Colocar el id del usuario recien creado

        datosCustomer.idUsuario = usuario.idUsuario;
        customer = await CustomerRepo.insertarCustomer(datosCustomer, transaction);

        transaction.commit();
        return "Usuario customer registrado";

    } catch (error) {
        console.log(error);
        transaction.rollback();
        throw error;
    }
}

// Insertar un usuario basico y un customer correspondiente
const insertBasicUser = async (uid, correo) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    let datosUsuario = {};
    let datosCustomer = {};
    try {
        if (!uid || !correo) {
            throw new ErrorNegocio("Hacen falta datos");
        }
        /* Insertar el usuario */

        // Colocar los datos de usuario
        datosUsuario.tipoUsuario = "customer";
        datosUsuario.emailUsuario = correo;
        datosUsuario.uidFirebase = uid;

        usuario = await UsuariosRepo.insertarUsuario(datosUsuario, transaction);

        transaction.commit();
        return usuario;

    } catch (error) {
        console.log(error);
        transaction.rollback();
        throw error;
    }
}

/* Metodos de delete*/
// Borrar un usuario y un customer correspondiente
const deleteUsuarioCustomer = async (idUsuario, idCustomer) => {
    const transaction = await sequelize.transaction(); // Iniciar la transacción

    try {
        if (!idUsuario || !idCustomer) {
            throw new ErrorNegocio("Hacen falta datos para borrar");
        }

        // Verificar que el customer si esté vinculado al usuario
        const customer = await Customer.findByPk(idCustomer);

        if (!customer || customer.idUsuario != idUsuario) {
            throw new ErrorNegocio("El customer ingresado no coincide con el id del usuario");
        }

        // Obtener los inmuebles (El servicio de filtros tiene esta logica)
        let dato = {};
        dato.idCustomer = idCustomer;
        dato.urlLogo = customer.logoCustomer;
        const inmuebles = await FiltrosInmuebleService.getInmueblesUsuario(dato);

        // Borrar los inmuebles (el servicio de inmuebles ya tiene esta logica)
        await Promise.all(
            inmuebles.map((inmueble) => InmuebleService.eliminarInmueble({ idInmueble: inmueble.dataValues.id }))
        );
        console.log("borrar");

        // borrar el usuario. El customer e inmuebles se borran por cascada
        await UsuariosRepo.borrarUsuario(idUsuario);


        // Borrar fotos del logo del customer
        deleteMultimediaServidor("fotos", dato.urlLogo, "customers");
        transaction.commit();
        return "Usuario customer borrado";

    } catch (error) {
        console.log(error);
        transaction.rollback();
        throw error;
    }
}

module.exports = {
    getAllUsuarios,
    getUserByUID,
    getUserByEmail,
    insertUsuarioCustomer,
    insertBasicUser,
    deleteUsuarioCustomer
}