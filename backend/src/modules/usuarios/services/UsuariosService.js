/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const UsuariosRepo = require("../repositories/UsuariosRepository");

const getAllUsuarios= async ()=>{ 
    const usuarios = await UsuariosRepo.getAllUsuarios();
    return usuarios;
}
module.exports = {
    getAllUsuarios
}