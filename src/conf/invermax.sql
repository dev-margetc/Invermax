-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2024 a las 20:35:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `invermax`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blogs`
--

CREATE TABLE `blogs` (
  `id_blog` int(11) NOT NULL,
  `titulo_blog` varchar(50) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_autor` int(11) NOT NULL COMMENT 'Es el id del usuario que creó el blog'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Guarda los blogs de la BD';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas`
--

CREATE TABLE `caracteristicas` (
  `id_caracteristica` int(11) NOT NULL,
  `nombre_caracteristica` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Caracteristicas de los planes';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas_planes`
--

CREATE TABLE `caracteristicas_planes` (
  `id_plan` int(11) NOT NULL,
  `id_caracteristica` int(11) NOT NULL,
  `valor_caracteristica` varchar(25) NOT NULL COMMENT 'Define el valor para la caracteristica y el plan asociado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_zonas`
--

CREATE TABLE `categorias_zonas` (
  `id_categoria` int(11) NOT NULL,
  `categoria` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Posibles categorías de las zonas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `cod_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id_customer` int(11) NOT NULL,
  `nombre_customer` varchar(50) NOT NULL,
  `logo_customer` varchar(255) DEFAULT NULL COMMENT 'Contiene la URL con el logo de la inmobiliaria',
  `correo_notificaciones` varchar(50) NOT NULL,
  `telefono_notificaciones` varchar(30) NOT NULL,
  `telefono_fijo` varchar(30) DEFAULT NULL,
  `codigo_customer` varchar(30) DEFAULT NULL COMMENT 'Codigo unico de una inmobiliaria/tipo de customer. No es requerido',
  `perfil` varchar(25) NOT NULL COMMENT 'Tipo de customer. Pueden ser constructora,inmobiliaria,agente inmobiliario,propietario',
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene a los usuarios tipo inmobiliaria';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_inmuebles`
--

CREATE TABLE `detalles_inmuebles` (
  `id_detalle` int(11) NOT NULL,
  `valor_inmueble` decimal(12,2) NOT NULL COMMENT 'Valor definido como COP',
  `area` int(11) NOT NULL COMMENT 'Area definida en metros cuadrados',
  `iframe_recorrido` varchar(255) NOT NULL COMMENT 'Solo se guarda la URL del iframe del recorrido virtual',
  `cantidad_habitaciones` int(11) NOT NULL,
  `cantidad_baños` int(11) NOT NULL,
  `parqueadero` varchar(25) NOT NULL COMMENT 'Posibles valores: ''Sí, carros'',''Sí, moto'',''No'',''''',
  `id_inmueble` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL COMMENT 'Referencia al proyecto. si es null es porque no pertenece a un proyecto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene detalles de los inmuebles y separar proyectos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `id_foto` int(11) NOT NULL,
  `url_foto` varchar(255) NOT NULL,
  `id_detalle_inmueble` int(11) DEFAULT NULL,
  `id_blog` int(11) DEFAULT NULL COMMENT 'id del blog al que pertenece la foto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles`
--

CREATE TABLE `inmuebles` (
  `id_inmueble` int(11) NOT NULL,
  `codigo_inmueble` varchar(30) NOT NULL COMMENT 'Codigo unico de un inmueble dado por alguna entidad',
  `descripcion` text NOT NULL,
  `estado_inmueble` varchar(25) NOT NULL COMMENT 'Estos pueden ser Nuevo o Usado',
  `modalidad` varchar(15) NOT NULL COMMENT 'La modalidad del inmueble. Pueden ser compra o arriendo',
  `titulo_inmueble` varchar(100) NOT NULL,
  `estrato` tinyint(3) UNSIGNED NOT NULL,
  `administracion_incluida` tinyint(1) NOT NULL COMMENT 'Valor de false indica que no está incluida',
  `tipo_vivienda` varchar(25) NOT NULL COMMENT 'Puede ser VIS o NO VIS',
  `frame_maps` varchar(255) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `cod_ciudad` int(11) NOT NULL,
  `id_tipo_inmueble` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles_destacados`
--

CREATE TABLE `inmuebles_destacados` (
  `id_destacado` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL COMMENT 'Fecha y hora de cuando se marcó como destacado la primera vez. Permite luego calcular cuantos días le quedan',
  `estado_destacado` tinyint(1) NOT NULL COMMENT 'Cuando tiene su valor en true se hará el calculo para descontar los días del plan',
  `id_inmueble` int(11) NOT NULL,
  `id_suscripcion` int(11) NOT NULL COMMENT 'Suscripcion asociada al inmueble destacado para poder saber cuantos días permite su plan como maximo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles_en_ascenso`
--

CREATE TABLE `inmuebles_en_ascenso` (
  `id_ascenso` int(11) NOT NULL,
  `fecha_inicio` int(11) NOT NULL COMMENT 'Fecha de inicio del inmueble como "en ascenso"',
  `estado_ascenso` tinyint(1) NOT NULL COMMENT 'Verdadero si está en ascenso falso si no. Se usa para descontar las horas del plan',
  `id_inmueble` int(11) NOT NULL,
  `id_suscripcion` int(11) NOT NULL COMMENT 'Suscripción asociada al inmueble en ascenso para saber cuanto tiempo le queda segun el plan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interesados`
--

CREATE TABLE `interesados` (
  `id_interesado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL COMMENT 'Nombre completo del interesado',
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `ubicacion` varchar(25) NOT NULL COMMENT 'Puede ser rural o urbana',
  `subsidio` tinyint(1) NOT NULL COMMENT 'Con o sin subsidio. Con: True, Sin: False',
  `estado_civil` varchar(40) NOT NULL,
  `id_inmueble` int(11) NOT NULL COMMENT 'Inmueble al cual está interesado el usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id_plan` int(11) NOT NULL,
  `tipo_plan` varchar(50) NOT NULL COMMENT 'Nombre del plan',
  `precio` decimal(10,2) NOT NULL,
  `duracion` int(11) NOT NULL DEFAULT 30 COMMENT 'Duracion en dias'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id_proyecto` int(11) NOT NULL,
  `fecha_entrega` date NOT NULL,
  `id_inmueble` int(11) NOT NULL COMMENT 'Referencia al inmueble para acceder a sus datos'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene datos particulares de los proyectos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones`
--

CREATE TABLE `suscripciones` (
  `id_suscripcion` int(11) NOT NULL,
  `fecha_inicio` int(11) NOT NULL,
  `fecha_fin` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL COMMENT 'Referencia al suscriptor del plan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inmueble`
--

CREATE TABLE `tipo_inmueble` (
  `id_tipo_inmueble` int(11) NOT NULL,
  `tipo_inmueble` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tipo_usuario` enum('usuario','customer','admin','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id_video` int(11) NOT NULL,
  `url_video` varchar(255) NOT NULL,
  `id_detalle_inmueble` int(11) DEFAULT NULL,
  `id_blog` int(11) DEFAULT NULL COMMENT 'Id del blog al que pertenece la imagen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

CREATE TABLE `zonas` (
  `id_zona` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `icono` varchar(25) NOT NULL,
  `tipo_zona` varchar(25) NOT NULL COMMENT 'Zonas de interés o zonas comunes',
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Zonas de interes o comunes para los inmuebles ';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas_inmuebles`
--

CREATE TABLE `zonas_inmuebles` (
  `id_inmueble` int(11) NOT NULL,
  `id_zona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Intermedia entre los inmuebles y las zonas';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id_blog`),
  ADD KEY `id_autor` (`id_autor`);

--
-- Indices de la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  ADD PRIMARY KEY (`id_caracteristica`);

--
-- Indices de la tabla `caracteristicas_planes`
--
ALTER TABLE `caracteristicas_planes`
  ADD PRIMARY KEY (`id_plan`,`id_caracteristica`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_caracteristica` (`id_caracteristica`);

--
-- Indices de la tabla `categorias_zonas`
--
ALTER TABLE `categorias_zonas`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`cod_ciudad`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id_customer`),
  ADD UNIQUE KEY `codigo_inmobiliaria` (`codigo_customer`),
  ADD KEY `id_inmobiliaria` (`id_customer`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `detalles_inmuebles`
--
ALTER TABLE `detalles_inmuebles`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_inmueble` (`id_inmueble`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id_foto`),
  ADD KEY `id_detalle_inmueble` (`id_detalle_inmueble`),
  ADD KEY `id_blog` (`id_blog`);

--
-- Indices de la tabla `inmuebles`
--
ALTER TABLE `inmuebles`
  ADD PRIMARY KEY (`id_inmueble`),
  ADD UNIQUE KEY `codigo_inmueble` (`codigo_inmueble`),
  ADD KEY `id_inmobiliaria` (`id_customer`),
  ADD KEY `cod_ciudad` (`cod_ciudad`),
  ADD KEY `id_tipo_inmueble` (`id_tipo_inmueble`);

--
-- Indices de la tabla `inmuebles_destacados`
--
ALTER TABLE `inmuebles_destacados`
  ADD PRIMARY KEY (`id_destacado`),
  ADD KEY `id_inmueble` (`id_inmueble`),
  ADD KEY `id_suscripcion` (`id_suscripcion`);

--
-- Indices de la tabla `inmuebles_en_ascenso`
--
ALTER TABLE `inmuebles_en_ascenso`
  ADD PRIMARY KEY (`id_ascenso`),
  ADD KEY `id_inmueble` (`id_inmueble`),
  ADD KEY `id_suscripcion` (`id_suscripcion`);

--
-- Indices de la tabla `interesados`
--
ALTER TABLE `interesados`
  ADD PRIMARY KEY (`id_interesado`),
  ADD KEY `id_inmueble` (`id_inmueble`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id_plan`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `id_inmueble` (`id_inmueble`);

--
-- Indices de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id_suscripcion`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indices de la tabla `tipo_inmueble`
--
ALTER TABLE `tipo_inmueble`
  ADD PRIMARY KEY (`id_tipo_inmueble`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id_video`),
  ADD KEY `id_negocio` (`id_detalle_inmueble`),
  ADD KEY `id_blog` (`id_blog`);

--
-- Indices de la tabla `zonas`
--
ALTER TABLE `zonas`
  ADD PRIMARY KEY (`id_zona`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `zonas_inmuebles`
--
ALTER TABLE `zonas_inmuebles`
  ADD PRIMARY KEY (`id_inmueble`,`id_zona`),
  ADD KEY `id_zona` (`id_zona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id_blog` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `caracteristicas`
--
ALTER TABLE `caracteristicas`
  MODIFY `id_caracteristica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias_zonas`
--
ALTER TABLE `categorias_zonas`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `cod_ciudad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_inmuebles`
--
ALTER TABLE `detalles_inmuebles`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inmuebles`
--
ALTER TABLE `inmuebles`
  MODIFY `id_inmueble` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inmuebles_destacados`
--
ALTER TABLE `inmuebles_destacados`
  MODIFY `id_destacado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inmuebles_en_ascenso`
--
ALTER TABLE `inmuebles_en_ascenso`
  MODIFY `id_ascenso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `interesados`
--
ALTER TABLE `interesados`
  MODIFY `id_interesado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id_suscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_inmueble`
--
ALTER TABLE `tipo_inmueble`
  MODIFY `id_tipo_inmueble` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id_video` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `id_zona` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `caracteristicas_planes`
--
ALTER TABLE `caracteristicas_planes`
  ADD CONSTRAINT `caracteristicas_planes_ibfk_2` FOREIGN KEY (`id_caracteristica`) REFERENCES `caracteristicas` (`id_caracteristica`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `caracteristicas_planes_ibfk_3` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalles_inmuebles`
--
ALTER TABLE `detalles_inmuebles`
  ADD CONSTRAINT `detalles_inmuebles_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`),
  ADD CONSTRAINT `detalles_inmuebles_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`);

--
-- Filtros para la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`id_detalle_inmueble`) REFERENCES `detalles_inmuebles` (`id_detalle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fotos_ibfk_2` FOREIGN KEY (`id_blog`) REFERENCES `blogs` (`id_blog`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inmuebles`
--
ALTER TABLE `inmuebles`
  ADD CONSTRAINT `inmuebles_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id_customer`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inmuebles_ibfk_2` FOREIGN KEY (`cod_ciudad`) REFERENCES `ciudades` (`cod_ciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `inmuebles_ibfk_3` FOREIGN KEY (`id_tipo_inmueble`) REFERENCES `tipo_inmueble` (`id_tipo_inmueble`);

--
-- Filtros para la tabla `inmuebles_destacados`
--
ALTER TABLE `inmuebles_destacados`
  ADD CONSTRAINT `inmuebles_destacados_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inmuebles_destacados_ibfk_2` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripciones` (`id_suscripcion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inmuebles_en_ascenso`
--
ALTER TABLE `inmuebles_en_ascenso`
  ADD CONSTRAINT `inmuebles_en_ascenso_ibfk_1` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripciones` (`id_suscripcion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inmuebles_en_ascenso_ibfk_2` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`);

--
-- Filtros para la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD CONSTRAINT `suscripciones_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id_customer`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `suscripciones_ibfk_2` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`id_detalle_inmueble`) REFERENCES `detalles_inmuebles` (`id_detalle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`id_blog`) REFERENCES `blogs` (`id_blog`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `zonas`
--
ALTER TABLE `zonas`
  ADD CONSTRAINT `zonas_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_zonas` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `zonas_inmuebles`
--
ALTER TABLE `zonas_inmuebles`
  ADD CONSTRAINT `zonas_inmuebles_ibfk_1` FOREIGN KEY (`id_zona`) REFERENCES `zonas` (`id_zona`) ON UPDATE CASCADE,
  ADD CONSTRAINT `zonas_inmuebles_ibfk_2` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
