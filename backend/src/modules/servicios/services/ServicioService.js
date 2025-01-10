/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const { filtrarCampos } = require("../../../utils/utils");


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
            return "Servicio " + servicio.idServicio + " Creado correctamente"
        }

    } catch (error) {
        throw error;
    }
}



/* Metodos de actualizacion*/
const actualizarServicio = async (datosServicio) => {
    try {
        // Campos permitidos para actualizar
        const campos = ["nombreServicio", "descripcionServicio", "precioServicio", "codigoServicio"];

        // Filtraar los datos permitidos
        const servicioData = filtrarCampos(datosServicio, campos);

        await ServicioRepo.actualizarServicio(datosServicio.idServicio, servicioData);


        return "Datos actualizados del servicio " + datosServicio.idServicio;
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
