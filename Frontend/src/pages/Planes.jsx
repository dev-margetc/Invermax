import React, { useState, useEffect } from "react";
import { Tab, Tabs, Table, Container, Button } from "react-bootstrap";
import "../style/App3.css"; // Archivo de estilos personalizado
import TablaPlanes from "../components/TablaPlanes";
import planService from "../services/suscripciones/PlanService"

const Planes = () => {

  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const data = await planService.getPlanesActivosPerfil();
        console.log(data);
        setPlanes(data); // Los datos ya están formateados
      } catch (error) {
        console.error("Error al cargar los planes:", error);
      }
    };
    fetchPlanes();
  }, []);

  const planesPorPerfil = {
    "Constructora": [
      {
        "titulo": "Plan Constructora Básico",
        "proyectos": "1 proyecto",
        "caracteristicas": [
          "Publicación de proyecto",
          "Fotos 360",
          "Campaña de marketing básica"
        ]
      },
      {
        "titulo": "Plan Constructora Pro",
        "proyectos": "3 proyectos",
        "caracteristicas": [
          "Publicación de proyecto",
          "Fotos 360",
          "Recorrido 3D",
          "Análisis de mercado"
        ]
      },
      {
        "titulo": "Plan Constructora Avanzado",
        "proyectos": "5 proyectos",
        "caracteristicas": [
          "Publicación de proyecto",
          "Recorrido 3D",
          "Fotos 360",
          "Posicionamiento SEO"
        ]
      },
      {
        "titulo": "Plan Constructora Premium",
        "proyectos": "10 proyectos",
        "caracteristicas": [
          "Publicación de proyecto",
          "Fotos 360",
          "Campaña de marketing avanzada",
          "Recorrido 3D interactivo"
        ]
      }
    ],
    "Inmobiliaria": [
      {
        "titulo": "Plan Inmobiliaria Básico",
        "proyectos": "2 proyectos",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos estándar",
          "Campaña en redes sociales"
        ]
      },
      {
        "titulo": "Plan Inmobiliaria Pro",
        "proyectos": "5 proyectos",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Análisis de clientes potenciales"
        ]
      },
      {
        "titulo": "Plan Inmobiliaria Avanzado",
        "proyectos": "8 proyectos",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Recorrido 3D interactivo",
          "Análisis detallado del mercado"
        ]
      },
      {
        "titulo": "Plan Inmobiliaria Premium",
        "proyectos": "12 proyectos",
        "caracteristicas": [
          "Publicación de propiedades",
          "Campaña de marketing avanzada",
          "Fotos y videos profesionales",
          "Integración con CRM"
        ]
      }
    ],
    "Agente inmobiliario": [
      {
        "titulo": "Plan Agente Básico",
        "proyectos": "1 propiedad",
        "caracteristicas": [
          "Publicación de propiedad",
          "Fotos estándar",
          "Anuncio básico en redes sociales"
        ]
      },
      {
        "titulo": "Plan Agente Pro",
        "proyectos": "3 propiedades",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Campaña de marketing personalizada"
        ]
      },
      {
        "titulo": "Plan Agente Avanzado",
        "proyectos": "5 propiedades",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Recorrido 3D",
          "Asesoría de marketing"
        ]
      },
      {
        "titulo": "Plan Agente Premium",
        "proyectos": "10 propiedades",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos y videos profesionales",
          "Análisis de mercado personalizado",
          "Recorrido virtual interactivo"
        ]
      }
    ],
    "Propietario": [
      {
        "titulo": "Plan Propietario Básico",
        "proyectos": "1 propiedad",
        "caracteristicas": [
          "Publicación de propiedad",
          "Fotos estándar"
        ]
      },
      {
        "titulo": "Plan Propietario Pro",
        "proyectos": "3 propiedades",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Anuncio en redes sociales"
        ]
      },
      {
        "titulo": "Plan Propietario Avanzado",
        "proyectos": "5 propiedades",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Campaña de marketing"
        ]
      },
      {
        "titulo": "Plan Propietario Premium",
        "proyectos": "10 propiedades",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos profesionales",
          "Recorrido 3D",
          "Marketing avanzado"
        ]
      }
    ]
  }
  

  return (
    <>
    <div className="planes-section">
      {/* Banner Superior */}
      <div className="planes-banner ">
        <h1 className="text-center titulo-principal-planes ">NUESTROS PLANES</h1>
        <div className="linea-roja"></div>
        <div className="sub-banner-padre">
          <div className="sub-banner-planes">
          <h2 className="text-center subtitulo-planes">
            SELECCIONA TU PERFIL Y TU PLAN
          </h2>
          
          <p className="text-center descripcion-planes">
            Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor.
          </p>
          </div>
        </div>

      </div>

      <div className="separador">
        
      </div>

      {/* Pestañas */}

      <TablaPlanes planesPorPerfil={planesPorPerfil} />
    </div>    
   </>
  );
};

export default Planes;
