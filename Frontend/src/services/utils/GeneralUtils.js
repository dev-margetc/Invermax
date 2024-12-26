// Metodos que sirven para varios utils
export const formatPrecio = (valor) => {
   return `$${parseFloat(valor).toLocaleString("es-CO")}`; // Formateo del precio
}