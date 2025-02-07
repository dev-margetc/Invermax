import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import servicioService from '../services/servicios/ServicioService.js'; 

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentServicio, setCurrentServicio] = useState({
        codigoServicio: '',
        nombreServicio: '',
        descripcionServicio: '',
        precioServicio: '',
        fotoServicio: ''
    });
    const [editIndex, setEditIndex] = useState(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const serviciosPerPage = 5;

    const indexOfLastServicio = currentPage * serviciosPerPage;
    const indexOfFirstServicio = indexOfLastServicio - serviciosPerPage;
    const currentServicios = servicios.slice(indexOfFirstServicio, indexOfLastServicio);

    const handleShowModal = (index = null) => {
        if (index !== null) {
            setCurrentServicio(servicios[index]);
            setEditIndex(index);
        } else {
            setCurrentServicio({
                codigoServicio: '',
                nombreServicio: '',
                descripcionServicio: '',
                precioServicio: '',
                fotoServicio: ''
            });
            setEditIndex(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentServicio({ ...currentServicio, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType !== 'image') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, selecciona un archivo de imagen',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El archivo es demasiado grande. Máximo 5MB',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentServicio({ ...currentServicio, fotoServicio: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveServicio = async () => {
        // Validación de campos
        if (!currentServicio.codigoServicio.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El código del servicio es obligatorio',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        if (!currentServicio.nombreServicio.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre del servicio es obligatorio',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        if (!currentServicio.precioServicio.trim() || isNaN(currentServicio.precioServicio) || parseFloat(currentServicio.precioServicio) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa un precio válido',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        if (!currentServicio.fotoServicio) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes subir una foto del servicio',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        try {
            let savedServicio;
            if (editIndex !== null) {
                // Actualizar el servicio sin la foto
                savedServicio = await servicioService.updateServicio(servicios[editIndex]._id, currentServicio);
                setServicios(servicios.map((servicio, index) => (index === editIndex ? savedServicio : servicio)));
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Servicio actualizado exitosamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            } else {
                // Crear el servicio sin la foto
                savedServicio = await servicioService.addServicio(currentServicio);
                setServicios([...servicios, savedServicio]);
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Servicio agregado exitosamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
    
            // Paso 2: Subir la foto después de la creación del servicio
            if (currentServicio.fotoServicio) {
                const formData = new FormData();
                formData.append('fotoServicio', currentServicio.fotoServicio);
    
                // Paso 3: Enviar la foto usando el ID del servicio
                await servicioService.uploadFotoServicio(savedServicio._id, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Foto cargada',
                    text: 'Foto cargada exitosamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar el servicio',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    
        handleCloseModal();
    };
    

    const handleDeleteServicio = async (index) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const servicioId = servicios[index]._id;
                    await servicioService.deleteServicio(servicioId); // Llamada a la API para eliminar el servicio
                    const updatedServicios = servicios.filter((_, i) => i !== index);
                    setServicios(updatedServicios);
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Servicio eliminado exitosamente',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al eliminar el servicio',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            }
        });
    };
    

    // Funciones de paginación
    const totalPages = Math.ceil(servicios.length / serviciosPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='container'>
            <h1 className='text-center m-4' style={{ fontWeight: 700 }}>SERVICIOS</h1>
            <div className="d-flex justify-content-start">
                <Button variant="primary" onClick={() => handleShowModal()}>Agregar Servicio</Button>
            </div>

            <div className="content-container mt-4">
                {servicios.length === 0 ? (
                    <p className="no-data-message">No hay servicios disponibles.</p>
                ) : (
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Foto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentServicios.map((servicio, index) => (
                                    <tr key={index}>
                                        <td>{servicio.codigoServicio}</td>
                                        <td>{servicio.nombreServicio}</td>
                                        <td>{servicio.descripcionServicio}</td>
                                        <td>{servicio.precioServicio}</td>
                                        <td>
                                            {servicio.fotoServicio ? (
                                                <img src={servicio.fotoServicio} alt="Foto Servicio" width="100" />
                                            ) : (
                                                <span>No disponible</span>
                                            )}
                                        </td>
                                        <td>
                                            <Button variant="success" onClick={() => handleShowModal(index)} className="m-1">
                                                <FaEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteServicio(index)} className="m-1">
                                                <FaTrashAlt />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Paginación */}
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Button
                                    key={index}
                                    variant="outline-secondary"
                                    onClick={() => handlePageChange(index + 1)}
                                    className="m-1"
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCodigoServicio">
                            <Form.Label>Código del Servicio</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigoServicio"
                                value={currentServicio.codigoServicio}
                                onChange={handleInputChange}
                                placeholder='Código del servicio'
                            />
                        </Form.Group>
                        <Form.Group controlId="formNombreServicio">
                            <Form.Label>Nombre del Servicio</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombreServicio"
                                value={currentServicio.nombreServicio}
                                onChange={handleInputChange}
                                placeholder='Nombre del servicio'
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescripcionServicio">
                            <Form.Label>Descripción del Servicio</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descripcionServicio"
                                value={currentServicio.descripcionServicio}
                                onChange={handleInputChange}
                                placeholder='Descripción del servicio'
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrecioServicio">
                            <Form.Label>Precio del Servicio</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="precioServicio"
                                value={currentServicio.precioServicio}
                                onChange={handleInputChange}
                                placeholder='Precio del servicio'
                            />
                        </Form.Group>
                        <Form.Group controlId="formFotoServicio">
                            <Form.Label>Foto del Servicio</Form.Label>
                            <Form.Control
                                type="file"
                                name="fotoServicio"
                                onChange={handleFileChange}
                            />
                            {currentServicio.fotoServicio && (
                                <div className="mt-2">
                                    <img src={currentServicio.fotoServicio} alt="Foto Previa" width="100" />
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSaveServicio}>
                        {editIndex !== null ? 'Guardar Cambios' : 'Agregar Servicio'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Estilos CSS */}
            <style jsx>{`
                .form-control {
                    border: 1px solid black !important;
                    background-color: white !important;
                }

                .form-control:focus {
                    border-color: black !important;
                    box-shadow: none !important;
                }

                .table {
                    background-color: white;
                    border-collapse: collapse;
                }

                .table th, .table td {
                    vertical-align: middle;
                    padding: 15px;
                    border: 1px solid black;
                }

                .table th {
                    background-color: black;
                    color: white;
                    font-weight: bold;
                }

                .table td {
                    background-color: white;
                }

                .content-container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-top: 30px;
                    margin-bottom: 30px;
                }

                .no-data-message {
                    font-size: 18px;
                    color: #888;
                    text-align: center;
                    padding: 20px;
                }

                .pagination {
                    text-align: center;
                    margin-top: 20px;
                }

                .pagination button {
                    margin: 0 5px;
                }
            `}</style>
        </div>
    );
};

export default Servicios;
