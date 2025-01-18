// Servicio para generar y traer coas relacionadas al webhook de payU
const ErrorNegocio = require("../../../utils/errores/ErrorNegocio");
const UsuarioRepo = require("../../usuarios/repositories/UsuariosRepository");

const crypto = require('crypto'); // Libreria para encriptar
/* Metodos GET */
// Generar la información de pago requerida
const generarPaymentData = async (usuario, precioPlan, plan, firebaseUser) => {
    try {
        /* Traer usuario*/

        // Codigo de referencia
        const referenceCode = `Invermax_${Date.now()}` + `_` + usuario.idUsuario;
        // Generar firma digital usando MD5
        const signatureString = `${process.env.PAYU_API_SECRET}~${process.env.PAYU_MERCHANT_ID}~${referenceCode}~${precioPlan.precio}~COP`;
        const signature = crypto.createHash('md5').update(signatureString).digest('hex');

        // Datos que se pueden requerir en el backend para generar la suscripcion al llegar el pago
        /*El limite es de 255 por extra, PayU tiene 3, para evitar un posible desbordamiento se envía asi */
        const dataExtra1 = JSON.stringify({ idUsuario: usuario.idUsuario });
        const dataExtra2 = JSON.stringify({ idPlan: plan.idPlan });
        const dataExtra3 = JSON.stringify({ idPrecioPlan: precioPlan.idPrecioPlan });


        // Datos para enviar al Webcheckout
        const paymentData = {
            merchantId: process.env.PAYU_MERCHANT_ID,
            accountId: process.env.PAYU_ACCOUNT_ID,
            description: plan.tipoPlan,
            referenceCode,
            amount: precioPlan.precio,
            tax: 0, // representa el IVA,
            taxReturnBase: 0, //monto base para calcular el IVA
            currency: 'COP',
            signature,
            algorithmSignature: 'MD5',
            test: 1, // 1 para pruebas, 0 para producción
            buyerEmail: usuario.emailUsuario,
            buyerFullName: firebaseUser.displayName,
            telephone: firebaseUser.telefono,
            responseUrl: process.env.PAYU_REDIRECT_URL,
            confirmationUrl: process.env.PAYU_PAYMENT_CONFIRMATION,
            extra1: dataExtra1,
            extra2: dataExtra2,
            extra3: dataExtra3,
            // Datos del pagador
            payerEmail: "",
            payerPhone: "",
            payerDocument: "",
            payerFullName: "",
            payerDocumentType: ""
        };

        // Retornar datos de pago
        return paymentData;

    } catch (err) {
        throw err;
    }
}

/* Recibir el pago de PAYU*/
const recibirConfirmacionPayU = async (request) => {
    console.log(request.body);
    const { reference_sale, state_pol, sign, transaction_id } = request.body;
    const valorNormalizado = normalizePayUValue(request.body.value);

    // Validar firma    
    const signatureString = `${process.env.PAYU_API_SECRET}~${process.env.PAYU_MERCHANT_ID}~${reference_sale}~${valorNormalizado}~COP~${state_pol}`;
    const expectedSignature = crypto
        .createHash('md5')
        .update(signatureString)
        .digest('hex');
    // Si la firma es valida se verifica que el estado de la transaccion sea exitoso
    if (sign == expectedSignature) {
        // Procesar solo pagos aprobados
        if (state_pol === '4') { // 4 = aprobado
            console.log(`Pago aprobado para la referencia ${reference_sale}- idTransaccion ${transaction_id}`);
            return true;
        }
    }
    // Enviar false como default
    return false;
}
    // Funcion necesaria para generar la clave esperada por PaYU, cambia dependiendo de los decimales del precio
    function normalizePayUValue(value) {
        // valor numérico
        const numericValue = parseFloat(value);

        // Si tiene exactamente dos decimales y el segundo es 0, reduce a un decimal
        if (numericValue.toFixed(2).endsWith('0')) {
            return numericValue.toFixed(1);
        }

        // De lo contrario, devuelve el valor original formateado con dos decimales
        return numericValue.toFixed(2);
    }

    module.exports = {
        generarPaymentData,
        normalizePayUValue,
        recibirConfirmacionPayU
    }