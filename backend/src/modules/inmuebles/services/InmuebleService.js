/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const TipoInmueble = require("../entities/TipoInmueble");
const sequelize = require("../../../conf/database");
const { construirCondiciones } = require("../../../utils/utils");

const CustomerService = require("../../usuarios/services/CustomerService");
const FiltrosInmuebleService = require("./FiltrosInmuebleService");
const CaracteristicaService = require("../../suscripciones/services/CaracteristicasService");
const caracteristicaRepo = require("../../suscripciones/repositories/CaracteristicaRepository");
const inmuebleRepository = require("../repositories/InmuebleRepository");
const DetalleService = require("./DetalleService");
const zonaInmuebleService = require("./ZonasInmueblesService");
const InteresadoRepo = require("../repositories/InteresadoRepository");
const destacadoRepo = require("../../suscripciones/repositories/DestacadoRepository");
const TipoInmueblePerfilService = require("../services/TipoInmueblePerfilService");
const suscripcionRepo = require("../../suscripciones/repositories/SuscripcionRepository");
const { deleteMultimediaServidor } = require("../../../middleware/uploadConfig");


const insertarInmueble = async (datosInmueble) => {
    try {
        const { idTipoInmueble, estadoInmueble, modalidadInmueble, administracion } = datosInmueble.inmueble;

        // Buscar el tipo de inmueble por ID
        const tipoInmueble = await TipoInmueble.findByPk(idTipoInmueble);

        if (!tipoInmueble) {
            throw new ErrorNegocio("Tipo de inmueble no encontrado");
        }

        // traer el perfil de customer
        let customer = await CustomerService.getAllCustomers({ idCustomer: datosInmueble.inmueble.idCustomer });
        let perfil = customer[0].perfil;

        // Verificar que el tipo de customer si pueda crear este tipo de inmuebles
        await TipoInmueblePerfilService.verificarPerfil(perfil.idPerfil, tipoInmueble.idTipoInmueble);

        // Verificar que el usuario si pueda crear un inmueble dado su plan
        await CaracteristicaService.verificarInmueblesCreacion(datosInmueble.inmueble.idCustomer);

        /* Verificar si el usuario puede insertar iFrame*/
        if (datosInmueble.inmueble.frameMaps) {
            await CaracteristicaService.verificarUsoIFrame(datosInmueble.inmueble.idCustomer);
        }
        // Verificar si el tipo es "proyecto" y es valido
        if (tipoInmueble.tipoInmueble === 'proyecto' && estadoInmueble !== 'nuevo') {
            throw new ErrorNegocio("Los inmuebles de tipo 'proyecto' deben ser nuevos.");
        }

        // Verificar si el tipo es "proyecto" y no de arriendo
        if (tipoInmueble.tipoInmueble === 'proyecto' && modalidadInmueble != 'compra') {
            throw new ErrorNegocio("Los inmuebles de tipo 'proyecto' no pueden tener esta modalidad.");
        }

        // Verificar si es arriendo entonces el campo de administracion no puede ser null
        if (modalidadInmueble === 'arriendo' && (!administracion)) {
            throw new ErrorNegocio("Los inmuebles en modalidad de arriendo deben especificar si incluyen o no la administracion.");

        }

        // Extraer los campos y modificar los que se necesiten. Tambien se agrega lo que no viene en el front
        datosInmueble.inmueble.estadoPublicacionInmueble = "borrador";

        /*Si es valido se crea el inmueble con los detalles*/
        let msg = await inmuebleRepository.insertarInmuebleDetalles(datosInmueble.inmueble, tipoInmueble.tipoInmueble === 'proyecto');
        return msg;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Traer los interesados de un inmueble
const traerInteresados = async (datos) => {
    const { idInmueble } = datos;
    if (idInmueble) {
        return InteresadoRepo.getInteresadosInmueble(idInmueble);
    } else {
        throw new ErrorNegocio("Inmueble no colocado");
    }

}

// Traer los tipos de inmueble
const getAllTipos = async () => {
    try {
        const tipos = TipoInmueble.findAll();
        return tipos;
    } catch (error) {
        throw error;
    }
}


//Actualizar inmueble con detalles
const actualizarInmuebleDetalles = async (datos, params) => {
    const { inmueble } = datos;
    const { idInmueble } = params
    const listaDetalles = datos.detalles;
    const zonas = inmueble.zonas;
    const { estadoPublicacionInmueble } = inmueble;
    // crear transaccion
    const transaction = await sequelize.transaction(); // Iniciar la transacción
    try {
        let customer = await CustomerService.getAllCustomers({ idCustomer: datos.idCustomer });
        // Si se trata de cambiar el estado a publicado
        if (estadoPublicacionInmueble == "publicado") {

            // Verificar que el estado del customer sea activo (validar con modulo usuarios)
            let estadoCustomer = customer[0].dataValues.estadoCustomer;

            if (estadoCustomer == "inactivo" || estadoCustomer == "nuevo") {
                throw new ErrorNegocio("Este estado no le permite publicar inmuebles");
            }
            /* Verificar que el usuario no tenga mas inmuebles de los debidos*/

            /* Traer la cantidad de inmuebles que puede crear segun su suscripcion activa*/
            let cantidadMaxima = await caracteristicaRepo.obtenerCaracteristicaDisponible(datos.idCustomer, "inmuebles_creados");

            /* Contar la cantidad de inmuebles que tiene el customer */
            let inmueblesCustomer = await inmuebleRepository.getInmueblesUsuario(datos.idCustomer);

            /* Verificar que la cantidad actual no sea mayor */
            if (inmueblesCustomer.length > cantidadMaxima) {

                // Si es mayor lanzar un error, si no, no pasa nada
                throw new ErrorNegocio("Has alcanzado el limite de " + cantidadMaxima + " inmuebles. Actualmente tiene "
                    + inmueblesCustomer.length + ". Borra los sobrantes antes de poder hacer esto."
                );
            }
        }

        //Si hay un nuevo tipo y este es arriendo se valida que arriendo no sea null
        if (inmueble.modalidadInmueble == "arriendo" && !inmueble.administracion) {
            throw new ErrorNegocio("La modalidad de arriendo requiere que se especifique si la administración está incluida");
        }

        /* Verificar si el usuario puede insertar iFrame*/
        if (inmueble.frameMaps) {
            await CaracteristicaService.verificarUsoIFrame(customer[0].idCustomer);
        }

        // actualizar el inmueble
        await inmuebleRepository.actualizarInmueble(inmueble, idInmueble, transaction);

        // Si hay zonas se actualizan
        if (zonas) {
            await zonaInmuebleService.actualizarZonasInmuebles(zonas, idInmueble, transaction);
        }
        // Actualizar detalles si hay
        if (listaDetalles) {
            // Validar si alguno de los detalles tiene el campo iframe
            const tieneIframe = listaDetalles.some(detalle => detalle.frameRecorrido);
            /* Verificar si el usuario puede insertar iFrame*/
            if (tieneIframe) {
                await CaracteristicaService.verificarUsoIFrame(customer[0].idCustomer);
            }
            await DetalleService.actualizarDetallesInmueble(listaDetalles, idInmueble, transaction);
        }

        await transaction.commit();
        // Retornar el inmueble actualizado
        const inmuebleActualizado = await inmuebleRepository.getInmuebleByID(idInmueble);
        const msg = {}
        msg.inmueble = inmuebleActualizado;
        msg.message = "Inmueble actualizado";
        return msg;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        throw error
    }
}

const eliminarInmueble = async (params) => {
    const { idInmueble, customer } = params;
    try {

        /* 1. Verificar si el inmueble está activo como inmueble destacado*/

        /* 1.1 Generar el codigo con la suscripcion */
        const condicionesSuscripcion = construirCondiciones({ idCustomer: customer, estadoSuscripcion: "activa" });
        const suscripcionesActiva = await suscripcionRepo.getSuscripcionesFechaFin(condicionesSuscripcion);
        let fechaInicio = suscripcionesActiva[0].fechaInicioSuscripcion;
        let idSuscripcion = suscripcionesActiva[0].idSuscripcion;
        const codigo = destacadoRepo.generarCodigoPeriodo(fechaInicio, idSuscripcion);
        /* 1.2. Verificar si el inmueble tiene ese codigo*/
        const condicionesDestacado = construirCondiciones({ idInmueble, codigoPeriodo: codigo });
        const destacado = await destacadoRepo.traerDestacados(condicionesDestacado);
        if (destacado.length > 0) {
            throw new ErrorNegocio("No se puede eliminar este inmueble pues lo ha seleccionado como destacado. Comuniquese con soporte para eliminarlo. ")
        }
        /**2. Traer los detalles y fotos */
        //  Traer detalles (para sus ID)
        const detalles = await DetalleService.obtenerDetallesPorInmueble(idInmueble);

        // Extraer los IDs de los detalles
        const idsDetalles = detalles.map(detalle => detalle.dataValues.idDetalle);

        // Obtener fotos para cada idDetalle de forma concurrente
        const fotosPorDetalle = await Promise.all(
            idsDetalles.map(idDetalle => DetalleService.getFotoDetalle(idDetalle))
        );

        // Obtener videos para cada idDetalle de forma concurrente
        const videosPorDetalle = await Promise.all(
            idsDetalles.map(idDetalle => DetalleService.getVideoDetalle(idDetalle))
        );

        // Extraer las URLs de las fotos encontradas
        const urlsFoto = fotosPorDetalle.flatMap(fotos => fotos.map(foto => foto.urlFoto));

        // URL fotos por video
        const urlsVideo = videosPorDetalle.flatMap(videos => videos.map(video => video.urlVideo));

        /**3. Ejecutar borrado de inmuebles y fotos */
        // Borrar inmueble, proyectos, detalles y fotos por cascade
        await inmuebleRepository.borrarInmueble(idInmueble);

        // Borrar archivos de fotos de detalles

        await Promise.all(
            urlsFoto.map(url => deleteMultimediaServidor("fotos", url, "inmuebles"))
        );

        // Borrar archivos de videos de detalles
        await Promise.all(
            urlsVideo.map(url => deleteMultimediaServidor("videos", url, "inmuebles"))
        );
        return "Inmueble borrado correctamente. ";
    } catch (error) {
        throw error;
    }

}

// Verificar que el id de un usuario coincida con el de un customer y este sea el dueño de un inmueble
const isUsuarioDueño = async (idUsuario, idInmueble) => {
    // Obtener el customer
    let datos = {};
    datos.idUsuario = idUsuario;
    datos.idInmueble = idInmueble;
    const customer = await CustomerService.getAllCustomers(datos); // Traer customer 

    // Si no se encuentra el customer
    if (!customer || !customer[0]) {
        return false;
    }

    datos.idCustomer = customer[0].dataValues.idCustomer;
    // Usar el ID del customer y verificar si tiene un inmueble con ese ID
    const inmuebles = await FiltrosInmuebleService.getInmueblesUsuario(datos);

    const inmuebleEncontrado = inmuebles.find(inmueble => inmueble.idCustomer === datos.idCustomer);

    return inmuebleEncontrado;
}



module.exports = {
    insertarInmueble,
    actualizarInmuebleDetalles,
    getAllTipos,
    eliminarInmueble,
    traerInteresados,
    isUsuarioDueño
}
