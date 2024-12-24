/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const tipoInmueblePerfilRepo = require('../repositories/TipoInmueblePerfilRepo');

/* Metodos consulta */
// Trae los inmuebles perfil dadas condiciones
const getInmueblesPerfil = async (idTipo = null, idPerfil = null) => {
    try {
        let datos = {};
        if (idTipo) {
            datos.idTipoInmueble = idTipo;
        }

        if (idPerfil) {
            datos.idPerfil = idPerfil;
        }

        msg = await tipoInmueblePerfilRepo.getAllTipoInmueblePerfil(datos);
        return msg;

    } catch (error) {
        throw error;
    }
}

// Verificar que un perfil pueda crear un tipo de inmueble
const verificarPerfil = async(idPerfil, idTipo) => {
    try {
        console.log(idPerfil);
        console.log(idTipo);
        let tipoInmueblePerfil = await tipoInmueblePerfilRepo.verificarPerfilInmueble(idPerfil, idTipo);
        return tipoInmueblePerfil;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getInmueblesPerfil,
    verificarPerfil
}