// Se interactua con la base de datos haciendo uso de sequelize o personalizadas
const sequelize = require("../../../conf/database");

const Caracteristica = require("../entities/Caracteristica");
const CaracteristicaPlan = require("../entities/CaracteristicaPlan");

/* Metodos consulta*/

// Trae una caracteristicaPlan  dado su id de caracteristica, id del plan y la clave de la caracteristica
//const getCaracteristicaPlan(idCaracteristica, )