import { formatPrecio} from "../GeneralUtils";

// Dar formato a varios servicios del backend
export const formatServicioData = (servicios) => {
    return servicios.map((servicio) => ({
        id:servicio.idServicio,
        titulo: servicio.nombreServicio,
        descripcion:servicio.descripcionServicio,
        precio: "$"+formatPrecio(servicio.precioServicio),
        imagen: generarFotoPrincipal(servicio),
        boton:"Contactar a un asesor"
    }))
}

// Generar la URL de la foto principal del servicio
const generarFotoPrincipal = (servicio) => {
    if (servicio.fotoServicio != null) {
        const uploadsPath = import.meta.env.VITE_RUTA_FOTO_SERVICIOS;
        return uploadsPath + "/" + servicio.fotoServicio
    }
    return null;
}
