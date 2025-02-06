/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const { filtrarCampos } = require("../../../utils/utils");

const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");

const ServicioRepo = require("../repositories/ServicioRepository");


/* Metodos de lectura*/


// Trae todos los servicios dada una o mas id de categoria, si está vacio trae todos
const getServicios = async (datos) => {
    try {
        const filtro = filtrarCampos(datos, ["idServicio", "codigoServicio", "nombreServicio", "descripcionServicio", "precioServicio", "fotoServicio"])
        let servicios = await ServicioRepo.getAllServicios(filtro);
        return servicios;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/* Metodos de creacion*/
const registrarServicio = async (datosServicio) => {
    try {
        console.log(datosServicio);
        let servicio = await ServicioRepo.insertarServicio(datosServicio);
        if (servicio) {
            const msg = {};
            msg.message = "Servicio creado corectamente";
            msg.servicio = servicio.idServicio;
            return msg;
        }

    } catch (error) {
        throw error;
    }
}



/* Metodos de actualizacion*/
const actualizarServicio = async (datosServicio) => {
    try {
        // Campos permitidos para actualizar
        const campos = ["nombreServicio", "descripcionServicio", "precioServicio", "codigoServicio", "fotoServicio"];

         /* Si los nuevos datos tienen la foto entonces se debe eliminar la anterior*/
         if(datosServicio.fotoServicio){
            const servicios = await ServicioRepo.getAllServicios({idServicio: datosServicio.idServicio})
            // Eliminar la foto si la tenia
            if(servicios[0].fotoServicio){
                await deleteMultimediaServidor("fotos", servicios[0].fotoServicio, "servicios");
            }
        }
        // Filtraar los datos permitidos
        const servicioData = filtrarCampos(datosServicio, campos);

        await ServicioRepo.actualizarServicio(datosServicio.idServicio, servicioData);

        const msg = {};
        msg.message = "Datos actualizados del servicio ";
        msg.servicio = datosServicio.idServicio;
        return  msg;
    }
    catch (err) {
        throw err;
    }
}

/* Metodos de borrado*/
const eliminarServicio = async (idServicio) => {
    try {
        await ServicioRepo.eliminarServicio(idServicio);

        return "Servicio eliminado  ";
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    getServicios,
    registrarServicio,
    actualizarServicio,
    eliminarServicio
}
