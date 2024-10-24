/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const ciudadRepository = require("../repositories/CiudadRepository");

const getDepartamentosConCiudades= async ()=>{ 
    const departamentos = await ciudadRepository.getDepartamentosConCiudades();
    return departamentos;
}
module.exports = {
    getDepartamentosConCiudades
}