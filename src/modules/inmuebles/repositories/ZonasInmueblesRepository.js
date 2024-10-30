// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");
const Inmueble = require("../entities/Inmueble");
const Zona = require("../entities/Zona");

// Asociar un inmueble con una o mas zonas
const asociarZona = async (inmueble, zona) => {
    try {
      await inmueble.addZonas(zona);
      return "Inmueble relacionado con las zonas correctamente"
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    asociarZona
  }