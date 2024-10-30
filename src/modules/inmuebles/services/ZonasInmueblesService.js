/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const Inmueble = require("../entities/Inmueble");
const ZonaInmuebles = require("../entities/ZonasInmuebles");
const inmuebleRepository = require("../repositories/InmuebleRepository");
const ZonasInmueblesRepository = require("../repositories/ZonasInmueblesRepository");


//Agregar zona
const agregarZona = async (datos) => {
    try {
        //idZona puede ser una lista de id de zonas
        const { idZona, idInmueble } = datos;

        // Buscar por ID el inmueble
        const inmueble = await Inmueble.findByPk(idInmueble);

        if (!inmueble) {
            throw new Error("Inmueble no encontrado");
        }

        /*Si es valido se inserta en la intermedia definida en asociaciones*/
        msg = await ZonasInmueblesRepository.asociarZona(inmueble, idZona);
        return msg;

    } catch (error) {
        return error.message;
    }
}

// Elimina todas las zonas asociadas a un inmueble y asocia las de la lista
const actualizarZonasInmuebles = async (zonas, idInmueble, transaction) => {

    try {
        // Buscar por ID el inmueble
        const inmueble = await Inmueble.findByPk(idInmueble);

        // Elimina todas las zonas asociadas al inmueble
        await inmueble.setZonas([], { where: { idInmueble }, transaction });

        // Agrega las nuevas zonas
        if (zonas && zonas.length > 0) {
            await inmueble.addZonas(zonas, { transaction }); // Agrega las nuevas zonas
        }
    }catch(error){
        console.log(error);
        throw error;
    }
      
}


module.exports = {
    agregarZona, actualizarZonasInmuebles
}
