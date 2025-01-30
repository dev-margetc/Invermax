// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const TipoInmueble = require("../entities/TipoInmueble");
const TipoInmueblePerfil = require("../entities/TipoInmueblePerfil");
const PerfilCustomer = require("../../usuarios/entities/PerfilCustomer");
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");


/* Metodos GET*/

//Verificar que un perfil pueda crear un tipo de customer
async function verificarPerfilInmueble(idPerfil, idTipoInmueble) {
    const tipoInmueblePerfil = await TipoInmueblePerfil.findOne({
        where: {
            idPerfil: idPerfil,
            idTipoInmueble: idTipoInmueble,
        },
    });

    if (!tipoInmueblePerfil) {
        throw new ErrorNegocio('El perfil no puede crear este tipo de inmuebles.');
    }

    return tipoInmueblePerfil;
}

//Traer todos los registros dado condiciones
async function getAllTipoInmueblePerfil(condiciones = null) {
    const filtro = { ...condiciones || {} } // Combinar condiciones extra
    const tipoInmueblePerfil = await TipoInmueblePerfil.findAll(
        {
            attributes: {
                exclude: ["id_perfil", "id_tipo_inmueble"]
            },
            include: [{
                model: TipoInmueble,
                as: "tipoInmueble"
            }],
            where: filtro
        }
    );


    return tipoInmueblePerfil;
}

module.exports = {
    verificarPerfilInmueble,
    getAllTipoInmueblePerfil
}
