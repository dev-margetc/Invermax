-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-01-2025 a las 19:33:06
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
  `foto_principal` varchar(50) DEFAULT NULL COMMENT 'Nombre de la foto principal del blog',
  `id_autor` int(11) NOT NULL COMMENT 'Es el id del usuario que creó el blog'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Guarda los blogs de la BD';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas`
--

CREATE TABLE `caracteristicas` (
  `id_caracteristica` int(11) NOT NULL,
  `nombre_caracteristica` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL COMMENT 'Descripción mas detallada en caso de ocuparse',
  `clave` varchar(25) NOT NULL COMMENT 'Valor único que permite buscar en la BD y permitirá no basarse en el nombre para consultas',
  `obligatoria` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0-- No es obligatoria\r\n1-- Obligatoria'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Caracteristicas de los planes';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas_planes`
--

CREATE TABLE `caracteristicas_planes` (
  `id_plan` int(11) NOT NULL,
  `id_caracteristica` int(11) NOT NULL,
  `valor_caracteristica` varchar(25) NOT NULL COMMENT 'Define el valor de la caracteristica asociada en el plan asociado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_blogs`
--

CREATE TABLE `categorias_blogs` (
  `id_categoria` int(11) NOT NULL,
  `id_blog` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `cod_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(20) NOT NULL,
  `id_departamento` int(11) NOT NULL
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
  `numero_comercial` varchar(25) DEFAULT NULL,
  `estado_customer` varchar(25) NOT NULL DEFAULT 'inactivo' COMMENT 'Estados posibles: "activo", "inactivo", "nuevo"',
  `id_usuario` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL COMMENT 'id del perfil asociado a este customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene a los usuarios tipo inmobiliaria';

--
-- Disparadores `customers`
--
DELIMITER $$
CREATE TRIGGER `desactivar_inmuebles` AFTER UPDATE ON `customers` FOR EACH ROW BEGIN
    -- Verificar que el estado del customer haya cambiado a 'inactivo'
    IF NEW.estado_customer = 'inactivo' AND OLD.estado_customer != 'inactivo' THEN
        -- Actualizar los inmuebles relacionados de ese customer a 'borrador'
        UPDATE inmuebles
        SET estado_publicacion = 'borrador'
        WHERE id_customer = NEW.id_customer;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `id_departamento` int(11) NOT NULL,
  `nombre_departamento` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_inmuebles`
--

CREATE TABLE `detalles_inmuebles` (
  `id_detalle` int(11) NOT NULL,
  `valor_inmueble` decimal(12,2) NOT NULL COMMENT 'Valor definido como COP',
  `area` int(11) NOT NULL COMMENT 'Area definida en metros cuadrados',
  `iframe_recorrido` varchar(255) DEFAULT NULL COMMENT 'Solo se guarda la URL del iframe del recorrido virtual',
  `cantidad_habitaciones` int(11) NOT NULL,
  `cantidad_baños` int(11) NOT NULL,
  `parqueadero` varchar(25) NOT NULL COMMENT 'Posibles valores: ''Sí, carros'',''Sí, moto'',''No''',
  `amoblado` tinyint(1) NOT NULL COMMENT '0 indica que no es amoblado, 1 indica que sí',
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
  `ubicacion_inmueble` varchar(50) NOT NULL COMMENT 'Dirección del inmueble',
  `estado_inmueble` varchar(25) NOT NULL COMMENT 'Estos pueden ser Nuevo o Usado',
  `modalidad` varchar(15) NOT NULL COMMENT 'La modalidad del inmueble. Pueden ser compra o arriendo',
  `titulo_inmueble` varchar(100) NOT NULL,
  `estrato` tinyint(1) UNSIGNED NOT NULL,
  `administracion_incluida` tinyint(1) DEFAULT NULL COMMENT 'Valor de 0\r\nindica que no está incluida',
  `tipo_vivienda` varchar(25) NOT NULL COMMENT 'Puede ser VIS o NO VIS',
  `iframe_maps` varchar(2048) DEFAULT NULL,
  `estado_publicacion` varchar(25) NOT NULL COMMENT 'Puede estar en ''borrador'' o ''publicado''',
  `fecha_publicacion` datetime DEFAULT NULL COMMENT 'Fecha de publicacion, es null cuando no está publicado el inmueble',
  `id_customer` int(11) NOT NULL,
  `cod_ciudad` int(11) NOT NULL,
  `id_tipo_inmueble` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `inmuebles`
--
DELIMITER $$
CREATE TRIGGER `actualizar_estado_ascenso` AFTER UPDATE ON `inmuebles` FOR EACH ROW BEGIN
    -- Si el estado nuevo es borrador
    IF NEW.estado_publicacion = 'borrador' THEN
        -- Actualizar el registro de inmueble destacados a inactivo (0) y su fecha a null
        UPDATE inmuebles_en_ascenso
        SET  tiempo_acumulado = tiempo_acumulado + 	TIMESTAMPDIFF(MINUTE, fecha_inicio, NOW()),
        	fecha_inicio = NULL,
         	estado_ascenso = 0
        WHERE id_inmueble = NEW.id_inmueble;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `actualizar_estado_destacado` AFTER UPDATE ON `inmuebles` FOR EACH ROW BEGIN
    -- Si el estado nuevo es borrador
    IF NEW.estado_publicacion = 'borrador' THEN
      -- Calcular el tiempo transcurrido en minutos y actualizar el acumulado
        -- Actualizar el registro de inmueble destacados a inactivo (0) y su fecha a null
        UPDATE inmuebles_destacados
        SET 
        tiempo_acumulado = tiempo_acumulado + 	TIMESTAMPDIFF(MINUTE, fecha_inicio, NOW()),
        	fecha_inicio = NULL,
         	estado_destacado = 0
        WHERE id_inmueble = NEW.id_inmueble AND estado_destacado=1;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `actualizar_fecha_publicacion` BEFORE UPDATE ON `inmuebles` FOR EACH ROW BEGIN
    -- Si el nuevo estado es 'borrador', establecer la fecha de publicación como NULL
    IF NEW.estado_publicacion = 'borrador' THEN
        SET NEW.fecha_publicacion = NULL;
    -- Si el nuevo estado es 'publicado', establecer la fecha de publicación a la fecha y hora actuales
    ELSEIF NEW.estado_publicacion = 'publicado' THEN
        SET NEW.fecha_publicacion = NOW();
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles_destacados`
--

CREATE TABLE `inmuebles_destacados` (
  `id_destacado` int(11) NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL COMMENT 'Fecha y hora de cuando se marcó como destacado la primera vez. Permite luego calcular cuantos días le quedan',
  `estado_destacado` tinyint(1) NOT NULL COMMENT 'Cuando tiene su valor en activo se hará el calculo para descontar los días del plan. 0 inactivo, 1 activo',
  `tiempo_acumulado` int(11) NOT NULL COMMENT 'En minutos, refleja cuanto tiempo lleva el inmueble como destacado',
  `codigo_periodo` varchar(10) NOT NULL COMMENT 'periodo de tiempo correspondiente a la suscripción activa \r\n        * en el que un inmueble es marcado como destacado',
  `id_inmueble` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmuebles_en_ascenso`
--

CREATE TABLE `inmuebles_en_ascenso` (
  `id_ascenso` int(11) NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL COMMENT 'Fecha de inicio del inmueble como "en ascenso"',
  `estado_ascenso` tinyint(1) NOT NULL COMMENT 'Verdadero si está en ascenso falso si no. Se usa para descontar las horas del plan',
  `tiempo_acumulado` int(11) NOT NULL,
  `codigo_periodo` varchar(15) NOT NULL,
  `id_inmueble` int(11) DEFAULT NULL
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
-- Estructura de tabla para la tabla `perfiles_customer`
--

CREATE TABLE `perfiles_customer` (
  `id_perfil` int(11) NOT NULL,
  `perfil` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Perfiles de los diferentes customer';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id_plan` int(11) NOT NULL,
  `tipo_plan` varchar(50) NOT NULL COMMENT 'Nombre del plan',
  `estado_plan` tinyint(1) NOT NULL COMMENT '0 inactivo, 1 activo',
  `id_perfil` int(11) NOT NULL COMMENT 'id del perfil customer asociado a este plan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios_planes`
--

CREATE TABLE `precios_planes` (
  `id_precio_plan` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `duracion` int(11) DEFAULT NULL COMMENT 'Duracion en meses',
  `estado_precio` tinyint(1) NOT NULL COMMENT '0 inactivo, 1 activo',
  `id_plan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Guarda detalles de precio y duracion de los planes';

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
-- Estructura de tabla para la tabla `saldos_caracteristicas`
--

CREATE TABLE `saldos_caracteristicas` (
  `id_suscripcion` int(11) NOT NULL,
  `id_caracteristica` int(11) NOT NULL,
  `capacidad_disponible` decimal(10,2) DEFAULT NULL COMMENT 'Muestra qué tanto de la caracteristica le queda a la suscripción'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='"cuanto" de una característica le queda a una suscripción';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(11) NOT NULL,
  `codigo` varchar(50) NOT NULL COMMENT 'Código para identificar los servicios sin depender del id o el nombre',
  `nombre` varchar(50) NOT NULL COMMENT 'Nombre del servicio',
  `descripcion` text NOT NULL COMMENT 'Descripción del servicio',
  `foto_servicio` varchar(50) DEFAULT NULL COMMENT 'Guarda el nombre de la foto, la ruta e establece en el frontend',
  `precio` decimal(10,2) NOT NULL COMMENT 'Precio del servicio en COP'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Permite guardar los servicios ofrecidos por INVERMAX';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones`
--

CREATE TABLE `suscripciones` (
  `id_suscripcion` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `medio_pago` varchar(25) DEFAULT NULL,
  `id_transaccion` varchar(50) DEFAULT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  `monto_pagado` decimal(10,2) DEFAULT NULL,
  `estado` varchar(25) NOT NULL COMMENT 'POSIBLES ESTADOS= "activa", "inactiva", "pendiente"',
  `id_customer` int(11) NOT NULL COMMENT 'Referencia al suscriptor del plan',
  `id_precio_plan` int(11) NOT NULL COMMENT 'Referencia al precio y duración del plan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_inmueble`
--

CREATE TABLE `tipos_inmueble` (
  `id_tipo_inmueble` int(11) NOT NULL,
  `tipo_inmueble` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inmueble_perfil`
--

CREATE TABLE `tipo_inmueble_perfil` (
  `id_tipo_inmueble` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Define tipos de inmueble que pueden ser creados por perfiles';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tipo_usuario` varchar(25) NOT NULL COMMENT 'Estos pueden ser,''customer'',''admin''',
  `UID_firebase` varchar(50) DEFAULT NULL COMMENT 'Unique ID que da firebase'
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
-- Estructura Stand-in para la vista `vista_inmuebles_filtros`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_inmuebles_filtros` (
`id_inmueble` int(11)
,`estado_inmueble` varchar(25)
,`modalidad` varchar(15)
,`titulo_inmueble` varchar(100)
,`tipo_inmueble` varchar(25)
,`nombre_customer` varchar(50)
,`nombre_ciudad` varchar(20)
,`precio_minimo` decimal(12,2)
,`precio_maximo` decimal(12,2)
,`area_minima` int(11)
,`habitaciones_minimas` int(11)
,`baños_minimos` int(11)
,`foto` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_inmuebles_publicados`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_inmuebles_publicados` (
`id_inmueble` int(11)
,`estado_inmueble` varchar(25)
,`modalidad` varchar(15)
,`titulo_inmueble` varchar(100)
,`fecha_publicacion` datetime
,`id_customer` int(11)
,`cod_ciudad` int(11)
,`id_tipo_inmueble` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

CREATE TABLE `zonas` (
  `id_zona` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `icono` varchar(25) DEFAULT NULL,
  `tipo_zona` varchar(25) NOT NULL COMMENT '"Zona de interés" o "zona común"'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Zonas de interes o comunes para los inmuebles ';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas_inmuebles`
--

CREATE TABLE `zonas_inmuebles` (
  `id_inmueble` int(11) NOT NULL,
  `id_zona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Intermedia entre los inmuebles y las zonas';

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_inmuebles_filtros`
--
DROP TABLE IF EXISTS `vista_inmuebles_filtros`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_inmuebles_filtros`  AS SELECT `inmu`.`id_inmueble` AS `id_inmueble`, `inmu`.`estado_inmueble` AS `estado_inmueble`, `inmu`.`modalidad` AS `modalidad`, `inmu`.`titulo_inmueble` AS `titulo_inmueble`, `tipo`.`tipo_inmueble` AS `tipo_inmueble`, `custo`.`nombre_customer` AS `nombre_customer`, `ciudad`.`nombre_ciudad` AS `nombre_ciudad`, (select min(`det`.`valor_inmueble`) from `detalles_inmuebles` `det` where `det`.`id_inmueble` = `inmu`.`id_inmueble`) AS `precio_minimo`, (select max(`det`.`valor_inmueble`) from `detalles_inmuebles` `det` where `det`.`id_inmueble` = `inmu`.`id_inmueble`) AS `precio_maximo`, (select min(`det`.`area`) from `detalles_inmuebles` `det` where `det`.`id_inmueble` = `inmu`.`id_inmueble`) AS `area_minima`, (select min(`det`.`cantidad_habitaciones`) from `detalles_inmuebles` `det` where `det`.`id_inmueble` = `inmu`.`id_inmueble`) AS `habitaciones_minimas`, (select min(`det`.`cantidad_baños`) from `detalles_inmuebles` `det` where `det`.`id_inmueble` = `inmu`.`id_inmueble`) AS `baños_minimos`, (select `foto`.`id_foto` from (`fotos` `foto` join `detalles_inmuebles` `det` on(`foto`.`id_detalle_inmueble` = `det`.`id_detalle`)) where `det`.`id_inmueble` = `inmu`.`id_inmueble` order by `foto`.`id_foto` limit 1) AS `foto` FROM (((`inmuebles` `inmu` join `customers` `custo`) join `ciudades` `ciudad`) join `tipos_inmueble` `tipo`) WHERE `custo`.`id_customer` = `inmu`.`id_customer` AND `ciudad`.`cod_ciudad` = `inmu`.`cod_ciudad` AND `inmu`.`id_tipo_inmueble` = `tipo`.`id_tipo_inmueble` AND `inmu`.`estado_publicacion` = 'publicado' ORDER BY `inmu`.`fecha_publicacion` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_inmuebles_publicados`
--
DROP TABLE IF EXISTS `vista_inmuebles_publicados`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_inmuebles_publicados`  AS SELECT `inmuebles`.`id_inmueble` AS `id_inmueble`, `inmuebles`.`estado_inmueble` AS `estado_inmueble`, `inmuebles`.`modalidad` AS `modalidad`, `inmuebles`.`titulo_inmueble` AS `titulo_inmueble`, `inmuebles`.`fecha_publicacion` AS `fecha_publicacion`, `inmuebles`.`id_customer` AS `id_customer`, `inmuebles`.`cod_ciudad` AS `cod_ciudad`, `inmuebles`.`id_tipo_inmueble` AS `id_tipo_inmueble` FROM `inmuebles` WHERE `inmuebles`.`estado_publicacion` = 'publicado' ORDER BY `inmuebles`.`fecha_publicacion` ASC ;

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
  ADD PRIMARY KEY (`id_caracteristica`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `caracteristicas_planes`
--
ALTER TABLE `caracteristicas_planes`
  ADD PRIMARY KEY (`id_plan`,`id_caracteristica`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_caracteristica` (`id_caracteristica`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `categorias_blogs`
--
ALTER TABLE `categorias_blogs`
  ADD PRIMARY KEY (`id_categoria`,`id_blog`),
  ADD KEY `id_blog` (`id_blog`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`cod_ciudad`),
  ADD KEY `id_municipio` (`id_departamento`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id_customer`),
  ADD UNIQUE KEY `codigo_inmobiliaria` (`codigo_customer`),
  ADD KEY `id_inmobiliaria` (`id_customer`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_perfil` (`id_perfil`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id_departamento`);

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
  ADD KEY `id_inmueble` (`id_inmueble`);

--
-- Indices de la tabla `inmuebles_en_ascenso`
--
ALTER TABLE `inmuebles_en_ascenso`
  ADD PRIMARY KEY (`id_ascenso`),
  ADD KEY `id_inmueble` (`id_inmueble`);

--
-- Indices de la tabla `interesados`
--
ALTER TABLE `interesados`
  ADD PRIMARY KEY (`id_interesado`),
  ADD KEY `id_inmueble` (`id_inmueble`);

--
-- Indices de la tabla `perfiles_customer`
--
ALTER TABLE `perfiles_customer`
  ADD PRIMARY KEY (`id_perfil`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id_plan`),
  ADD KEY `id_perfil_customer` (`id_perfil`);

--
-- Indices de la tabla `precios_planes`
--
ALTER TABLE `precios_planes`
  ADD PRIMARY KEY (`id_precio_plan`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `id_inmueble` (`id_inmueble`);

--
-- Indices de la tabla `saldos_caracteristicas`
--
ALTER TABLE `saldos_caracteristicas`
  ADD PRIMARY KEY (`id_suscripcion`,`id_caracteristica`),
  ADD KEY `id_suscripción` (`id_suscripcion`),
  ADD KEY `id_caracteristica` (`id_caracteristica`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id_suscripcion`),
  ADD KEY `id_customer` (`id_customer`),
  ADD KEY `id_precio_plan` (`id_precio_plan`);

--
-- Indices de la tabla `tipos_inmueble`
--
ALTER TABLE `tipos_inmueble`
  ADD PRIMARY KEY (`id_tipo_inmueble`);

--
-- Indices de la tabla `tipo_inmueble_perfil`
--
ALTER TABLE `tipo_inmueble_perfil`
  ADD PRIMARY KEY (`id_tipo_inmueble`,`id_perfil`),
  ADD KEY `id_tipo_inmueble` (`id_tipo_inmueble`),
  ADD KEY `id_perfil` (`id_perfil`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UID_firebase` (`UID_firebase`);

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
  ADD PRIMARY KEY (`id_zona`);

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
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
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
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `perfiles_customer`
--
ALTER TABLE `perfiles_customer`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `precios_planes`
--
ALTER TABLE `precios_planes`
  MODIFY `id_precio_plan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id_suscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_inmueble`
--
ALTER TABLE `tipos_inmueble`
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
-- Filtros para la tabla `categorias_blogs`
--
ALTER TABLE `categorias_blogs`
  ADD CONSTRAINT `categorias_blogs_ibfk_1` FOREIGN KEY (`id_blog`) REFERENCES `blogs` (`id_blog`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categorias_blogs_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles_customer` (`id_perfil`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalles_inmuebles`
--
ALTER TABLE `detalles_inmuebles`
  ADD CONSTRAINT `detalles_inmuebles_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`),
  ADD CONSTRAINT `detalles_inmuebles_ibfk_3` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `inmuebles_ibfk_3` FOREIGN KEY (`id_tipo_inmueble`) REFERENCES `tipos_inmueble` (`id_tipo_inmueble`);

--
-- Filtros para la tabla `inmuebles_destacados`
--
ALTER TABLE `inmuebles_destacados`
  ADD CONSTRAINT `inmuebles_destacados_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `inmuebles_en_ascenso`
--
ALTER TABLE `inmuebles_en_ascenso`
  ADD CONSTRAINT `inmuebles_en_ascenso_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `interesados`
--
ALTER TABLE `interesados`
  ADD CONSTRAINT `interesados_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles_customer` (`id_perfil`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `precios_planes`
--
ALTER TABLE `precios_planes`
  ADD CONSTRAINT `precios_planes_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `saldos_caracteristicas`
--
ALTER TABLE `saldos_caracteristicas`
  ADD CONSTRAINT `saldos_caracteristicas_ibfk_1` FOREIGN KEY (`id_caracteristica`) REFERENCES `caracteristicas` (`id_caracteristica`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `saldos_caracteristicas_ibfk_2` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripciones` (`id_suscripcion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD CONSTRAINT `suscripciones_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id_customer`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `suscripciones_ibfk_2` FOREIGN KEY (`id_precio_plan`) REFERENCES `precios_planes` (`id_precio_plan`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tipo_inmueble_perfil`
--
ALTER TABLE `tipo_inmueble_perfil`
  ADD CONSTRAINT `tipo_inmueble_perfil_ibfk_1` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles_customer` (`id_perfil`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tipo_inmueble_perfil_ibfk_2` FOREIGN KEY (`id_tipo_inmueble`) REFERENCES `tipos_inmueble` (`id_tipo_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`id_detalle_inmueble`) REFERENCES `detalles_inmuebles` (`id_detalle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`id_blog`) REFERENCES `blogs` (`id_blog`) ON DELETE CASCADE ON UPDATE CASCADE;

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
