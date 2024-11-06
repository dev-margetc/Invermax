// Define las relaciones entre los modelos de sequelize

const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");

// Un usuario solo tiene un customer asociado
Usuario.hasOne(Customer, {
    foreignKey: 'idUsuario', // Clave foránea en la tabla de customer
    as: 'customer' // Alias para la relación
  });
  
  // Un customer pertence solo a un usuario
  Customer.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
  