/* Util para convertir datos de filtros entre el backend y frontend*/

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
            (zona) => zona?.name || zona
        ),
        idCustomer: filter?.idCustomer || null, // Asigna un valor fijo o extrae el ID según sea necesario
    }
}

