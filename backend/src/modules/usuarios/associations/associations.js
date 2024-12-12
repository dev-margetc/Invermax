// Define las relaciones entre los modelos de sequelize

const Usuario = require("../entities/Usuario");
const Customer = require("../entities/Customer");
const PerfilCustomer = require("../entities/PerfilCustomer");

// Un usuario solo tiene un customer asociado
Usuario.hasOne(Customer, {
    foreignKey: 'idUsuario', // Clave foránea en la tabla de customer
    as: 'customer' // Alias para la relación
  });
  
  // Un customer pertence solo a un usuario
  Customer.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });


  
/* Relaciones Customer - PerfilCustomer*/

// Un tipo de perfil puede tener muchos customer asociados
PerfilCustomer.hasMany(Customer, {foreignKey: 'id_perfil', as: 'customers'});

// Un customer solo puede pertenecer a un perfil
Customer.belongsTo(PerfilCustomer, {foreignKey:'id_perfil', as: "perfil"});
