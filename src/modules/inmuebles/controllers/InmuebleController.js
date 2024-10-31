//Manejar las solicitudes HTTP. Llama al servicio correspondiente.

const inmuebleService = require('../services/InmuebleService'); //Importar el servicio 
const filtroInmueble = require('../services/FiltrosInmuebleService');
const zonasInmueblesService = require('../services/ZonasInmueblesService');

// Insertar un inmueble
const insertInmueble = async (req, res) => {
    try {
        const datosInmuebles = req.body; //Datos del cuerpo de la solicitud
        msg = await inmuebleService.insertarInmueble(datosInmuebles);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje
        }else{
            switch (msg.type) {
                case 'VALIDATION_ERROR':
                    return res.status(422).json({ error: 'Error de validación: ' + msg.message });
                default:
                    return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
            }   
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

// Insertar un inmueble
const agregarZona = async (req, res) => {
    try {
        console.log(req.params);
        const datos = req.body; //Datos del cuerpo de la solicitud (zonas)
        datos.idInmueble = req.params.idInmueble;
        msg = await zonasInmueblesService.agregarZona(datos);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

//Traer inmuebles publicados
const getInmueblesPublicados = async (req, res) => {
    try {
        console.log(req.query);
        msg = await filtroInmueble.getPublicados(req.query);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};


//Traer inmuebles publicados
const getInmueblesUsuario = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmueblesUsuario(req.params);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

//Traer inmuebles con un codigo
const getInmueblesCodigo = async (req, res) => {
    try {
        msg = await filtroInmueble.getInmueblesCodigo(req.params);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
};

//Editar un inmueble con detalles
const actualizarInmuebleDetalles = async (req, res) => {
    try {
        msg = await inmuebleService.actualizarInmuebleDetalles(req.body, req.params);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
}

// eliminar inmueble
const eliminarInmueble = async (req, res) => {
    try {
        msg = await inmuebleService.eliminarInmueble(req.params);
        if(!msg.error){
            res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
        }else{
            return res.status(500).json({ error: 'Error inesperado: ' + msg.message });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor: ' + err.message });
    }
}
module.exports = {
    insertInmueble,
    agregarZona,
    getInmueblesPublicados,
    getInmueblesUsuario,
    getInmueblesCodigo,
    actualizarInmuebleDetalles,
    eliminarInmueble
}; 