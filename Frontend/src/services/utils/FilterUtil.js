/* Util para convertir datos de filtros entre el backend y frontend*/
import { formatPrecio } from "./GeneralUtils";

// Mapeo de purpose - modalidad
const purposeMapping = {
    "Comprar": "compra",
    "Rentar": "arriendo",
};

// Mapeo de furnished - amoblado
const furnishedMapping = {
    true: 1,
    false: 0,
};


// Convertir datos del frontend para enviarlos al backend
export const formatFrontendFilter = (filter = {}) => {
    return {
        estadoInmueble: filter?.status || null, // Mapea 'status' a 'estadoInmueble'
        modalidad: purposeMapping[filter?.purpose] || null, // Traduce 'purpose' usando el mapeo
        codCiudad: filter?.city, // Mapea 'city' a 'codCiudad'
        idTipoInmueble: filter?.category, // Mapea 'category' a idTipoInmueble
        montoMaximo: filter?.maxAmount, // Mapea 'maxAmount' a 'montoMaximo'
        habitacionesMinimas: filter?.bedrooms, // Mapea 'bedrooms' a 'habitacionesMinimas'
        bañosMinimos: filter?.bathrooms, // Mapea 'bathrooms' a 'bañosMinimos'
        parqueadero: filter?.parking, // Mapea 'parking' a 'parqueadero'
        amoblado: furnishedMapping[filter?.furnished] || null, // Mapea 'furnished' a 'amoblado'
        zonas: [...(filter?.commonAreas || []), ...(filter?.nearbyAreas || [])].map(
            (zona) => zona?.value || zona
        ), // Pasar unicamente el id de la zona
        idCustomer: filter?.idCustomer || null, // Asigna un valor fijo o extrae el ID según sea necesario
    }
}



// Transforma datos del backend que lleguen como inmuebles publicados
export const formatInmueblePublicadoData = (publicados) => {
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
        return uploadsPath + "/" + publicado.inmueble.fotoPrincipal
    }
    return "/img/Destacados/img-d-1.png"
}


