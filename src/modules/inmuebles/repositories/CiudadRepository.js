// Se interactua con la base de datos haciendo uso de sequelize o personalizadas

const Departamento = require('../entities/Departamento');
const Ciudad = require('../entities/Ciudad');

const getDepartamentosConCiudades = async (req, res) => {
      const departamentos = await Departamento.findAll({
        include: [{ // Incluye las ciudades asociadas
          model: Ciudad,
          as: 'ciudades', // Se usa el alias definido en la relacion
          attributes: ['id', 'nombre', 'idDepartamento'] // Solo devuelve estos campos
      }] 
        
      });
  
      return (departamentos);
  };

  module.exports = {
    getDepartamentosConCiudades,
}
