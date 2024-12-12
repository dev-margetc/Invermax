// Define las relaciones entre los modelos de sequelize del modulo de suscripciones
const Plan = require("../entities/Plan");
const Customer = require("../../usuarios/entities/Customer");
const Inmueble = require("../../inmuebles/entities/Inmueble");
const Suscripcion = require("../entities/Suscripcion");
const PrecioPlan = require("../entities/PrecioPlan");
const Caracteristica = require("../entities/Caracteristica");
const InmuebleAscenso = require("../entities/InmuebleAscenso");
const InmuebleDestacado = require("../entities/InmuebleDestacado");
const CaracteristicaPlan = require("../entities/CaracteristicaPlan");
const SaldoCaracteristica = require("../entities/SaldoCaracteristica");
const PerfilCustomer = require("../../usuarios/entities/PerfilCustomer");

/* Relaciones caracteristicas-caracteristicasPlanes */

// Una caracteristica puede estar asociada a varios planes por medio de caracteristicas_Planes
Caracteristica.hasMany(CaracteristicaPlan, { foreignKey: 'id_caracteristica', as: 'caracteristicasPlanes' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una CaracteristicaPlan solo asocia una caracteristica a la vez
CaracteristicaPlan.belongsTo(Caracteristica, { foreignKey: 'id_caracteristica', as: 'caracteristica' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones caracteristicas-saldosCaracteristicas */

// Una caracteristica puede tener varios saldos
Caracteristica.hasMany(SaldoCaracteristica, { foreignKey: 'id_caracteristica', as: 'saldosCaracteristica' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un saldo solo puede relacionarse con una caracteristica
SaldoCaracteristica.belongsTo(Caracteristica, { foreignKey: 'id_caracteristica', as: 'caracteristica' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones planes-caracteristicas-planes*/

// Un plan puede tener varias caracteristicas por medio de caracteristicas_Planes 
Plan.hasMany(CaracteristicaPlan, { foreignKey: 'id_plan', as: 'caracteristicasPlanes' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una caracteristicaPlan solo pertenece a un plan
CaracteristicaPlan.belongsTo(Plan, { foreignKey: 'id_plan', as: 'plan' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones planes-precios*/

// Un plan puede tener varios precios y duraciones
Plan.hasMany(PrecioPlan, { foreignKey: 'id_plan', as: 'precios' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una suscripcion solo pertenece a un plan
PrecioPlan.belongsTo(Plan, { foreignKey: 'id_plan', as: 'plan' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones precios-suscripciones*/

// Un precio puede asociarse a varias suscripciones
PrecioPlan.hasMany(Suscripcion, { foreignKey: 'id_precio_plan', as: 'suscripciones' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una suscripcion solo se asocia a un precio
Suscripcion.belongsTo(PrecioPlan, { foreignKey: 'id_precio_plan', as: 'precioPlan' }); // La fk es de la primaria por el tipo de relacion



/* Relaciones suscripciones-saldosCaracteristica*/

// Una suscripcion puede tener varios saldos
Suscripcion.hasMany(SaldoCaracteristica, { foreignKey: 'id_suscripcion', as: 'saldosCaracteristicas' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un saldo solo pertenece a una suscripcion
SaldoCaracteristica.belongsTo(Suscripcion, { foreignKey: 'id_suscripcion', as: 'suscripcion' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones suscripciones-customer*/

// Un customer puede tener varias suscripciones
Customer.hasMany(Suscripcion, { foreignKey: 'id_customer', as: 'suscripciones' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Una suscripcion solo pertenece a un customer
Suscripcion.belongsTo(Customer, { foreignKey: 'id_customer', as: 'customer' }); // La fk es de la primaria por el tipo de relacion


/* Relaciones inmueblesAscenso-inmuebles*/

// Un inmueble puede tener varios registros en ascenso
Inmueble.hasMany(InmuebleAscenso, { foreignKey: 'id_inmueble', as: 'inmueblesAscenso' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un ascenso solo pertenece a una suscripcion
InmuebleAscenso.belongsTo(Inmueble, { foreignKey: 'id_inmueble', as: 'inmueble' }); // La fk es de la primaria por el tipo de relacion

/* Relaciones inmueblesDestacado-inmuebles*/

// Un inmueble puede tener varios registros en destacado
Inmueble.hasMany(InmuebleDestacado, { foreignKey: 'id_inmueble', as: 'inmueblesDestacados' }); //La fk es de la foranea y se coloca como se conocera a los "muchos" de la relacion

// Un ascenso solo pertenece a una suscripcion
InmuebleDestacado.belongsTo(Inmueble, { foreignKey: 'id_inmueble', as: 'inmueble' }); // La fk es de la primaria por el tipo de relacion

/* Relaciones Plan - PerfilCustomer*/

// Un tipo de perfil puede tener muchos planes asociados
PerfilCustomer.hasMany(Plan, {foreignKey: 'id_perfil', as: 'planes'});

// Un plan solo puede pertenecer a un perfil
Plan.belongsTo(PerfilCustomer, {foreignKey:'id_perfil', as: "perfil"});


