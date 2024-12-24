import React from "react";
import { Tab, Tabs, Table, Container, Button } from "react-bootstrap";
import "../style/App3.css"; // Archivo de estilos personalizado
import TablaPlanes from "../components/TablaPlanes";

const Planes = () => {

  const planesPorPerfil = {
    "Constructora": [
      {
        "titulo": "Plan Constructora Básico",
        "proyectos": "1 proyecto",
        "descripcion": "Ideal para constructoras que inician su promoción digital. Incluye herramientas básicas para la publicación de proyectos.",
        "caracteristicas": [
          "Publicación de proyecto",
          "Fotos 360",
          "Campaña de marketing básica"
        ]
      },
      {
        "titulo": "Plan Constructora Pro",
        "proyectos": "3 proyectos",
        "descripcion": "Diseñado para constructoras que buscan mayor alcance y análisis de mercado.",
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
        "descripcion": "Optimizado para constructoras que desean posicionarse en motores de búsqueda.",
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
        "descripcion": "La solución completa para constructoras con necesidades avanzadas de promoción.",
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
        "descripcion": "Perfecto para pequeñas inmobiliarias con necesidades básicas de marketing.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos estándar",
          "Campaña en redes sociales"
        ]
      },
      {
        "titulo": "Plan Inmobiliaria Pro",
        "proyectos": "5 proyectos",
        "descripcion": "Un plan que mejora la promoción con fotos 360 y análisis de clientes.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Análisis de clientes potenciales"
        ]
      },
      {
        "titulo": "Plan Inmobiliaria Avanzado",
        "proyectos": "8 proyectos",
        "descripcion": "Para inmobiliarias que buscan recorridos interactivos y análisis detallados.",
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
        "descripcion": "Incluye integración con CRM y las mejores herramientas de marketing.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Campaña de marketing avanzada",
          "Fotos y videos profesionales",
          "Integración con CRM"
        ]
      }
    ],
    // Sección "Agente inmobiliario"
    "Agente inmobiliario": [
      {
        "titulo": "Plan Agente Básico",
        "proyectos": "1 propiedad",
        "descripcion": "Para agentes individuales que quieren empezar a promocionar propiedades.",
        "caracteristicas": [
          "Publicación de propiedad",
          "Fotos estándar",
          "Anuncio básico en redes sociales"
        ]
      },
      {
        "titulo": "Plan Agente Pro",
        "proyectos": "3 propiedades",
        "descripcion": "Incluye herramientas para campañas personalizadas.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Campaña de marketing personalizada"
        ]
      },
      {
        "titulo": "Plan Agente Avanzado",
        "proyectos": "5 propiedades",
        "descripcion": "Añade recorridos 3D y asesorías de marketing.",
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
        "descripcion": "La opción más completa para agentes con alta demanda.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos y videos profesionales",
          "Análisis de mercado personalizado",
          "Recorrido virtual interactivo"
        ]
      }
    ],
    // Sección "Propietario"
    "Propietario": [
      {
        "titulo": "Plan Propietario Básico",
        "proyectos": "1 propiedad",
        "descripcion": "Ideal para propietarios que buscan promocionar una propiedad de manera sencilla.",
        "caracteristicas": [
          "Publicación de propiedad",
          "Fotos estándar"
        ]
      },
      {
        "titulo": "Plan Propietario Pro",
        "proyectos": "3 propiedades",
        "descripcion": "Incluye opciones para aumentar la visibilidad en redes sociales.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Anuncio en redes sociales"
        ]
      },
      {
        "titulo": "Plan Propietario Avanzado",
        "proyectos": "5 propiedades",
        "descripcion": "Añade campañas de marketing para mayor impacto.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos 360",
          "Campaña de marketing"
        ]
      },
      {
        "titulo": "Plan Propietario Premium",
        "proyectos": "10 propiedades",
        "descripcion": "El plan más completo con fotos profesionales y recorridos 3D.",
        "caracteristicas": [
          "Publicación de propiedades",
          "Fotos profesionales",
          "Recorrido 3D",
          "Marketing avanzado"
        ]
      }
    ]
  };
  
  

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
