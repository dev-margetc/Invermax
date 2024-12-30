/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const sequelize = require("../../../conf/database");
const Zona = require("../entities/Zona");

const getAllZonas = async () => {
    try {
        const zonas = Zona.findAll();
        return zonas;

    } catch (error) {
        console.error("Error obteniendo las zonas:", error);
        throw error;
    }
};

// Traer zonas comunes
const getAllZonasComunes = async () => {
    try {
        const zonas = Zona.findAll(
            {
                where: {
                    tipoZona: 'zona común'
                }
            }
        );
        return zonas;

    } catch (error) {
        console.error("Error obteniendo las zonas:", error);
        throw error;
    }
};

// Traer zonas dadas condiciones del modelo
const getAllZonasInteres = async () => {
    try {
        const zonas = Zona.findAll(
            {
                where: {
                    tipoZona: 'zona de interés'
                }
            }
        );
        return zonas;

    } catch (error) {
        console.error("Error obteniendo las zonas:", error);
        throw error;
    }
};

module.exports = {
    getAllZonas,
    getAllZonasComunes,
    getAllZonasInteres
}

