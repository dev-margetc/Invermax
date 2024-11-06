/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const CustomerRepo = require("../repositories/CustomerRepository");

// Traer todos los customers. Valida si hay condiciones qué aplicar en la consulta
const getAllCustomers = async (datos) => {
    const { perfilCustomer } = datos;

    const condiciones = {};
    if (perfilCustomer) {
        condiciones.perfilCustomer = perfilCustomer;
    }
    const customers = await CustomerRepo.getAllCustomers(condiciones);
    return customers;
}

// Traer todos los customers pero limita a nombre, logo y tipo. 
//Valida si hay condiciones qué aplicar en la consulta
const getAllCustomersBasic = async (datos) => {
    const { perfilCustomer } = datos;

    const condiciones = {};
    if (perfilCustomer) {
        condiciones.perfilCustomer = perfilCustomer;
    }
    const customers = await CustomerRepo.getAllCustomers(condiciones);

    // Retornar solo info basica
    const results = customers.map(customer => ({
        nombreCustomer: customer.nombreCustomer,
        logoCustomer: customer.logoCustomer,
        perfilCustomer: customer.perfilCustomer
    }));
    return results;
}
module.exports = {
    getAllCustomers,
    getAllCustomersBasic
}