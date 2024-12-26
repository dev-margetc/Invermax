import { formatPrecio } from "./GeneralUtils";
// Transforma datos del backend que lleguen como planes agrupados por tipo de perfil
export const formatPerfilPlanData = (tipos) => {
  const result = {};
  tipos.forEach((tipo) => { // Recorrer el array
    result[convertirPrimeraMayuscula(tipo.perfil)] = tipo.planes.map((plan) => ({ // La clave del objeto será el tipo de perfil
      idPlan: plan.idPlan,
      
      titulo: plan.tipoPlan,

      proyectos: asignarCantidadInmueble(tipo, plan.caracteristicasPlanes), // Cantidad y tipo

      caracteristicas: asignarCaracteristicas(plan.caracteristicasPlanes),

      precios: asignarPrecios(plan)
    }));
  });
  return result;
};

// Convierte un string convirtiendo su primera letra en mayuscula
const convertirPrimeraMayuscula = (txt) => {
  return txt.charAt(0).toUpperCase() + String(txt).slice(1)
}
// mostrar tipos de inmuebles que pueden crear, para evitar carga extra a la BD se coloca acá
const asignarCantidadInmueble = (perfil, caracteristicasPlanes) => {

  // Buscar la característica 'inmuebles_creados' usando find
  const inmueble = caracteristicasPlanes.find(car => car.caracteristica.claveCaracteristica === "inmuebles_creados");

  // Si se encuentra el valor, asignar el texto 
  if (inmueble) {
    const cantidad = inmueble.valorCaracteristica;
    return perfil === 'constructora' ? `${cantidad} proyectos.` : `${cantidad} propiedades.`;
  }

  // En caso de que no se encuentre la característica, se puede devolver un valor por defecto
  return 'Cantidad no disponible';
}

// Mostrar las caracteristicas del plan excepto aquella con la clave inmuebles_creados
const asignarCaracteristicas = (caracteristicasPlanes) => {
  return caracteristicasPlanes
    .filter(c => c.caracteristica.claveCaracteristica !== "inmuebles_creados") // Filtrar todas menos la del inmuebles_creados
    .map(c => c.caracteristica.nombreCaracteristica);
}

// Asignar los precios de cada plan
const asignarPrecios = (plan) => {
  if (!plan.precios || plan.precios.length === 0) {
    return [];
  }
  // Mapear cada precio 
  return plan.precios.map(precio => ({
    id: precio.idPrecioPlan,
    price: formatPrecio(precio.precio), // Formateo del precio
    duration: precio.duracion ? `${precio.duracion} meses.` : "Indefinido", // Manejo de duración nula
    idPlan: plan.idPlan
  }));
};
