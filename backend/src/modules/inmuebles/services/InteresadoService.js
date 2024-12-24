/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const interesadoRepo = require("../repositories/InteresadoRepository")

const registrarInteresado = async (idInmueble, datosInteresado) => {
    try {
        msg = await interesadoRepo.insertarInteresado(datosInteresado, idInmueble);      
        return msg;

    } catch (error) {
        throw error;
    }
}


module.exports = {
    registrarInteresado
}