/*Se aplica la lógica de negocio a los datos traidos por el repositorio. 
Tambien se encarga de interactuar con otros servicios*/
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");

const CustomerService = require("../../usuarios/services/CustomerService");
const InmuebleRepo = require("../../inmuebles/repositories/InmuebleRepository");
const ascensoRepo = require("../repositories/AscensoRepository");
const suscripcionRepo = require("../repositories/SuscripcionRepository");
const caracteristicaService = require("./CaracteristicasService");

const { construirCondiciones } = require("../../../utils/utils");

/* Metodos GET */

// Trae una lista InmuebleAscenso segun su idInmueble o codigoPeriodo
const getAscensoInmueble = async (idInmueble = null, codigoPeriodo = null) => {
    try {

        let cond = construirCondiciones({ idInmueble, codigoPeriodo });
        let ascenso = await ascensoRepo.traerInmueblesAscenso(cond);

        // Calcular minutos restantes para cada ascenso
        const ascendidosConTiempo = ascenso.map(ascenso => {
            const plano = ascenso.get({ plain: true }); // Convertir el objeto a formato plano
            const minutosRestantes = calcularMinutosRestantes(ascenso);
            return { ...plano, minutosRestantes }; // Crear un nuevo objeto con el campo adicional
        });

        return ascendidosConTiempo;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Traer inmuebles en ascenso segun idCustomer o estado (0 o 1), se puede especificar si traer info especifica de inmueble
const getAscensoCustomerEstado = async (estado = null, idCustomer = null, infoInmueble = null) => {
    try {
        // Construir parametros de consulta de ascendidos e inmuebles
        const whereAscenso = construirCondiciones({ estadoAscenso: estado });

        const whereInmueble = construirCondiciones({ idCustomer: idCustomer });

        let atributosInmueble = {};

        if (infoInmueble) {
            atributosInmueble = InmuebleRepo.traerAtributosAvanzados(false);
        } else {
            atributosInmueble = [];
        }

        let inmueblesAscenso = await ascensoRepo.traerInmueblesAscenso(whereAscenso, whereInmueble, atributosInmueble);
        // Calcular minutos restantes para cada ascenso
        const ascendidosConTiempo = inmueblesAscenso.map(ascenso => {
            const plano = ascenso.get({ plain: true }); // Convertir el objeto a formato plano
            const minutosRestantes = calcularMinutosRestantes(ascenso);
            return { ...plano, minutosRestantes }; // Crear un nuevo objeto con el campo adicional
        });
        return ascendidosConTiempo;
    } catch (err) {
        console.log(err);
        throw err;
    }


}

/* Metodos POST */

// Insertar o actualizar un inmueble en ascenso
const manejarRegistroAscenso = async (idInmueble) => {
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

            /* Verificar si existe ya el inmueble en ascenso */

            // Traer la suscripcion activa para generar el codigo
            let condiciones = { idCustomer: customerData.idCustomer, estado: "activa" };
            let suscripcionesActivas = await suscripcionRepo.getSuscripcionesPlan(condiciones);
            if (suscripcionesActivas.length == 0) {
                throw new ErrorNegocio("No cuenta con una suscripcion activa.");
            }
            let codigo = ascensoRepo.generarCodigoPeriodo(suscripcionesActivas[0].fechaInicioSuscripcion, suscripcionesActivas[0].idSuscripcion)

            let cond = construirCondiciones({ idInmueble, codigoPeriodo:codigo });
            let ascenso = await ascensoRepo.traerInmueblesAscenso(cond);

            // Si existe cambiar el estado por el inverso al que tiene
            if (ascenso && ascenso.length > 0) {
                // Actualizar registro
                let estadoNuevo = 1;
                // Si el estado actual ya era 1 se cambiará a 0
                if (ascenso[0].dataValues.estadoAscenso == 1) {
                    estadoNuevo = 0;
                }
                await actualizarEstadoAscendido(ascenso[0].dataValues, estadoNuevo);
                return "Inmueble en ascenso actualizado";
            } else {
                // Validar que el plan le permita realizar la funcion de creacion
                await caracteristicaService.verificarInmuebleAscenso(customerData.idCustomer);
                await insertarRegistroAscenso(idInmueble, codigo);
                return "Inmueble registrado como ascendido";
            }
        } else {
            throw new ErrorNegocio("El estado actual del customer o su plan no le permite llevar a cabo esta acción");
        }

    } catch (err) {
        throw err;
    }
}

// Insertar un inmueble en ascenso
const insertarRegistroAscenso = async (idInmueble, codigoPeriodo) => {
    let datos = {};

    datos.idInmueble = idInmueble;
    datos.fechaInicio = new Date();
    datos.estadoAscenso = 1;
    datos.tiempoAcumulado = 0;

    // Generar el código
    datos.codigoPeriodo = codigoPeriodo;
    await ascensoRepo.insertarInmuebleAscenso(datos);
}
// Actualizar el estado de un registro de ascendido
const actualizarEstadoAscendido = async (datosAscendido, nuevoEstado) => {
    let datos = datosAscendido;
    let nuevaData = {};
    nuevaData.estadoAscenso = nuevoEstado;
    nuevaData.fechaInicio = new Date();

    // Si se va  desactivar calcular el tiempo acumulado
    if (nuevoEstado == 0) {
        // Calcular tiempo desde que se activó hasta ahora
        let minutosAcumulados = calcularMinutosTranscurridos(datosAscendido);

        // Sumar el acumulado a los minutos acumulados
        nuevaData.tiempoAcumulado = datosAscendido.tiempoAcumulado + minutosAcumulados;

        // Colocar la fecha en null
        nuevaData.fechaInicio = null;
    } else {
        // Si se va a activar verificar que el acumulado no sea igual o mayor al tiempo limite
        const LIMITE_MINUTOS = process.env.TIEMPO_MAX_ASCENSO; // Límite 
        if (LIMITE_MINUTOS <= datosAscendido.tiempoAcumulado) {
            throw new ErrorNegocio("El limite de " + LIMITE_MINUTOS + " ya fue superado para este inmueble.");
        }
    }

    await ascensoRepo.modificarAscenso(nuevaData, datos.idAscenso);
}

// Actualizar de manera automatica el acumulado de los inmuebles ascendidos activos
const actualizarAscendidosActivos = async () => {
    try {
        /** 1. Traer todos los ascendidos activos **/
        let condiciones = { estadoAscenso: 1 }
        let ascendidosActivos = await ascensoRepo.traerInmueblesAscenso(condiciones);

        if (ascendidosActivos.length === 0) {
            console.log("No hay ascendidos activos para procesar.");
            return;
        }

        /** 2. Procesar cada ascendido activo **/
        for (const ascendido of ascendidosActivos) {
            const { fechaInicio, tiempoAcumulado } = ascendido;
            /** 3. Calcular acumulado **/
            if (fechaInicio) {
                const LIMITE_MINUTOS = process.env.TIEMPO_MAX_ASCENSO; // Límite 
                const minutosTranscurridos = calcularMinutosTranscurridos(ascendido);
                let nuevoAcumulado = tiempoAcumulado + minutosTranscurridos;

                // Validar si supera el límite
                if (nuevoAcumulado >= LIMITE_MINUTOS) {
                    console.log(`Desactivando ascendido ${ascendido.idAscenso} (límite alcanzado).`);
                    let datos = {};
                    datos.fechaInicio = null;
                    datos.estadoAscenso = 0;
                    datos.acumulado = nuevoAcumulado;
                    await ascensoRepo.modificarAscenso(datos, ascendido.idAscenso);
                }
                // Si NO supera el límite, no se hace ninguna actualización 
            }
        }

        console.log("Proceso de actualización de ascendidos activos completado.");
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Desactivar ascendidos con un codigo ya no valido pues el mes de su suscripcion ya no sirve
const reiniciarAscendidosPorMes = async () => {
    // Obtener todos los ascendidos (con su códigoPeriodo) activos
    let ascendidosActivos = await ascensoRepo.traerInmueblesAscenso({ estadoAscenso: 1 });

    // Obtener todas las suscripciones necesarias de una sola vez
    const idSuscripciones = ascendidosActivos.map(ascendido => ascendido.codigoPeriodo.split('-')[0]); // Obtener la parte de idSuscripcion
    if (idSuscripciones.length == 0) {
        console.log("no hay ascendidos activos");
        return true;
    }
    let suscripciones = await suscripcionRepo.getSuscripciones({ idSuscripcion: idSuscripciones });

    // Crear un mapa de suscripciones para un acceso rápido
    let suscripcionesMap = suscripciones.reduce((acc, suscripcion) => {
        acc[suscripcion.idSuscripcion] = suscripcion;
        return acc;
    }, {});

    // Iterar sobre los ascendidos activos
    for (const ascendido of ascendidosActivos) {
        const [idSuscripcion, mesPeriodo] = ascendido.codigoPeriodo.split('-').map(Number);

        // Obtener la suscripción correspondiente del mapa
        let suscripcion = suscripcionesMap[idSuscripcion];

        // Generar el código que sería el actual
        let codigo = ascensoRepo.generarCodigoPeriodo(suscripcion.fechaInicioSuscripcion, idSuscripcion);

        const [idSus, nuevoMes] = codigo.split('-').map(Number);
        // Si el mes del periodo del ascendido es menor que el mes actual de la suscripcion, desactivar el ascendido
        if (mesPeriodo < nuevoMes) {
            let acumulado = calcularMinutosTranscurridos(ascendido);
            console.log(`Desactivando ascendido ${ascendido.idAscenso} (mes anterior)`);
        await ascensoRepo.modificarAscenso({ estadoAscenso: 0, fechaInicio: null, tiempoAcumulado:acumulado },
                ascendido.idAscenso);
        }
    }
};

// Inactiva ascendidos cuya suscripcion asociada no está activa
const desactivarAscendidosVencidos = async () => {
    /** 1. Traer todos los ascendidos activos **/
    let condiciones = { estadoAscenso: 1 }
    let ascensoActivos = await ascensoRepo.traerInmueblesAscenso(condiciones);

    // Obtener todas las suscripciones inactivas de una sola vez
    const idSuscripciones = ascensoActivos.map(ascenso => ascenso.codigoPeriodo.split('-')[0]); // Obtener la parte de idSuscripcion
    if (idSuscripciones.length == 0) {
        console.log("no hay ascendidos activos");
        return true;
    }
    let suscripciones = await suscripcionRepo.getSuscripciones({ idSuscripcion: idSuscripciones, estado: "inactiva" });
    if (suscripciones.length == 0) {
        console.log("no hay suscripciones relacionadas a ascendidos activos con estado de inactivas ");
        return true;
    }
    // Crear un mapa de suscripciones para un acceso rápido
    let suscripcionesMap = suscripciones.reduce((acc, suscripcion) => {
        acc[suscripcion.idSuscripcion] = suscripcion;
        return acc;
    }, {});

    /** 2. Procesar cada ascendido activo **/
    for (const inmuebleAscenso of ascensoActivos) {
        const idSuscripcion = inmuebleAscenso.codigoPeriodo.split('-')[0]; // Extraer idSuscripcion del código

        // Verificar si la suscripción está en el mapa de inactivas
        if (suscripcionesMap[idSuscripcion]) {
            console.log(`Desactivando ascendido ${inmuebleAscenso.idAscenso} (suscripción inactiva).`);
            let acumulado = calcularMinutosTranscurridos(inmuebleAscenso);
            console.log(acumulado);
            // Actualizar ascendido
          await ascensoRepo.modificarAscenso({
                fechaInicio: null,
                estadoAscenso: 0,
                tiempoAcumulado: acumulado
            }, inmuebleAscenso.idAscenso);
        }
    }
}


/* Calcular minutos acumulados de un inmueble en ascenso
 teniendo en cuenta la fecha de inicio y el acumulado de un ascendido */
function calcularMinutosTranscurridos(inmuebleAscenso) {
    let ahora = new Date();

    let fechaInicio = inmuebleAscenso.fechaInicio;

    let minutosTranscurridos = Math.floor((ahora - fechaInicio) / (1000 * 60));

    return minutosTranscurridos;
}

// Calcular minutos restantes de un inmueble en ascenso
// teniendo en cuenta la fecha de inicio y el acumulado de la BD
function calcularMinutosRestantes(inmuebleAscenso) {
    const LIMITE_MINUTOS = process.env.TIEMPO_MAX_ASCENSO; // Límite 

    let minutosTranscurridos = calcularMinutosTranscurridos(inmuebleAscenso);
    const minutosRestantes = LIMITE_MINUTOS - (inmuebleAscenso.tiempoAcumulado + minutosTranscurridos);
    return Math.max(minutosRestantes, 0);
}


module.exports = {
    getAscensoInmueble,
    manejarRegistroAscenso,
    getAscensoCustomerEstado,
    desactivarAscendidosVencidos,
    calcularMinutosRestantes,
    reiniciarAscendidosPorMes,
    actualizarAscendidosActivos
}
