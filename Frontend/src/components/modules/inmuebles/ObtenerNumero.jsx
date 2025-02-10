import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';

const ObtenerNumero = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        consulta: '',
        aceptaTerminos: false
    });

    const [numeroContacto, setNumeroContacto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleCloseModal = () => {
        setNumeroContacto(null); // Restablecer el número de contacto
        setFormData({ 
            nombre: '', 
            telefono: '', 
            email: '', 
            consulta: '', 
            aceptaTerminos: false 
        }); // Limpiar el formulario
        setErrors({}); // Limpiar errores
        handleClose(); // Cerrar el modal
    };
    

    const validarFormulario = () => {
        const newErrors = {};
    
        // Validar Nombre
        if (!formData.nombre.trim() || formData.nombre.length < 3) {
            newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
            newErrors.nombre = "El nombre solo puede contener letras.";
        }
    
        // Validar Teléfono
        if (!formData.telefono || formData.telefono.length < 10) {
            newErrors.telefono = "Debe ingresar un número de teléfono válido.";
        }
    
        // Validar Email
        if (!formData.email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "El correo electrónico no es válido.";
        }
    
        // Validar Consulta
        if (!formData.consulta.trim() || formData.consulta.length < 10) {
            newErrors.consulta = "La consulta debe tener al menos 10 caracteres.";
        }
    
        // Validar Aceptación de Términos
        if (!formData.aceptaTerminos) {
            newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones.";
        }
    
        // Guardar errores en el estado
        setErrors(newErrors);
    
        // Retornar si el formulario es válido o no
        return Object.keys(newErrors).length === 0;
    };
    

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    
        // Si el usuario empieza a escribir, eliminamos el error
        setErrors({ ...errors, [name]: "" });
    };
    

    

    const handleSubmit = async () => {
        if (!validarFormulario()) return; // Si hay errores, no continuamos
    
        setLoading(true);
    
        // Simular llamada al backend con un retraso de 2 segundos
        setTimeout(() => {
            const respuestaBackend = Math.random() > 0.5 ? "+57 312 345 6789" : null;
            setNumeroContacto(respuestaBackend || "Número no disponible");
            setLoading(false);
        }, 2000);
    };
    

    return (
        <Modal show={show} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{numeroContacto ? "Número de contacto" : "Obtener número"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!numeroContacto ? (
                    <Form>
                        <Form.Group controlId="formNombre">
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                isInvalid={!!errors.nombre} // Muestra el error si existe
                            />
                            <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTelefono" className="mt-3">
                            <PhoneInput
                                country={'co'}
                                value={formData.telefono}
                                onChange={(phone) => setFormData({ ...formData, telefono: phone })}
                                inputClass={`phone-input ${errors.telefono ? 'is-invalid' : ''}`}
                            />
                            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                        </Form.Group>


                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="formConsulta" className="mt-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Escribe tu consulta aquí..."
                                name="consulta"
                                value={formData.consulta}
                                onChange={handleInputChange}
                                isInvalid={!!errors.consulta}
                            />
                            <Form.Control.Feedback type="invalid">{errors.consulta}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTerminos" className="mt-3 d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                name="aceptaTerminos"
                                checked={formData.aceptaTerminos}
                                onChange={handleInputChange}
                                isInvalid={!!errors.aceptaTerminos}
                            />
                            <span style={{ marginLeft: '14px' }}>
                                Aceptas nuestros <a href="#">Términos y condiciones</a> y <a href="#">Política de privacidad</a>
                            </span>
                            {errors.aceptaTerminos && <div className="invalid-feedback d-block">{errors.aceptaTerminos}</div>}
                        </Form.Group>

                    </Form>
                ) : (
                    <div className="text-center">
                        <h3>{numeroContacto}</h3>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!numeroContacto ? (
                    <Button 
                        onClick={handleSubmit} 
                        disabled={!formData.aceptaTerminos || loading}
                        className="btn-obtener"
                    >
                        {loading ? "Cargando..." : "Obtener número"}
                    </Button>
                ) : (
                <Button onClick={handleCloseModal} className="btn-obtener">
                    Cerrar
                </Button>

                )}
            </Modal.Footer>

            {/* CSS en línea para personalizar el modal */}
            <style jsx>{`
                .modal-content {
                    border-radius: 12px;
                    padding: 15px;
                }

                .phone-input {
                    width: 100%;
                    border: 1px solid #000000;
                    border-radius: 5px;
                    padding: 8px;
                }

                .modal-body input,
                .modal-body textarea {
                    width: 100%;
                    border: 1px solid #000000;
                    border-radius: 5px;
                    padding: 8px;
                }

                .modal-body input:focus,
                .modal-body textarea:focus,
                .phone-input input:focus {
                    outline: none !important;
                    box-shadow: none !important;
                    border: 1px solid black !important;
                }

                .modal-body input::placeholder,
                .modal-body textarea::placeholder,
                .phone-input input::placeholder {
                    color: black !important;
                    opacity: 1;
                }

                .modal-body input[type="checkbox"] {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 2px solid red;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .modal-body input[type="checkbox"]:checked {
                    background-color: red;
                    border: none;
                }

                .modal-footer .btn-obtener {
                    background-color: red !important;
                    border: none !important;
                    color: white !important;
                    padding: 10px 20px;
                    font-size: 16px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .modal-footer .btn-obtener:disabled {
                    background-color: gray !important;
                    cursor: not-allowed;
                }

                a {
                    color: rgb(255, 0, 0);
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </Modal>
    );
};

export default ObtenerNumero;
