// Metodos que sirven para varios utils

// Generar formato de precio
export const formatPrecio = (valor) => {
   return `$${parseFloat(valor).toLocaleString("es-CO")}`; // Formateo del precio
}

// Convierte un string convirtiendo su primera letra en mayuscula
export const convertirPrimeraMayuscula = (txt) => {
  return txt.charAt(0).toUpperCase() + String(txt).slice(1)
}

// Generar un string de consulta para una url
export const createQueryString = (filters) => {
   const params = new URLSearchParams();
   for (const [key, value] of Object.entries(filters)) { //Recorrer el objeto filtro
     if (Array.isArray(value)) {
       // Si el valor es un array, agrega cada elemento como un parámetro
       value.forEach((val) => params.append(key, val));
     } else if (value !== undefined && value !== null && value !== '') {
       // Agregar solo valores no vacíos
       params.append(key, value);
     }
   }
   return params.toString(); // Devuelve la query string
 };
 