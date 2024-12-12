/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const sequelize = require("../../../conf/database");
const PerfilRepo = require("../repositories/PerfilCustomerRepository");

/* Metodos GET*/

// Obtener un perfil dependiendo de su nombre
const getPerfilNombre = async (perfil) => {
    if (!perfil) {
        throw new ErrorNegocio("Perfil no colocado");
    }

    let condiciones = {};
    condiciones.perfil = perfil;

    const perfiles = await PerfilRepo.getPerfiles(condiciones);
    return perfiles;
}

module.exports = {
    getPerfilNombre
}