/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

const CustomerService = require("../../usuarios/services/CustomerService");
const caracteristicaService = require("../services/CaracteristicasService");
const InmuebleRepo = require("../../inmuebles/repositories/InmuebleRepository");
const suscripcionRepo = require("../repositories/SuscripcionRepository");
const destacadoRepo = require("../repositories/DestacadoRepository");

const { construirCondiciones } = require("../../../utils/utils");

/* Metodos GET */

// Trae un InmuebleDestacado segun su idInmueble y/o su codigo
const getDestacadoInmueble = async (idInmueble = null, codigoPeriodo = null) => {
    try {
        // Construir condiciones a partir de idInmueble y/o codigoPeriodo
        const condiciones = construirCondiciones({ idInmueble, codigoPeriodo });
        // Obtener los destacados que cumplen las condiciones
        const destacados = await destacadoRepo.traerDestacados(condiciones);

        // Calcular minutos restantes para cada destacado
        const destacadosConTiempo = destacados.map(destacado => {
            const minutosRestantes = calcularMinutosRestantes(destacado);
            return { ...destacado, minutosRestantes };
        });

        return destacadosConTiempo;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Traer destacados segun idCustomer o estado (0 o 1), se puede especificar si traer info especifica de inmueble
const getDestacadoCustomerEstado = async (estado = null, idCustomer = null, infoInmueble = null) => {
    try {
        // Construir parametros de consulta de destacados e inmuebles
        const whereDestacado = construirCondiciones({ estadoDestacado: estado });

        const whereInmueble = construirCondiciones({ idCustomer: idCustomer });
        let atributosInmueble = {};

        if (infoInmueble) {
            atributosInmueble = InmuebleRepo.traerAtributosAvanzados(false);
        } else {
            atributosInmueble = [];
        }

        let destacados = await destacadoRepo.traerDestacados(whereDestacado, whereInmueble, atributosInmueble);
        
         // Calcular minutos restantes para cada destacado
         const destacadosConTiempo = destacados.map(destacado => {
            const minutosRestantes = calcularMinutosRestantes(destacado);
            return { ...destacado, minutosRestantes };
        });

        return destacadosConTiempo;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

/* Metodos POST */

// Insertar o actualizar un inmueble destacado
const manejarRegistroDestacado = async (idInmueble) => {
    try {
        // Si el estado del inmueble no es publicado entonces no lo deja
        let inmueble = await InmuebleRepo.getInmuebleByID(idInmueble);

        let dataInmueble = inmueble[0].dataValues;

        // Traer el customer
        let customer = await CustomerService.getAllCustomers({ idCustomer: dataInmueble.customer.idCustomer });

        // Validar que el estado del customer permita usar esta función
        let customerData = customer[0].dataValues;
        if (customerData.estadoCustomer == "activo") {

            // Verificar que el inmueble esté como publicado
            if (dataInmueble.estadoPublicacionInmueble != "publicado") {
                throw new ErrorNegocio("El estado del inmueble: " + dataInmueble.estadoPublicacionInmueble + " no permite que haga uso de esta función");
            }

            /* Verificar si existe ya el inmueble destacado */

            // Traer la suscripcion activa para generar el codigo
            let condiciones = { idCustomer: customerData.idCustomer, estado: "activa" };
            let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);
            let codigo = destacadoRepo.generarCodigoPeriodo(suscripcionesActivas[0].fechaInicioSuscripcion, suscripcionesActivas[0].idSuscripcion)
            let destacado = await getDestacadoInmueble(idInmueble, codigo);

            // Si existe cambiar el estado por el inverso al que tiene
            if (destacado && destacado.length > 0) {
                // Actualizar registro
                let estadoNuevo = 1;
                // Si el estado actual ya era 1 se cambiará a 0
                if (destacado[0].dataValues.estadoDestacado == 1) {
                    estadoNuevo = 0;
                }
                await actualizarEstadoDestacado(destacado[0].dataValues, estadoNuevo);
                return "Inmueble destacado actualizado";
            } else {
                /* Si no existe registrar*/

                // Validar que el plan le permita realizar la funcion de creacion
                await caracteristicaService.verificarInmuebleDestacado(customerData.idCustomer);

                await insertarRegistroDestacado(idInmueble, codigo);

                return "Inmueble registrado como destacado";
            }
        } else {
            throw new ErrorNegocio("El estado actual del customer no le permite llevar a cabo esta acción");
        }

    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Insertar un inmueble destacado
const insertarRegistroDestacado = async (idInmueble, codigoPeriodo) => {
    let datos = {};

    datos.idInmueble = idInmueble;
    datos.fechaInicio = new Date();
    datos.estadoDestacado = 1;
    datos.tiempoAcumulado = 0;

    // Generar el código
    datos.codigoPeriodo = codigoPeriodo;
    await destacadoRepo.insertarDestacado(datos);
}

// Actualizar el estado de un registro de destacado
const actualizarEstadoDestacado = async (datosDestacado, nuevoEstado) => {
    let datos = datosDestacado;
    let nuevaData = {};
    nuevaData.estadoDestacado = nuevoEstado;
    nuevaData.fechaInicio = new Date();

    // Si se va  desactivar calcular el tiempo acumulado
    if (nuevoEstado == 0) {
        // Calcular tiempo desde que se activó hasta ahora
        let minutosAcumulados = calcularMinutosTranscurridos(datosDestacado);

        // Sumar el acumulado a los minutos acumulados
        nuevaData.tiempoAcumulado = datosDestacado.tiempoAcumulado + minutosAcumulados;

        // Colocar la fecha en null
        nuevaData.fechaInicio = null;
    } else {
        // Si se va a activar verificar que el acumulado no sea igual o mayor al tiempo limite
        const LIMITE_MINUTOS = process.env.TIEMPO_MAX_DESTACADOS; // Límite 
        if (LIMITE_MINUTOS <= datosDestacado.tiempoAcumulado) {
            throw new ErrorNegocio("El limite de " + LIMITE_MINUTOS + " ya fue superado para este inmueble.");
        }
    }

    await destacadoRepo.modificarDestacado(nuevaData, datos.idDestacado)
}

// Actualizar de manera automatica el acumulado de los inmuebles activos
const actualizarDestacadosActivos = async () => {
    try {
        /** 1. Traer todos los destacados activos **/
        let condiciones = { estadoDestacado: 1 }
        let destacadosActivos = await destacadoRepo.traerDestacados(condiciones);

        if (destacadosActivos.length === 0) {
            console.log("No hay destacados activos para procesar.");
            return;
        }

        /** 2. Procesar cada destacado activo **/
        for (const destacado of destacadosActivos) {
            const { fechaInicio, tiempoAcumulado } = destacado;
            /** 3. Calcular acumulado **/
            if (fechaInicio) {
                const LIMITE_MINUTOS = process.env.TIEMPO_MAX_DESTACADOS; // Límite 
                const minutosTranscurridos = calcularMinutosTranscurridos(destacado);
                let nuevoAcumulado = tiempoAcumulado + minutosTranscurridos;

                // Validar si supera el límite
                if (nuevoAcumulado >= LIMITE_MINUTOS) {
                    console.log(`Desactivando destacado ${destacado.idDestacado} (límite alcanzado).`);
                    let datos = {};
                    datos.fechaInicio = null;
                    datos.estadoDestacado = 0;
                    datos.acumulado = nuevoAcumulado;
                    await destacadoRepo.modificarDestacado(datos, destacado.idDestacado);
                }
                // Si NO supera el límite, no se hace ninguna actualización 
            }
        }

        console.log("Proceso de actualización de destacados activos completado.");
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Desactivar destacados cuyas suscripciones ya no apliquen
const reiniciarDestacadosPorMes = async () => {
    // Obtener todos los destacados (con su códigoPeriodo) activos
    let destacadosActivos = await destacadoRepo.traerDestacados({ estadoDestacado: 1 });

    // Obtener todas las suscripciones necesarias de una sola vez
    const idSuscripciones = destacadosActivos.map(destacado => destacado.codigoPeriodo.split('-')[0]); // Obtener la parte de idSuscripcion
    let suscripciones = await suscripcionRepo.getSuscripciones({ idSuscripcion: idSuscripciones });

    // Crear un mapa de suscripciones para un acceso rápido
    let suscripcionesMap = suscripciones.reduce((acc, suscripcion) => {
        acc[suscripcion.idSuscripcion] = suscripcion;
        return acc;
    }, {});

    // Iterar sobre los destacados activos
    for (const destacado of destacadosActivos) {
        const [idSuscripcion, mesPeriodo] = destacado.codigoPeriodo.split('-').map(Number);

        // Obtener la suscripción correspondiente del mapa
        let suscripcion = suscripcionesMap[idSuscripcion];

        // Generar el código actual
        let codigo = destacadoRepo.generarCodigoPeriodo(suscripcion.fechaInicioSuscripcion, idSuscripcion);

        const [idSus, nuevoMes] = codigo.split('-').map(Number);
        // Si el mes del periodo del destacado es menor que el mes actual de la suscripcion, desactivar el destacado
        if (mesPeriodo < nuevoMes) {
            console.log(`Desactivando destacado ${destacado.idDestacado} (mes anterior)`);
            await destacadoRepo.modificarDestacado({ estadoDestacado: 0, fechaInicio: null },
                destacado.idDestacado);
        }
    }
};

// Inactiva destacados cuya suscripcion asociada no está activa
const desactivarDestacadosVencidos = async () => {
    /** 1. Traer todos los destacados activos **/
    let condiciones = { estadoDestacado: 1 }
    let destacadosActivos = await destacadoRepo.traerDestacados(condiciones);

    // Obtener todas las suscripciones inactivas de una sola vez
    const idSuscripciones = destacadosActivos.map(destacado => destacado.codigoPeriodo.split('-')[0]); // Obtener la parte de idSuscripcion
    if (idSuscripciones.length == 0) {
        console.log("no hay destacados activos");
        return true;
    }
    let suscripciones = await suscripcionRepo.getSuscripciones({ idSuscripcion: idSuscripciones, estado: "inactiva" });
    if (suscripciones.length == 0) {
        console.log("no hay suscripciones relacionadas a destacados activas con estado de inactivas ");
        return true;
    }
    // Crear un mapa de suscripciones para un acceso rápido
    let suscripcionesMap = suscripciones.reduce((acc, suscripcion) => {
        acc[suscripcion.idSuscripcion] = suscripcion;
        return acc;
    }, {});

    /** 2. Procesar cada destacado activo **/
    for (const destacado of destacadosActivos) {
        const idSuscripcion = destacado.codigoPeriodo.split('-')[0]; // Extraer idSuscripcion del código

        // Verificar si la suscripción está en el mapa de inactivas
        if (suscripcionesMap[idSuscripcion]) {
            console.log(`Desactivando destacado ${destacado.idDestacado} (suscripción inactiva).`);

            // Actualizar destacado
            await destacadoRepo.modificarDestacado({
                fechaInicio: null,
                estadoDestacado: 0
            }, destacado.idDestacado);
        }
    }
}

/* Calcular minutos acumulados de un inmueble en destacado
 teniendo en cuenta la fecha de inicio y el acumulado de un destacado */
function calcularMinutosTranscurridos(destacado) {
    let ahora = new Date();

    let fechaInicio = destacado.fechaInicio;

    let minutosTranscurridos = Math.floor((ahora - fechaInicio) / (1000 * 60));

    return minutosTranscurridos;
}

// Calcular minutos restantes de un inmueble en destacado
// teniendo en cuenta la fecha de inicio y el acumulado de la BD
function calcularMinutosRestantes(destacado) {
    const LIMITE_MINUTOS = process.env.TIEMPO_MAX_DESTACADOS; // Límite 

    let minutosTranscurridos = calcularMinutosTranscurridos(destacado);
    const minutosRestantes = LIMITE_MINUTOS - (destacado.tiempoAcumulado + minutosTranscurridos);
    return Math.max(minutosRestantes, 0);
}

module.exports = {
    getDestacadoInmueble,
    manejarRegistroDestacado,
    calcularMinutosRestantes,
    getDestacadoCustomerEstado,
    actualizarDestacadosActivos,
    desactivarDestacadosVencidos,
    reiniciarDestacadosPorMes
}
