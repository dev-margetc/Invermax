/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/

const ciudadRepository = require("../repositories/CiudadRepository");

const getDepartamentosConCiudades= async ()=>{ 
    const departamentos = await ciudadRepository.getDepartamentosConCiudades();
    return departamentos;
}

const getCiudadesNombre= async (params)=>{ 
    const {nombreCiudad} = params;
    if(nombreCiudad){
        return await ciudadRepository.getDepartamentoNombreCiudad(nombreCiudad);
    }else{
        console.log("Nombre no proporcionado para la busqueda de ciudades");
    }
  
}

const getDepartamentosID= async (params)=>{ 
    try{
        const {idDepartamento} = params;
        if(idDepartamento){
            return await ciudadRepository.getCiudadesconIDDepartamento(idDepartamento);
        }else{
            console.log("id del departamento no proporcionado para la busqueda de ciudades");
        }
    }catch(err){
        throw err;
    }
   
}
module.exports = {
    getDepartamentosConCiudades,
    getCiudadesNombre,
    getDepartamentosID
}