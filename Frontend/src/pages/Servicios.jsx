import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import servicioService from '../services/servicios/ServicioService.js';
import UsuarioService from '../services/usuarios/UsuarioService.js';
import { useNavigate } from 'react-router-dom';


const Servicios = () => {
    const navigate = useNavigate(); // ✅ Hook para redirección
    const [isVerified, setIsVerified] = useState(false); // Estado para controlar la verificación
    const [previewLogo, setPreviewLogo] = useState(null);
  
  
    useEffect(() => {
      const verificarYRedirigir = async () => {
        try {
          const verificar = await UsuarioService.verificarAutenticacion(["admin"]);
  
          if (!verificar) {
            Swal.fire({
              icon: 'error',
              title: 'Acceso denegado',
              html: "No tienes permisos para esta pagina", // ✅ Mostrar alerta personalizada
              showConfirmButton: true,
              confirmButtonText: 'Entiendo',
              preConfirm: () => {
                navigate("/"); // ✅ Redirigir al Home
              }
            });
          } else {
            setIsVerified(true); // Marcar como verificado solo si la autenticación es exitosa
          }
        } catch (error) {
          console.error("Error verificando autenticación:", error);
        }
      };
  
      if (!isVerified) {
        verificarYRedirigir();
      }
    }, [navigate, isVerified]);

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
    const ServiciosPerPage = 5; 
    const indexOfLastServicio = currentPage * ServiciosPerPage;
    const indexOfFirstServicio = indexOfLastServicio - ServiciosPerPage;
    const currentServicios = servicios.slice(indexOfFirstServicio, indexOfLastServicio);

    const fetchServicios = async () => {
        try {
            const data = await servicioService.getServicios();
            if (data && Array.isArray(data)) {
                setServicios(data);
            }
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
        }
    };

    useEffect(() => {
        fetchServicios();
    }, []);

    const handleShowModal = (servicio = null) => {
        if (servicio !== null) {
            setCurrentServicio({ ...servicio }); // ✅ Clonamos el objeto para evitar referencias directas
            setEditIndex(servicio.idServicio);
    
            if (servicio.fotoServicio) {
                setPreviewLogo(servicio.fotoServicio);
            } else {
                setPreviewLogo(null);
            }
        } else {
            setCurrentServicio({
                codigoServicio: '',
                nombreServicio: '',
                descripcionServicio: '',
                precioServicio: '',
                fotoServicio: ''
            });
            setEditIndex(null);
            setPreviewLogo(null);
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
                Swal.fire({ icon: 'error', title: 'Error', text: 'Por favor, selecciona un archivo de imagen' });
                return;
            }
    
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'El archivo es demasiado grande. Máximo 5MB' });
                return;
            }
    
            const imageURL = URL.createObjectURL(file); // ✅ Crea la URL de previsualización
            setPreviewLogo(imageURL); // ✅ Ahora sí previsualiza la imagen seleccionada
    
            setCurrentServicio({ ...currentServicio, fotoServicio: file });
        }
    };
    
    
    

    const handleDeleteServicio = async (idServicio) => {
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
                    await servicioService.deleteServicio(idServicio);
                    setServicios(servicios.filter(servicio => servicio.idServicio !== idServicio));
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'Trámite eliminado exitosamente',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al eliminar el trámite',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            }
        });
    };

    const handleSaveServicio = async () => {
        if (!currentServicio.codigoServicio.trim() || !currentServicio.nombreServicio.trim() || !currentServicio.precioServicio.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
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
                const servicioActual = servicios.find(serv => serv.idServicio === editIndex); // ✅ Encuentra el servicio por ID
                const servicioAEnviar = {
                    ...currentServicio,
                    fotoServicio: currentServicio.fotoServicio || servicioActual?.fotoServicio
                };
            
                savedServicio = await servicioService.updateServicio(editIndex, servicioAEnviar);
            } else {
                savedServicio = await servicioService.addServicio(currentServicio);
            }
            
    
            // Actualizar la lista de servicios
            await fetchServicios();
    
            Swal.fire({
                icon: 'success',
                title: editIndex !== null ? 'Servicio actualizado' : 'Servicio agregado',
                text: editIndex !== null ? 'El servicio fue actualizado correctamente' : 'El servicio fue agregado correctamente',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
    
            handleCloseModal(); // Cerrar el modal después de guardar
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
    };
      // Funciones de paginación
  const totalPages = Math.ceil(servicios.length / ServiciosPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    return (
        <div className='container'>
            <h1 className='text-center m-4' style={{ fontWeight: 700 }}>OTROS TRÁMITES</h1>
            <div className="d-flex justify-content-start">
                <Button variant="none" className='button-rojo-general'  onClick={() => handleShowModal()}>Nuevo Trámite</Button>
            </div>


            <div className="content-container mt-4">
                {servicios.length === 0 ? (
                    <p className="no-data-message">No hay trámites disponibles.</p>
                ) : (
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentServicios.map((servicio,index) => (
                                    <tr key={servicio.idServicio}>
                                        <td>{servicio.codigoServicio}</td>
                                        <td>{servicio.nombreServicio}</td>
                                        <td>{servicio.descripcionServicio}</td>
                                        <td>{servicio.precioServicio}</td>
                                        <td>
                                            {servicio.fotoServicio ? (
                                                <img src={servicio.fotoServicio} alt="Servicio" width="100" />
                                            ) : (
                                                <span>No disponible</span>
                                            )}
                                        </td>

                                        <td>
                                        <Button variant="success" onClick={() => handleShowModal(servicio)} className="m-1">
    <FaEdit />
</Button>

                                            <Button variant="danger" onClick={() => handleDeleteServicio(servicio.idServicio)} className="m-1">
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

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Editar Trámite' : 'Agregar Trámite'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
    <Form.Group className='mb-3'>
        <Form.Label>Código del Trámite</Form.Label>
        <Form.Control
            type="text"
            name="codigoServicio"
            value={currentServicio.codigoServicio}
            placeholder='Ingrese el código del servicio'
            onChange={handleInputChange}
        />
    </Form.Group>

    <Form.Group className='mb-3'>
        <Form.Label>Nombre del Trámite</Form.Label>
        <Form.Control
            type="text"
            name="nombreServicio"
            placeholder='Ingrese el nombre del servicio'
            value={currentServicio.nombreServicio}
            onChange={handleInputChange}
        />
    </Form.Group>

    <Form.Group className='mb-3'>
        <Form.Label>Descripción del Trámite</Form.Label>
        <Form.Control
            as="textarea"
            name="descripcionServicio"
            placeholder='Ingrese la descripción del servicio'
            value={currentServicio.descripcionServicio}
            onChange={handleInputChange}
        />
    </Form.Group>

    <Form.Group className='mb-3'>
        <Form.Label>Precio del Trámite</Form.Label>
        <Form.Control
            type="number"
            name="precioServicio"
            placeholder='Ingrese el precio del servicio'
            value={currentServicio.precioServicio}
            onChange={handleInputChange}
        />
    </Form.Group>

    {/* 🔴 Agregar el campo tipoModulo igual que en Aliados */}
    <Form.Group className='mb-3'>
        <Form.Control 
            type="hidden" 
            name="tipoModulo" 
            value="servicios" 
        />
    </Form.Group>

    {/* Manejo de la imagen igual que en Aliados */}
    <Form.Group className='mb-3'>
        <Form.Label>Foto del Trámite</Form.Label>
        <Form.Control type="file" name="fotoServicio" onChange={handleFileChange} />
        {currentServicio.fotoServicio && (
            <div className="mt-2">
                <img src={currentServicio.fotoServicio} alt="Vista previa" width="100" />
            </div>
        )}
    </Form.Group>
</Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="none" className='button-negro-general-ser' onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="none" className='button-rojo-general'  onClick={handleSaveServicio}>
                        {editIndex !== null ? 'Guardar Cambios' : 'Agregar Trámite'}
                    </Button>
                </Modal.Footer>
            </Modal>

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

                .button-rojo-general{
                width: 120;
                height: 30;
                border-radius: 10px;
                padding-top: 8px;
                padding-right: 24px;
                padding-bottom: 8px;
                padding-left: 24px;
                gap: 10px;
                background-color: #FF0000;
                border-color: #FF0000;
                color: white;
                }

                .button-rojo-general:hover{
                background-color: #FF0000;
                border-color: #FF0000;
                            }

                .button-negro-general-ser{
                width: 120;
                height: 30;
                border-radius: 10px;
                padding-top: 8px;
                padding-right: 24px;
                padding-bottom: 8px;
                padding-left: 24px;
                gap: 10px;
                background-color: #000000;
                border-color: #000000;
                 color: white;
                }

                .button-negro-general-ser:hover{
                background-color: #000000;
                border-color: #000000;
                 color: white;
                }
           `}</style>
        </div>
    );
};

export default Servicios;