/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const sequelize = require("../../../conf/database");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio")

const UsuariosRepo = require("../repositories/UsuariosRepository");
const CustomerRepo = require("../repositories/CustomerRepository");

/* Metodos de consulta*/
const getAllUsuarios= async ()=>{ 
    const usuarios = await UsuariosRepo.getAllUsuarios();
    return usuarios;
}

/* Metodos de insert*/
// Insertar un usuario y un customer correspondiente
const insertUsuarioCustomer= async (datosUsuario, datosCustomer)=>{ 
    const transaction = await sequelize.transaction(); // Iniciar la transacción

    try{
        if(!datosUsuario||!datosCustomer){
            throw new ErrorNegocio("Hacen falta datos");
        }
    // Insertar el usuario

    // Colocar el tipo como customer
    datosUsuario.tipoUsuario = "customer";

    usuario = await UsuariosRepo.insertarUsuario(datosUsuario, transaction);

    // Insertar el customer

    // Colocar el id del usuario recien creado

    datosCustomer.idUsuario = usuario.idUsuario;
    customer = await CustomerRepo.insertarCustomer(datosCustomer, transaction);

    transaction.commit();
    return "Usuario customer registrado";

    }catch(error){
        console.log(error);
        transaction.rollback();
        throw error;
    }
}


module.exports = {
    getAllUsuarios,
    insertUsuarioCustomer
}