/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const { filtrarCampos } = require("../../../utils/utils");

const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");
const sequelize = require("../../../conf/database");
const AliadoRepo = require("../repositories/AliadoRepository");

/* Metodos de lectura*/


// Trae todos los aliados dada una o mas id de categoria, si está vacio trae todos
const getAliados = async (datos) => {
    try {
        /// Los datos llegan asi del query: ids=1,2,3
        const { categorias } = datos; // Traer los ids
        let idCategorias = null;
        if (datos.categorias) {
            idCategorias = categorias.split(',').map(Number); // Convierte la lista de IDs en un array de números
        }
        const filtro = filtrarCampos(datos, ["idAliado", "nombreAliado", "logoAliado", "urlRedireccion"])
        let aliados = await AliadoRepo.getAllAliados(filtro, idCategorias);
        return aliados;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/* Metodos de creacion*/
const registrarAliado = async (datosAliado) => {
    try {

        let aliado = await AliadoRepo.insertarAliado(datosAliado);
        if (aliado) {
            return "Aliado " + aliado.idAliado + " Creado correctamente"
        }

    } catch (error) {
        throw error;
    }
}

/* Metodos de actualizacion*/
const actualizarAliado = async (datosAliado) => {
    try {
        // Campos permitidos para actualizar
        const campos = ["urlRedireccion", "logoAliado", "nombreAliado"];

        // Filtraar los datos permitidos
        const aliadoData = filtrarCampos(datosAliado, campos);

        /* Si los nuevos datos tienen la foto entonces se debe eliminar la anterior*/
        if(aliadoData.logoAliado){
            const aliados = await AliadoRepo.getAllAliados({idAliado: datosAliado.idAliado});
            // Eliminar la foto si la tenia
            if(aliados[0].logoAliado){
                await deleteMultimediaServidor("fotos", aliados[0].logoAliado, "aliados");
            }
        }

        // Actualizar los datos
        await AliadoRepo.actualizarAliado(datosAliado.idAliado, aliadoData);


        return "Datos actualizados del aliado " + datosAliado.idAliado;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

/* Metodos de borrado*/
const eliminarAliado = async (idAliado) => {
    try {
        // Traer el aliado
        const listaAliados = await AliadoRepo.getAllAliados({ idAliado });
        const aliado = listaAliados[0];

        // Borrar el aliado
        await AliadoRepo.eliminarAliado(idAliado);

        // Si el aliado tenia logo se elimina
        if(aliado.logoAliado){
            await deleteMultimediaServidor("fotos", aliado.logoAliado, "aliados")
        }

        return "Aliado eliminado";
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    getAliados,
    registrarAliado,
    actualizarAliado,
    eliminarAliado,
}
