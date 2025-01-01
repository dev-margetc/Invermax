import { convertirPrimeraMayuscula, formatPrecio } from "./GeneralUtils";

// Transforma datos del backend que lleguen como inmueble tipo Proyecto para ver todos los detalles de este
export const formatProyectoData = (inmueble) => {
    const zonas = asignarZonas(inmueble.zonas);
    return {
        title: inmueble.tituloInmueble,
        codigo: inmueble.codigoInmueble,
        status: inmueble.estadoInmueble,
        ubicacion: inmueble.ubicacionInmueble,
        frameMap: inmueble.frameMaps,
        estrato: inmueble.estrato,
        minPrice: formatPrecio(inmueble.valorMinimoDetalles),
        maxPrice: formatPrecio(inmueble.valorMaximoDetalles),
        medidasTipo: generarMedidasTipo(inmueble.detalles),
        informacionPorTipo: generarInfoTipo(inmueble, zonas),
        fechaEntrega: inmueble.proyecto.fechaEntregaProyecto,
        zonasComunes: zonas?.comunes,
        cercaDe: zonas?.interes, // Zonas de interés


        logoImage: inmueble.customer.logoCustomer
            ? import.meta.env.VITE_RUTA_FOTO_CUSTOMERS + "/" + inmueble.customer.logoCustomer
            : "./img/nombreInmobiliaria.png",

        nombreInmobiliaria: inmueble.customer.nombreCustomer // Incluir el nombre del vendedor/inmobiliaria
    };
};

// Generar las medidas por tipo
const generarMedidasTipo = (detalles) => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras disponibles para los tipos
    return detalles.map((detalle, index) => ({
        id: detalle.idDetalle, // Mantener el ID original
        [`tipo${letras[index]}`]: `${detalle.area} m²` // Generar alias tipoA, tipoB, etc.
    }));
}

// Generar la información de los tipos usando los detalles del inmueble
const generarInfoTipo = (inmueble) => {
    const detalles = inmueble.detalles;
    const informacionPorTipo = {}; // Objeto que almacenará la información por tipo
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras disponibles para los tipos
    // Path de fotos y videos
    const fotoPath = import.meta.env.VITE_RUTA_FOTO_INMUEBLES;
    const videoPath = import.meta.env.VITE_RUTA_VIDEO_INMUEBLES;
    // Recorrer los detalles    
    detalles.forEach((detalle, index) => {
        const letraTipo = letras[index] || `Tipo${index + 1}`; // Letras o un fallback si excede el alfabeto

        // Crear un objeto con la información del tipo
        informacionPorTipo[letraTipo] = { //La key será la letra
            id: detalle.idDetalle, // Mantener el id original
            description: detalle.descripcionInmueble,
            minPrice: formatPrecio(detalle.valorInmueble), // Se coloca el precio del detalle o tipo
            habitaciones: detalle.cantidadHabitaciones,
            banos: detalle.cantidadBaños,
            resumen: inmueble.descripcionInmueble,
            parqueadero: convertirPrimeraMayuscula(detalle.parqueadero),
            // Extraer solo las URLs de las fotos
            images: detalle.fotos.map(foto => fotoPath + "/" + foto.urlFoto),
            videos: detalle.videos.map(video => videoPath + "/" + video.urlVideo),
        }
    });


    // Generar el tipo (GENERAL) que tendrá la información resumida general
    informacionPorTipo["GENERAL"] = { //La key será general
        id: inmueble.idInmueble, // Mantener el id original
        description: inmueble.descripcionInmueble,
        minPrice: formatPrecio(inmueble.valorMinimoDetalles),
        maxPrice: formatPrecio(inmueble.valorMaximoDetalles),
        // Combinar todas las fotos de los detalles en una sola lista para "GENERAL"
        images: inmueble.detalles.reduce((allImages, detalle) => {
            return [...allImages, ...detalle.fotos.map(foto => fotoPath + "/" + foto.urlFoto)];
        }, []),
        // Combinar todas los videos de los detalles en una sola lista para "GENERAL"
        videos: inmueble.detalles.reduce((allVideos, detalle) => {
            return [...allVideos, ...detalle.videos.map(video => videoPath + "/" + video.urlVideo)];
        }, []),
    }


    return informacionPorTipo;

}

// Asignar zonas
const asignarZonas = (zonasInmueble) => {
    const zonasClasificadas = {
        comunes: [],
        interes: [],
    };

    const defaultIcon = "ZonasVerdesIcon";
    zonasInmueble.forEach((zona) => {
        const zonaMapeada = {
            name: zona.nombreZona,
            icon: zona.iconoZona || defaultIcon,
        };

        if (zona.tipoZona == "zona común") {
            zonasClasificadas.comunes.push(zonaMapeada);
        } else if (zona.tipoZona == "zona de interés") {
            zonasClasificadas.interes.push(zonaMapeada);
        }
    });

    return zonasClasificadas;
}