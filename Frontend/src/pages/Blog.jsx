
import React, { useState } from "react";
import "../style/App3.css";

import ImagenPrincipalBlog from "../assets/img/img-principal-blog.png";
import ImgBlog1Muestra from "../assets/img/img-blog1-muestra.png";
import ImgBlog2Muestra from "../assets/img/img-blog2-muestra.png";
import ImgBlog3Muestra from "../assets/img/img-blog3-muestra.png";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategoria, setActiveCategoria] = useState(null);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const postsPerPage = 6;

  const posts = [
    {
      id: 1,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog1Muestra,
    },
    {
      id: 2,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog2Muestra,
    },
    {
      id: 3,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog3Muestra,
    },
    {
      id: 4,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog1Muestra,
    },
    {
      id: 5,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog2Muestra,
    },
    {
      id: 6,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog3Muestra,
    },
    {
      id: 7,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog1Muestra,
    },
    {
      id: 8,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog2Muestra,
    },
    {
      id: 9,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog3Muestra,
    },
    {
      id: 3,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog3Muestra,
    },
    {
      id: 4,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog1Muestra,
    },
    {
      id: 5,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog2Muestra,
    },
    {
      id: 6,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog3Muestra,
    },
    {
      id: 7,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog1Muestra,
    },
    {
      id: 8,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog2Muestra,
    },
    {
      id: 9,
      date: "01 Sep.",
      title: "Lorem ipsum es simplemente el texto",
      description:
        "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras...",
      image: ImgBlog3Muestra,
    },

  ];

  const handleBlog = () => {
    navigate('/post'); // Navega a la ruta "/plantilla"
  };

  const categorias = [
    "Nombre categoría",
    "Nombre",
    "Long established",
    "Nombre categoría3",
    "Lorem Ipsum",
    "Letters",
    "Categoría",
    "Nombre categoría1",
    "Nombre categoría2",
  ];

  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Calcula los índices para la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => (
    <div className="pagination">
      <button
        className="pagination-arrow"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`pagination-number ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="pagination-arrow"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );

  return (
    <div className="blog-container">

      <div className="blog-titulo">
        <div className="fondo-blog-titulo">
          <h1 className="mb-3 mt-2 text-dark text-center">
            <b>Blog</b>
          </h1>
        </div>
      </div>

      <div className="blog-content container">
      <div className="blog-header ">
          <img
            src={ImagenPrincipalBlog}
            alt="Imagen principal Blog"
            className="banner-image-blog"
            loading="lazy"
          />
          <div className="banner-content-blog">
            <div className="banner-date-blog">
              <span className="date-day-blog">01</span>
              <span className="date-month-blog">Sep.</span>
            </div>
            <div className="banner-text-blog">
              <h1>Lorem Ipsum es simplemente el texto</h1>
              <p>
                Es un hecho establecido hace demasiado tiempo que un lector se
                distraerá con el contenido de texto de un sitio mientras que
                mira su diseño.
              </p>
            </div>
            <div className="vertical-dotted-line-blog"></div>
            <div className="contenedor-bottom-blog">
              <button className="banner-button-blog">Leer más</button>
            </div>
          </div>
        </div>

        </div>

        {/* <div className="categorias-container container">
      {categorias.map((categoria, index) => (
        <div key={index} className="categoria-item">
          {categoria}
        </div>
      ))}
    </div> */}

    <div className="categorias-container container">
  {categorias.map((categoria, index) => (
    <div
      key={index}
      className={`categoria-item ${
        activeCategoria === categoria ? "active" : ""
      }`}
      onClick={() => setActiveCategoria(categoria)}
    >
      {categoria}
    </div>
  ))}
</div>



    <div className="blog-content container">

        {/* {renderPagination()} */}

        <div className="blog-medium">
          <div className="blog-grid">
            {currentPosts.map((post) => (
              <div className="blog-card" key={post.id}>
                <img src={post.image} alt={post.title} className="blog-image" />
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-description">{post.description}</p>
                  <a href="#" className="blog-link" onClick={handleBlog}>
                    Leer más
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default Blog;
