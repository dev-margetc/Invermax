// Se interactua con la base de datos haciendo uso de sequelize o personalizadas

const Departamento = require('../entities/Departamento');
const Ciudad = require('../entities/Ciudad');
const { Op } = require("sequelize");

// Traer todos los departamentos con sus respectivas ciudades
const getDepartamentosConCiudades = async (req, res) => {
      const departamentos = await Departamento.findAll({
        include: [{ // Incluye las ciudades asociadas
          model: Ciudad,
          as: 'ciudades', // Se usa el alias definido en la relacion
          attributes: ['codCiudad', 'nombreCiudad', 'idDepartamento'] // Solo devuelve estos campos
      }] 
        
      });
  
      return (departamentos);
  };

  // Traer las ciudades que tengan una similitud en el nombre, trae su departamento anidado
  const getDepartamentoNombreCiudad = async (nombre) => {
    const departamentos = await Departamento.findAll({
      include: [{ // Incluye las ciudades asociadas
        model: Ciudad,
        as: 'ciudades', // Se usa el alias definido en la relacion
        attributes: ['codCiudad', 'nombreCiudad', 'idDepartamento'], // Solo devuelve estos campos
        where:{
          nombreCiudad: {[Op.like]: `%${nombre}%`}
        }
    }] 
      
    });

    return (departamentos);
};
  // Traer las ciudades que tengan una similitud en el nombre
  const getCiudadNombre = async (nombre) => {
    const ciudades = await Ciudad.findAll({
      where:{
        nombreCiudad:{[Op.like]:  `%${nombre}%`}
      },
      attributes:["codCiudad","nombreCiudad"],
      include:[
        {
          model: Departamento,
          as: "departamento",
          attributes:['idDepartamento', 'nombreDepartamento']
        }
      ]
    });

    return (ciudades);
};
  // Traer las ciudades de un departamento dado el ID del departamento
  const getCiudadesconIDDepartamento = async (idDepartamento) => {
    const departamentos = await Departamento.findAll({
      include: [{ // Incluye las ciudades asociadas
        model: Ciudad,
        as: 'ciudades', // Se usa el alias definido en la relacion
        attributes: ['codCiudad', 'nombreCiudad', 'idDepartamento'], // Solo devuelve estos campos
    }],
    where:{
      idDepartamento: idDepartamento
    } 
      
    });

    return (departamentos);
};
  module.exports = {
    getDepartamentosConCiudades,
    getDepartamentoNombreCiudad,
    getCiudadesconIDDepartamento,
    getCiudadNombre
}
