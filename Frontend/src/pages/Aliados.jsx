import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import aliadosServices from '../services/configuraciones/AliadoService.js'; 

const Aliados = () => {
    const [aliados, setAliados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAliado, setCurrentAliado] = useState({ nombreAliado: '', logoAliado: '', urlRedireccion: '' });
    const [editIndex, setEditIndex] = useState(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const aliadosPerPage = 5; // Cuántos aliados por página

    const indexOfLastAliado = currentPage * aliadosPerPage;
    const indexOfFirstAliado = indexOfLastAliado - aliadosPerPage;
    const currentAliados = aliados.slice(indexOfFirstAliado, indexOfLastAliado);

    useEffect(() => {
        // Traemos los aliados del backend al cargar el componente
        const fetchAliados = async () => {
            const aliadosData = await aliadosServices.getAliados();
            if (aliadosData) {
                setAliados(aliadosData);
            }
        };
        fetchAliados();
    }, []);

    const handleShowModal = (index = null) => {
        if (index !== null) {
            setCurrentAliado(aliados[index]);
            setEditIndex(index);
        } else {
            setCurrentAliado({ nombreAliado: '', logoAliado: '', urlRedireccion: '' });
            setEditIndex(null);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAliado({ ...currentAliado, [name]: value });
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
                setCurrentAliado({ ...currentAliado, logoAliado: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveAliado = async () => {
        // Validación de datos
        if (!currentAliado.nombreAliado.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre del aliado es obligatorio',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        if (!currentAliado.urlRedireccion.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La URL de redirección es obligatoria',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        if (currentAliado.urlRedireccion && !urlPattern.test(currentAliado.urlRedireccion)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa una URL válida',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }
    
        try {
            let savedAliado;
            if (editIndex !== null) {
                // Editar aliado
                savedAliado = await aliadosServices.editAliado(aliados[editIndex]._id, currentAliado);
                setAliados(aliados.map((aliado, index) => (index === editIndex ? savedAliado : aliado)));
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Aliado actualizado exitosamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            } else {
                // Agregar aliado sin las fotos
                savedAliado = await aliadosServices.addAliado(currentAliado);
                setAliados([...aliados, savedAliado]);
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Aliado agregado exitosamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
    
            // Paso 2: Si hay fotos, enviarlas a la ruta correspondiente usando el ID
            if (currentAliado.logoAliado) {
                const formData = new FormData();
                formData.append('logoAliado', currentAliado.logoAliado);
    
                // Paso 3: Enviar las fotos usando el ID del aliado
                await aliadosServices.uploadLogoAliado(savedAliado._id, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Foto cargada',
                    text: 'Logo cargado exitosamente',
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
                text: 'Hubo un error al guardar el aliado',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    
        handleCloseModal();
    };
    

    const handleDeleteAliado = async (idAliado) => {
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
                    await aliadosServices.deleteAliado(idAliado);
                    setAliados(aliados.filter(aliado => aliado._id !== idAliado));
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Aliado eliminado exitosamente',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al eliminar el aliado',
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
    const totalPages = Math.ceil(aliados.length / aliadosPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='container'>
            <h1 className='text-center m-4' style={{ fontWeight: 700 }}>ALIADOS</h1>
            <div className="d-flex justify-content-start">
                <Button variant="primary" onClick={() => handleShowModal()}>Agregar Aliado</Button>
            </div>

            <div className="content-container mt-4">
                {aliados.length === 0 ? (
                    <p className="no-data-message">No hay aliados disponibles.</p>
                ) : (
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Logo</th>
                                    <th>URL</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAliados.map((aliado) => (
                                    <tr key={aliado._id}>
                                        <td>{aliado.nombreAliado}</td>
                                        <td>
                                            {aliado.logoAliado ? (
                                                <img src={aliado.logoAliado} alt="Logo Aliado" width="100" />
                                            ) : (
                                                <span>No disponible</span>
                                            )}
                                        </td>
                                        <td>{aliado.urlRedireccion}</td>
                                        <td>
                                            <Button variant="success" onClick={() => handleShowModal(aliado)} className="m-1">
                                                <FaEdit />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteAliado(aliado._id)} className="m-1">
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
                    <Modal.Title>{editIndex !== null ? 'Editar Aliado' : 'Agregar Aliado'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNombreAliado">
                            <Form.Label>Nombre del Aliado</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombreAliado"
                                value={currentAliado.nombreAliado}
                                onChange={handleInputChange}
                                placeholder='Nombre del aliado'
                            />
                        </Form.Group>
                        <Form.Group controlId="formLogoAliado">
                            <Form.Label>Logo del Aliado</Form.Label>
                            <Form.Control
                                type="file"
                                name="logoAliado"
                                onChange={handleFileChange}
                            />
                            {currentAliado.logoAliado && (
                                <div className="mt-2">
                                    <img src={currentAliado.logoAliado} alt="Logo Previo" width="100" />
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formUrlRedireccion">
                            <Form.Label>URL de Redirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="urlRedireccion"
                                value={currentAliado.urlRedireccion}
                                onChange={handleInputChange}
                                placeholder='URL de redirección'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSaveAliado}>
                        {editIndex !== null ? 'Guardar Cambios' : 'Agregar Aliado'}
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

export default Aliados;
