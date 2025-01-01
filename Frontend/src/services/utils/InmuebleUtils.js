import { formatPrecio } from "./GeneralUtils";

// Transforma datos del backend que lleguen como inmuebles publicados
export const formatInmueblePublicadoData = (publicados) => {
    console.log(publicados);
    return publicados.map((publicado) => ({
        idInmueble: publicado.idInmueble,
        imgSrc: generarFotoPrincipal(publicado),
        info: generarInfoExtra(publicado),
        price: generarInfoPrecio(publicado),
        modalidad: publicado.inmueble.modalidadInmueble,
        area: "Área m²" + (publicado.inmueble.areaMinima || 0),
        rooms: "Habit. " + (publicado.inmueble.cantidadMinHabitaciones || 0),
        baths: "Baños " + (publicado.inmueble.cantidadMinBaños || 0),
        badge: generarBadge(publicado),
        nuevo: publicado.estadoInmueble === "nuevo", // Asignar true si el estado es "nuevo",
        proyecto: publicado.inmueble.tipoInmueble.tipoInmueble === "proyecto", // Asignar true si el tipo es proyecto",
        nombreCustomer: publicado.inmueble.customer.nombreCustomer // Incluir el nombre del vendedor/inmobiliaria
    }));
};

// Genera la info del inmueble con el nombre de la ciudad y el tipo de inmueble
const generarInfoExtra = (inmueble) => {
    //ej: Bogotá - Apartaestudio, Chapinero alto
    const tipo = inmueble.inmueble.tipoInmueble.tipoInmueble;
    const ciudad = inmueble.inmueble.ciudad.nombreCiudad;
    const txtTipo = tipo.charAt(0).toUpperCase() + String(tipo).slice(1);
    const txtCiudad = ciudad.charAt(0).toUpperCase() + String(ciudad).slice(1);
    return txtCiudad + " - " + txtTipo;
}

// Genera la info del precio del inmueble con el maximo y minimo
const generarInfoPrecio = (inmueble) => {
    /*ej: 
        Arriendo - $185.000.000
        Desde $185.000.000 - Hasta $255.000.000
    */
    // Si es tipo proyecto, usar el formato desde-hasta
    if (inmueble.inmueble.tipoInmueble.tipoInmueble == "proyecto") {
        return `Desde ` + formatPrecio(inmueble.inmueble.valorMinimoDetalles) + ` - Hasta $` + formatPrecio(inmueble.inmueble.valorMaximoDetalles); // Formateo del precio
    } else {
        // Si no es de este tipo usar el formato estadoInmueble - valorDetalle (refleja el valor del inmueble)
        let modalidad = inmueble.modalidad || inmueble.inmueble.modalidadInmueble || "NN"; // Depende del tipo de peticion al backend
        return modalidad + ` - $` + formatPrecio(inmueble.inmueble.valorMaximoDetalles); // Formateo del precio
    }
}

//Generar insignia de destacado o en ascenso (prioridad de ascenso)
const generarBadge = (publicado) => {
    /*ej: 
        badge: "alta demanda",
        badge: "",
        badge: "destacado",
   */
    if ((publicado.inmueble.inmueblesAscenso && publicado.inmueble.inmueblesAscenso.length > 0) || publicado.idAscenso) {
        return "alta demanda"
    } else if ((publicado.inmueble.inmueblesDestacados && publicado.inmueble.inmueblesDestacados.length > 0) || publicado.idDestacado) {
        return "destacado"
    }
    return ""
}

// Generar la URL de la foto principal del inmueble
const generarFotoPrincipal = (publicado) => {
    if (publicado.inmueble.fotoPrincipal) {
        const uploadsPath = import.meta.env.VITE_RUTA_FOTO_INMUEBLES;
        return uploadsPath+ "/" + publicado.inmueble.fotoPrincipal
    }
    return "/img/Destacados/img-d-1.png"
}
