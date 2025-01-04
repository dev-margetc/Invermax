// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const DetalleInmueble = require("../entities/DetalleInmueble");
const Inmueble = require("../entities/Inmueble");
const Proyecto = require("../entities/Proyecto");
const VistaPublicados = require("../entities/VistaInmueblesPublicados");
const Ciudad = require("../entities/Ciudad");
const TipoInmueble = require("../entities/TipoInmueble");
const Zona = require("../entities/Zona");
const Foto = require("../entities/Foto");
const Video = require("../entities/Video");
const Customer = require("../../usuarios/entities/Customer");
const InmuebleAscenso = require("../../suscripciones/entities/InmuebleAscenso");
const InmuebleDestacado = require("../../suscripciones/entities/InmuebleDestacado");

//Crea un inmueble con sus detalles y proyecto si es el caso
//Recibe los datos con detalles y una confirmación de si es proyecto
const insertarInmuebleDetalles = async (datosInmueble, isProyecto) => {
  const transaction = await sequelize.transaction(); // Iniciar la transacción
  try {

    //Crear el inmueble
    const inmueble = await Inmueble.create({
      ...datosInmueble, // Desestructura los campos que coinciden
      detalles: datosInmueble.detalles // Se manejan luego los detalles
    }, { transaction });

    // Se obtiene el id del inmueble creado
    const inmuebleId = inmueble.idInmueble;

    //Si el inmueble es tipo proyecto se inserta
    idProyecto = null;
    if (isProyecto) {
      const proyecto = await Proyecto.create({
        ...datosInmueble.proyecto,
        idInmueble: inmuebleId
      }, { transaction })

      //Se obtiene el id del proyecto si fue creado
      idProyecto = proyecto.idProyecto;
    }

    // Iterar sobre los detalles y crear cada registro en DetalleInmueble
    const detalles = datosInmueble.detalles;
    for (const detalle of detalles) {
      await DetalleInmueble.create({
        ...detalle,
        idInmueble: inmuebleId, // Usar el id del inmueble insertado
        idProyecto: idProyecto //Id del proyecto insertado o NULL
      }, { transaction });
    }
    await transaction.commit(); // Confirmar la transacción
    msg = "Inmueble con detalles creado correctamente.";
    if (isProyecto) {
      msg = "Proyecto creado correctamente."
    }
    return msg;
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción en caso de error
    throw error;
  }
};

const traerAtributosAvanzados = (isFiltro = false) => {

  const attributes = [
    // Valor minimo y maximo de inmuebles
    [sequelize.fn('MIN', sequelize.col('inmueble.detalles.valor_inmueble')), 'valorMinimoDetalles'],
    [sequelize.fn('MAX', sequelize.col('inmueble.detalles.valor_inmueble')), 'valorMaximoDetalles'],


    // Obtener una foto del primer detalle     
    [sequelize.literal('(SELECT url_foto FROM fotos WHERE fotos.id_detalle_inmueble IN (SELECT id_detalle FROM detalles_inmuebles WHERE detalles_inmuebles.id_inmueble = inmueble.id_Inmueble) LIMIT 1)'), 'fotoPrincipal'],

  ];

  if (isFiltro) {
    attributes.push(
      // Valor minimo de área (usando sequelize.fn y la relación)
      [sequelize.fn('MIN', sequelize.col('inmueble.detalles.area')), 'areaMinima'],

      // Valor minimo de baños (usando sequelize.fn y la relación)
      [sequelize.fn('MIN', sequelize.col('inmueble.detalles.cantidad_baños')), 'cantidadMinBaños'],

      // Valor minimo de habitaciones (usando sequelize.fn y la relación)
      [sequelize.fn('MIN', sequelize.col('inmueble.detalles.cantidad_habitaciones')), 'cantidadMinHabitaciones'],
    );
  }

  return attributes;
};



// Traer los inmuebles con el estado de publicado (incluyendo proyectos)
const getPublicados = async () => {
  try {

    const inmuebles = await VistaPublicados.findAll({
      attributes: { exclude: ['idTipoInmueble', 'cod_ciudad', 'id_inmueble', 'idCustomer'] },
      include: [
        {
          model: Inmueble, // Relacion con el modelo inmueble
          as: 'inmueble',
          attributes: [ // Traer ciertos campos para aplicar el filtro
            'idInmueble', 'codigoInmueble', 'modalidadInmueble',
            ...traerAtributosAvanzados(true)
          ],
          include: [ // Incluir por medio de inmueble
            {
              model: DetalleInmueble,
              as: "detalles",
              attributes: ["parqueadero", "amoblado",]
            },
            { // Incluir el tipo
              model: TipoInmueble,
              as: "tipoInmueble",
              attributes: ["tipoInmueble", "idTipoInmueble"]
            },
            // Incluir zonas
            {
              model: Zona,
              as: "zonas",
              attributes: ['idZona'],
              through: { attributes: [] }, // Excluir los atributos de la tabla pivote
            },
            // Incluir el customer
            {
              model: Customer,
              as: "customer",
              attributes: ['nombreCustomer', 'idCustomer']
            },
            // Agregar inmuebles en ascenso
            {
              model: InmuebleAscenso, // Relación con ascensos
              as: "inmueblesAscenso",
              attributes: ['idAscenso'], // Atributo necesario para identificar si está en ascenso
              where: { estadoAscenso: 1 }, // Solo los que están activos
              required: false// Incluye la relación solo si existe
            },
            // Agregar inmuebles en ascenso
            {
              model: InmuebleDestacado, // Relación con ascensos
              as: "inmueblesDestacados",
              attributes: ['idDestacado'], // Atributo necesario para identificar si está en ascenso
              where: { estadoDestacado: 1 }, // Solo los que están activos
              required: false// Incluye la relación solo si existe
            },
            // Informacion de la ciudad
            {
              as: 'ciudad', // Se usa el alias definido en la relacion
              model: Ciudad,
              attributes: ['nombreCiudad'], // Traer solo el nombre de la ciudad
            }
          ]
        }
      ],
      group: 'idInmueble' // Agrupar por ID inmueble
    });

    return inmuebles;
  } catch (error) {
    throw error;
  }
}

// Traer los inmuebles de un customer
const getInmueblesUsuario = async (idCustomer) => {
  const inmuebles = Inmueble.findAll({
    attributes: [
      "idInmueble", // Para renombrar se coloca a la izquierda el nombre que está en la BD
      "codigoInmueble",
      "tituloInmueble",
      "estadoPublicacionInmueble"
    ],
    include: [
      {
        model: DetalleInmueble,
        as: "detalles"
      }
    ],
    where: {
      idCustomer: idCustomer
    }
  });

  return inmuebles;
}

// Traer los inmuebles con un codigo
const getInmueblesCodigo = async (codigo) => {

  // Solamente trae el id si encuentra un inmueble con ese codigo
  const inmuebles = Inmueble.findAll({
    attributes: {
      include: [
        [sequelize.fn('MIN', sequelize.col('detalles.valor_inmueble')), 'valorMinimoDetalles'],
        [sequelize.fn('MAX', sequelize.col('detalles.valor_inmueble')), 'valorMaximoDetalles'],
        // Atributos avanzados agregados manualmente
      ],
      exclude: ['id_customer', 'idCustomer', 'codigoCiudad', 'cod_ciudad', 'idTipoInmueble', 'id_tipo_inmueble']
    },
    include: [ // Incluir detalles por medio de inmueble
      // Incluir zonas
      {
        model: Customer,
        as: "customer",
        attributes: ['idCustomer', 'nombreCustomer', 'logoCustomer']
      },
      {
        model: TipoInmueble,
        as: "tipoInmueble"
      },
      {
        as: 'proyecto', // Se usa el alias definido en la relacion
        model: Proyecto,
        attributes: ['idProyecto', 'fechaEntregaProyecto'], // Traer solo el nombre de la ciudad
      },
      {
        as: 'ciudad', // Se usa el alias definido en la relacion
        model: Ciudad,
        attributes: ['nombreCiudad'], // Traer solo el nombre de la ciudad
      },
      {
        model: Zona,
        as: "zonas"
      },
      {
        model: DetalleInmueble,
        as: "detalles",
        attributes: {
          exclude: ["idInmueble", "idProyecto", "id_inmueble"]
        },
        include: [{
          model: Foto,
          as: "fotos",
          attributes: ["idFoto", "urlFoto"]
        },
        {
          model: Video,
          as: "videos",
          attributes: ["idVideo", "urlVideo"]
        }
        ]
      }],
    where: {
      codigoInmueble: codigo
    }
  });

  return inmuebles;
}

// Traer los inmuebles y detalles con el ID
const getInmuebleByID = async (id) => {

  // Solamente trae el id si encuentra un inmueble con ese codigo
  const inmueble = await Inmueble.findOne({
    attributes: {
      exclude: ['id_customer', 'idCustomer', 'codigoCiudad', 'cod_ciudad', 'idTipoInmueble', 'id_tipo_inmueble']
    },

    include: [ // Incluir detalles por medio de inmueble
      // Incluir zonas
      {
        model: Customer,
        as: "customer",
        attributes: ['idCustomer', 'nombreCustomer', 'logoCustomer']
      },
      {
        model: TipoInmueble,
        as: "tipoInmueble"
      },
      {
        as: 'proyecto', // Se usa el alias definido en la relacion
        model: Proyecto,
        attributes: ['idProyecto', 'fechaEntregaProyecto'], // Traer solo el nombre de la ciudad
      },
      {
        as: 'ciudad', // Se usa el alias definido en la relacion
        model: Ciudad,
        attributes: ['nombreCiudad'], // Traer solo el nombre de la ciudad
      },
      {
        model: Zona,
        as: "zonas"
      },
      {
        model: DetalleInmueble,
        as: "detalles",
        attributes: {
          exclude: ["idInmueble", "idProyecto", "id_inmueble"]
        },
        include: [{
          model: Foto,
          as: "fotos",
          attributes: ["idFoto", "urlFoto"]
        },
        {
          model: Video,
          as: "videos",
          attributes: ["idVideo", "urlVideo"]
        }
        ]
      }],
    where: {
      idInmueble: id
    }
  });

  // Cálculo de valores mínimos y máximos separados
  const [valores] = await DetalleInmueble.findAll({
    attributes: [
      [sequelize.fn('MIN', sequelize.col('valor_inmueble')), 'valorMinimoDetalles'],
      [sequelize.fn('MAX', sequelize.col('valor_inmueble')), 'valorMaximoDetalles']
    ],
    where: {
      idInmueble: id
    }
  });

  return {
    ...inmueble.toJSON(),
    valorMinimoDetalles: valores.dataValues.valorMinimoDetalles,
    valorMaximoDetalles: valores.dataValues.valorMaximoDetalles
  };

}


// Actualizar inmueble
const actualizarInmueble = async (datos, idInmueble, transaccion = null) => {
  try {
    let nuevaTransaccion = false; // Bandera para saber si crearemos una transacción

    if (!transaccion) {
      transaccion = await sequelize.transaction();
      nuevaTransaccion = true; // Marcamos que es una transacción nueva
    }
    await Inmueble.update(datos, {
      where: { idInmueble },
      fields: ['codigoInmueble', 'estadoInmueble', 'modalidadInmueble', 'tituloInmueble', 'estrato', 'administracion',
        'tipoVivienda', 'codigoCiudad', 'idTipoInmueble', 'frameMaps', 'descripcionInmueble', 'estadoPublicacionInmueble'], // Campos permitidos para actualizar
      transaccion
    });
    if (nuevaTransaccion) {
      await transaccion.commit();
    }

  } catch (error) {
    throw error; // Lanzar error para que sea capturado en el controlador
  }
  return "editando " + datos;
}

// Borrar inmueble
const borrarInmueble = async (idInmueble) => {
  try {
    await Inmueble.destroy({ where: { idInmueble } });
    return "Inmueble borrado";
  } catch (error) {
    throw error; // Lanzar error para que sea capturado en el controlador
  }
}
module.exports = {
  insertarInmuebleDetalles,
  getPublicados,
  getInmuebleByID,
  getInmueblesUsuario,
  getInmueblesCodigo,
  actualizarInmueble,
  borrarInmueble,
  traerAtributosAvanzados
}
