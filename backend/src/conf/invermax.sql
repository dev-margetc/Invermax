-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2024 a las 22:52:39
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
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `cod_ciudad` int(11) NOT NULL,
  `nombre_ciudad` varchar(20) NOT NULL,
  `id_departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`cod_ciudad`, `nombre_ciudad`, `id_departamento`) VALUES
(1, 'Leticia', 1),
(2, 'El Encanto', 1),
(3, 'La Chorrera', 1),
(4, 'La Pedrera', 1),
(5, 'La Victoria', 1),
(6, 'Puerto Arica', 1),
(7, 'Puerto Nariño', 1),
(8, 'Puerto Santander', 1),
(9, 'Tarapacá', 1),
(10, 'Puerto Alegría', 1),
(11, 'Miriti Paraná', 1),
(12, 'Medellín', 2),
(13, 'Abejorral', 2),
(14, 'Abriaquí', 2),
(15, 'Alejandría', 2),
(16, 'Amagá', 2),
(17, 'Amalfi', 2),
(18, 'Andes', 2),
(19, 'Angelópolis', 2),
(20, 'Angostura', 2),
(21, 'Anorí', 2),
(22, 'Anza', 2),
(23, 'Apartadó', 2),
(24, 'Arboletes', 2),
(25, 'Argelia', 2),
(26, 'Armenia', 2),
(27, 'Barbosa', 2),
(28, 'Bello', 2),
(29, 'Betania', 2),
(30, 'Betulia', 2),
(31, 'Ciudad Bolívar', 2),
(32, 'Briceño', 2),
(33, 'Buriticá', 2),
(34, 'Cáceres', 2),
(35, 'Caicedo', 2),
(36, 'Caldas', 2),
(37, 'Campamento', 2),
(38, 'Cañasgordas', 2),
(39, 'Caracolí', 2),
(40, 'Caramanta', 2),
(41, 'Carepa', 2),
(42, 'Carolina', 2),
(43, 'Caucasia', 2),
(44, 'Chigorodó', 2),
(45, 'Cisneros', 2),
(46, 'Cocorná', 2),
(47, 'Concepción', 2),
(48, 'Concordia', 2),
(49, 'Copacabana', 2),
(50, 'Dabeiba', 2),
(51, 'Don Matías', 2),
(52, 'Ebéjico', 2),
(53, 'El Bagre', 2),
(54, 'Entrerrios', 2),
(55, 'Envigado', 2),
(56, 'Fredonia', 2),
(57, 'Giraldo', 2),
(58, 'Girardota', 2),
(59, 'Gómez Plata', 2),
(60, 'Guadalupe', 2),
(61, 'Guarne', 2),
(62, 'Guatapé', 2),
(63, 'Heliconia', 2),
(64, 'Hispania', 2),
(65, 'Itagui', 2),
(66, 'Ituango', 2),
(67, 'Belmira', 2),
(68, 'Jericó', 2),
(69, 'La Ceja', 2),
(70, 'La Estrella', 2),
(71, 'La Pintada', 2),
(72, 'La Unión', 2),
(73, 'Liborina', 2),
(74, 'Maceo', 2),
(75, 'Marinilla', 2),
(76, 'Montebello', 2),
(77, 'Murindó', 2),
(78, 'Mutatá', 2),
(79, 'Nariño', 2),
(80, 'Necoclí', 2),
(81, 'Nechí', 2),
(82, 'Olaya', 2),
(83, 'Peñol', 2),
(84, 'Peque', 2),
(85, 'Pueblorrico', 2),
(86, 'Puerto Berrío', 2),
(87, 'Puerto Nare', 2),
(88, 'Puerto Triunfo', 2),
(89, 'Remedios', 2),
(90, 'Retiro', 2),
(91, 'Rionegro', 2),
(92, 'Sabanalarga', 2),
(93, 'Sabaneta', 2),
(94, 'Salgar', 2),
(95, 'San Francisco', 2),
(96, 'San Jerónimo', 2),
(97, 'San Luis', 2),
(98, 'San Pedro', 2),
(99, 'San Rafael', 2),
(100, 'San Roque', 2),
(101, 'San Vicente', 2),
(102, 'Santa Bárbara', 2),
(103, 'Santo Domingo', 2),
(104, 'El Santuario', 2),
(105, 'Segovia', 2),
(106, 'Sopetrán', 2),
(107, 'Támesis', 2),
(108, 'Tarazá', 2),
(109, 'Tarso', 2),
(110, 'Titiribí', 2),
(111, 'Toledo', 2),
(112, 'Turbo', 2),
(113, 'Uramita', 2),
(114, 'Urrao', 2),
(115, 'Valdivia', 2),
(116, 'Valparaíso', 2),
(117, 'Vegachí', 2),
(118, 'Venecia', 2),
(119, 'Yalí', 2),
(120, 'Yarumal', 2),
(121, 'Yolombó', 2),
(122, 'Yondó', 2),
(123, 'Zaragoza', 2),
(124, 'San Pedro de Uraba', 2),
(125, 'Santafé de Antioquia', 2),
(126, 'Santa Rosa de Osos', 2),
(127, 'San Andrés de Cuerqu', 2),
(128, 'Vigía del Fuerte', 2),
(129, 'San José de La Monta', 2),
(130, 'San Juan de Urabá', 2),
(131, 'El Carmen de Viboral', 2),
(132, 'San Carlos', 2),
(133, 'Frontino', 2),
(134, 'Granada', 2),
(135, 'Jardín', 2),
(136, 'Sonsón', 2),
(137, 'Arauquita', 3),
(138, 'Cravo Norte', 3),
(139, 'Fortul', 3),
(140, 'Puerto Rondón', 3),
(141, 'Saravena', 3),
(142, 'Tame', 3),
(143, 'Arauca', 3),
(144, 'Barranquilla', 4),
(145, 'Baranoa', 4),
(146, 'Candelaria', 4),
(147, 'Galapa', 4),
(148, 'Luruaco', 4),
(149, 'Malambo', 4),
(150, 'Manatí', 4),
(151, 'Piojó', 4),
(152, 'Polonuevo', 4),
(153, 'Sabanagrande', 4),
(154, 'Sabanalarga', 4),
(155, 'Santa Lucía', 4),
(156, 'Santo Tomás', 4),
(157, 'Soledad', 4),
(158, 'Suan', 4),
(159, 'Tubará', 4),
(160, 'Usiacurí', 4),
(161, 'Juan de Acosta', 4),
(162, 'Palmar de Varela', 4),
(163, 'Campo de La Cruz', 4),
(164, 'Repelón', 4),
(165, 'Puerto Colombia', 4),
(166, 'Ponedera', 4),
(167, 'Bogotá D.C.', 5),
(168, 'Achí', 6),
(169, 'Arenal', 6),
(170, 'Arjona', 6),
(171, 'Arroyohondo', 6),
(172, 'Calamar', 6),
(173, 'Cantagallo', 6),
(174, 'Cicuco', 6),
(175, 'Córdoba', 6),
(176, 'Clemencia', 6),
(177, 'El Guamo', 6),
(178, 'Magangué', 6),
(179, 'Mahates', 6),
(180, 'Margarita', 6),
(181, 'Montecristo', 6),
(182, 'Mompós', 6),
(183, 'Morales', 6),
(184, 'Norosí', 6),
(185, 'Pinillos', 6),
(186, 'Regidor', 6),
(187, 'Río Viejo', 6),
(188, 'San Estanislao', 6),
(189, 'San Fernando', 6),
(190, 'San Juan Nepomuceno', 6),
(191, 'Santa Catalina', 6),
(192, 'Santa Rosa', 6),
(193, 'Simití', 6),
(194, 'Soplaviento', 6),
(195, 'Talaigua Nuevo', 6),
(196, 'Tiquisio', 6),
(197, 'Turbaco', 6),
(198, 'Turbaná', 6),
(199, 'Villanueva', 6),
(200, 'Barranco de Loba', 6),
(201, 'Santa Rosa del Sur', 6),
(202, 'Hatillo de Loba', 6),
(203, 'El Carmen de Bolívar', 6),
(204, 'San Martín de Loba', 6),
(205, 'Altos del Rosario', 6),
(206, 'San Jacinto del Cauc', 6),
(207, 'San Pablo de Borbur', 6),
(208, 'San Jacinto', 6),
(209, 'El Peñón', 6),
(210, 'Cartagena', 6),
(211, 'María la Baja', 6),
(212, 'San Cristóbal', 6),
(213, 'Zambrano', 6),
(214, 'Tununguá', 7),
(215, 'Motavita', 7),
(216, 'Ciénega', 7),
(217, 'Tunja', 7),
(218, 'Almeida', 7),
(219, 'Aquitania', 7),
(220, 'Arcabuco', 7),
(221, 'Berbeo', 7),
(222, 'Betéitiva', 7),
(223, 'Boavita', 7),
(224, 'Boyacá', 7),
(225, 'Briceño', 7),
(226, 'Buena Vista', 7),
(227, 'Busbanzá', 7),
(228, 'Caldas', 7),
(229, 'Campohermoso', 7),
(230, 'Cerinza', 7),
(231, 'Chinavita', 7),
(232, 'Chiquinquirá', 7),
(233, 'Chiscas', 7),
(234, 'Chita', 7),
(235, 'Chitaraque', 7),
(236, 'Chivatá', 7),
(237, 'Cómbita', 7),
(238, 'Coper', 7),
(239, 'Corrales', 7),
(240, 'Covarachía', 7),
(241, 'Cubará', 7),
(242, 'Cucaita', 7),
(243, 'Cuítiva', 7),
(244, 'Chíquiza', 7),
(245, 'Chivor', 7),
(246, 'Duitama', 7),
(247, 'El Cocuy', 7),
(248, 'El Espino', 7),
(249, 'Firavitoba', 7),
(250, 'Floresta', 7),
(251, 'Gachantivá', 7),
(252, 'Gameza', 7),
(253, 'Garagoa', 7),
(254, 'Guacamayas', 7),
(255, 'Guateque', 7),
(256, 'Guayatá', 7),
(257, 'Güicán', 7),
(258, 'Iza', 7),
(259, 'Jenesano', 7),
(260, 'Jericó', 7),
(261, 'Labranzagrande', 7),
(262, 'La Capilla', 7),
(263, 'La Victoria', 7),
(264, 'Macanal', 7),
(265, 'Maripí', 7),
(266, 'Miraflores', 7),
(267, 'Mongua', 7),
(268, 'Monguí', 7),
(269, 'Moniquirá', 7),
(270, 'Muzo', 7),
(271, 'Nobsa', 7),
(272, 'Nuevo Colón', 7),
(273, 'Oicatá', 7),
(274, 'Otanche', 7),
(275, 'Pachavita', 7),
(276, 'Páez', 7),
(277, 'Paipa', 7),
(278, 'Pajarito', 7),
(279, 'Panqueba', 7),
(280, 'Pauna', 7),
(281, 'Paya', 7),
(282, 'Pesca', 7),
(283, 'Pisba', 7),
(284, 'Puerto Boyacá', 7),
(285, 'Quípama', 7),
(286, 'Ramiriquí', 7),
(287, 'Ráquira', 7),
(288, 'Rondón', 7),
(289, 'Saboyá', 7),
(290, 'Sáchica', 7),
(291, 'Samacá', 7),
(292, 'San Eduardo', 7),
(293, 'San Mateo', 7),
(294, 'Santana', 7),
(295, 'Santa María', 7),
(296, 'Santa Sofía', 7),
(297, 'Sativanorte', 7),
(298, 'Sativasur', 7),
(299, 'Siachoque', 7),
(300, 'Soatá', 7),
(301, 'Socotá', 7),
(302, 'Socha', 7),
(303, 'Sogamoso', 7),
(304, 'Somondoco', 7),
(305, 'Sora', 7),
(306, 'Sotaquirá', 7),
(307, 'Soracá', 7),
(308, 'Susacón', 7),
(309, 'Sutamarchán', 7),
(310, 'Sutatenza', 7),
(311, 'Tasco', 7),
(312, 'Tenza', 7),
(313, 'Tibaná', 7),
(314, 'Tinjacá', 7),
(315, 'Tipacoque', 7),
(316, 'Toca', 7),
(317, 'Tópaga', 7),
(318, 'Tota', 7),
(319, 'Turmequé', 7),
(320, 'Tutazá', 7),
(321, 'Umbita', 7),
(322, 'Ventaquemada', 7),
(323, 'Viracachá', 7),
(324, 'Zetaquira', 7),
(325, 'Togüí', 7),
(326, 'Villa de Leyva', 7),
(327, 'Paz de Río', 7),
(328, 'Santa Rosa de Viterb', 7),
(329, 'San Pablo de Borbur', 7),
(330, 'San Luis de Gaceno', 7),
(331, 'San José de Pare', 7),
(332, 'San Miguel de Sema', 7),
(333, 'Tuta', 7),
(334, 'Tibasosa', 7),
(335, 'La Uvita', 7),
(336, 'Belén', 7),
(337, 'Manizales', 8),
(338, 'Aguadas', 8),
(339, 'Anserma', 8),
(340, 'Aranzazu', 8),
(341, 'Belalcázar', 8),
(342, 'Chinchiná', 8),
(343, 'Filadelfia', 8),
(344, 'La Dorada', 8),
(345, 'La Merced', 8),
(346, 'Manzanares', 8),
(347, 'Marmato', 8),
(348, 'Marulanda', 8),
(349, 'Neira', 8),
(350, 'Norcasia', 8),
(351, 'Pácora', 8),
(352, 'Palestina', 8),
(353, 'Pensilvania', 8),
(354, 'Riosucio', 8),
(355, 'Risaralda', 8),
(356, 'Salamina', 8),
(357, 'Samaná', 8),
(358, 'San José', 8),
(359, 'Supía', 8),
(360, 'Victoria', 8),
(361, 'Villamaría', 8),
(362, 'Viterbo', 8),
(363, 'Marquetalia', 8),
(364, 'Florencia', 9),
(365, 'Albania', 9),
(366, 'Curillo', 9),
(367, 'El Doncello', 9),
(368, 'El Paujil', 9),
(369, 'Morelia', 9),
(370, 'Puerto Rico', 9),
(371, 'Solano', 9),
(372, 'Solita', 9),
(373, 'Valparaíso', 9),
(374, 'San José del Fragua', 9),
(375, 'Belén de Los Andaqui', 9),
(376, 'Cartagena del Chairá', 9),
(377, 'Milán', 9),
(378, 'La Montañita', 9),
(379, 'San Vicente del Cagu', 9),
(380, 'Yopal', 10),
(381, 'Aguazul', 10),
(382, 'Chámeza', 10),
(383, 'Hato Corozal', 10),
(384, 'La Salina', 10),
(385, 'Monterrey', 10),
(386, 'Pore', 10),
(387, 'Recetor', 10),
(388, 'Sabanalarga', 10),
(389, 'Sácama', 10),
(390, 'Tauramena', 10),
(391, 'Trinidad', 10),
(392, 'Villanueva', 10),
(393, 'San Luis de Gaceno', 10),
(394, 'Paz de Ariporo', 10),
(395, 'Nunchía', 10),
(396, 'Maní', 10),
(397, 'Támara', 10),
(398, 'Orocué', 10),
(399, 'Popayán', 11),
(400, 'Almaguer', 11),
(401, 'Argelia', 11),
(402, 'Balboa', 11),
(403, 'Bolívar', 11),
(404, 'Buenos Aires', 11),
(405, 'Cajibío', 11),
(406, 'Caldono', 11),
(407, 'Caloto', 11),
(408, 'Corinto', 11),
(409, 'El Tambo', 11),
(410, 'Florencia', 11),
(411, 'Guachené', 11),
(412, 'Guapi', 11),
(413, 'Inzá', 11),
(414, 'Jambaló', 11),
(415, 'La Sierra', 11),
(416, 'La Vega', 11),
(417, 'López', 11),
(418, 'Mercaderes', 11),
(419, 'Miranda', 11),
(420, 'Morales', 11),
(421, 'Padilla', 11),
(422, 'Patía', 11),
(423, 'Piamonte', 11),
(424, 'Piendamó', 11),
(425, 'Puerto Tejada', 11),
(426, 'Puracé', 11),
(427, 'Rosas', 11),
(428, 'Santa Rosa', 11),
(429, 'Silvia', 11),
(430, 'Sotara', 11),
(431, 'Suárez', 11),
(432, 'Sucre', 11),
(433, 'Timbío', 11),
(434, 'Timbiquí', 11),
(435, 'Toribio', 11),
(436, 'Totoró', 11),
(437, 'Villa Rica', 11),
(438, 'Santander de Quilich', 11),
(439, 'San Sebastián', 11),
(440, 'Páez', 11),
(441, 'Valledupar', 12),
(442, 'Aguachica', 12),
(443, 'Agustín Codazzi', 12),
(444, 'Astrea', 12),
(445, 'Becerril', 12),
(446, 'Bosconia', 12),
(447, 'Chimichagua', 12),
(448, 'Chiriguaná', 12),
(449, 'Curumaní', 12),
(450, 'El Copey', 12),
(451, 'El Paso', 12),
(452, 'Gamarra', 12),
(453, 'González', 12),
(454, 'La Gloria', 12),
(455, 'Manaure', 12),
(456, 'Pailitas', 12),
(457, 'Pelaya', 12),
(458, 'Pueblo Bello', 12),
(459, 'La Paz', 12),
(460, 'San Alberto', 12),
(461, 'San Diego', 12),
(462, 'San Martín', 12),
(463, 'Tamalameque', 12),
(464, 'Río de Oro', 12),
(465, 'La Jagua de Ibirico', 12),
(466, 'Istmina', 13),
(467, 'Quibdó', 13),
(468, 'Acandí', 13),
(469, 'Alto Baudo', 13),
(470, 'Atrato', 13),
(471, 'Bagadó', 13),
(472, 'Bahía Solano', 13),
(473, 'Bajo Baudó', 13),
(474, 'Bojaya', 13),
(475, 'Cértegui', 13),
(476, 'Condoto', 13),
(477, 'Juradó', 13),
(478, 'Lloró', 13),
(479, 'Medio Atrato', 13),
(480, 'Medio Baudó', 13),
(481, 'Medio San Juan', 13),
(482, 'Nóvita', 13),
(483, 'Nuquí', 13),
(484, 'Río Iro', 13),
(485, 'Río Quito', 13),
(486, 'Riosucio', 13),
(487, 'Sipí', 13),
(488, 'Unguía', 13),
(489, 'El Litoral del San J', 13),
(490, 'El Cantón del San Pa', 13),
(491, 'El Carmen de Atrato', 13),
(492, 'San José del Palmar', 13),
(493, 'Belén de Bajira', 13),
(494, 'Carmen del Darien', 13),
(495, 'Tadó', 13),
(496, 'Unión Panamericana', 13),
(497, 'San Bernardo del Vie', 14),
(498, 'Montería', 14),
(499, 'Ayapel', 14),
(500, 'Buenavista', 14),
(501, 'Canalete', 14),
(502, 'Cereté', 14),
(503, 'Chimá', 14),
(504, 'Chinú', 14),
(505, 'Cotorra', 14),
(506, 'Lorica', 14),
(507, 'Los Córdobas', 14),
(508, 'Momil', 14),
(509, 'Moñitos', 14),
(510, 'Planeta Rica', 14),
(511, 'Pueblo Nuevo', 14),
(512, 'Puerto Escondido', 14),
(513, 'Purísima', 14),
(514, 'Sahagún', 14),
(515, 'San Andrés Sotavento', 14),
(516, 'San Antero', 14),
(517, 'San Pelayo', 14),
(518, 'Tierralta', 14),
(519, 'Tuchín', 14),
(520, 'Valencia', 14),
(521, 'San José de Uré', 14),
(522, 'Ciénaga de Oro', 14),
(523, 'San Carlos', 14),
(524, 'Montelíbano', 14),
(525, 'La Apartada', 14),
(526, 'Puerto Libertador', 14),
(527, 'Anapoima', 15),
(528, 'Arbeláez', 15),
(529, 'Beltrán', 15),
(530, 'Bituima', 15),
(531, 'Bojacá', 15),
(532, 'Cabrera', 15),
(533, 'Cachipay', 15),
(534, 'Cajicá', 15),
(535, 'Caparrapí', 15),
(536, 'Caqueza', 15),
(537, 'Chaguaní', 15),
(538, 'Chipaque', 15),
(539, 'Choachí', 15),
(540, 'Chocontá', 15),
(541, 'Cogua', 15),
(542, 'Cota', 15),
(543, 'Cucunubá', 15),
(544, 'El Colegio', 15),
(545, 'El Rosal', 15),
(546, 'Fomeque', 15),
(547, 'Fosca', 15),
(548, 'Funza', 15),
(549, 'Fúquene', 15),
(550, 'Gachala', 15),
(551, 'Gachancipá', 15),
(552, 'Gachetá', 15),
(553, 'Girardot', 15),
(554, 'Granada', 15),
(555, 'Guachetá', 15),
(556, 'Guaduas', 15),
(557, 'Guasca', 15),
(558, 'Guataquí', 15),
(559, 'Guatavita', 15),
(560, 'Guayabetal', 15),
(561, 'Gutiérrez', 15),
(562, 'Jerusalén', 15),
(563, 'Junín', 15),
(564, 'La Calera', 15),
(565, 'La Mesa', 15),
(566, 'La Palma', 15),
(567, 'La Peña', 15),
(568, 'La Vega', 15),
(569, 'Lenguazaque', 15),
(570, 'Macheta', 15),
(571, 'Madrid', 15),
(572, 'Manta', 15),
(573, 'Medina', 15),
(574, 'Mosquera', 15),
(575, 'Nariño', 15),
(576, 'Nemocón', 15),
(577, 'Nilo', 15),
(578, 'Nimaima', 15),
(579, 'Nocaima', 15),
(580, 'Venecia', 15),
(581, 'Pacho', 15),
(582, 'Paime', 15),
(583, 'Pandi', 15),
(584, 'Paratebueno', 15),
(585, 'Pasca', 15),
(586, 'Puerto Salgar', 15),
(587, 'Pulí', 15),
(588, 'Quebradanegra', 15),
(589, 'Quetame', 15),
(590, 'Quipile', 15),
(591, 'Apulo', 15),
(592, 'Ricaurte', 15),
(593, 'San Bernardo', 15),
(594, 'San Cayetano', 15),
(595, 'San Francisco', 15),
(596, 'Sesquilé', 15),
(597, 'Sibaté', 15),
(598, 'Silvania', 15),
(599, 'Simijaca', 15),
(600, 'Soacha', 15),
(601, 'Subachoque', 15),
(602, 'Suesca', 15),
(603, 'Supatá', 15),
(604, 'Susa', 15),
(605, 'Sutatausa', 15),
(606, 'Tabio', 15),
(607, 'Tausa', 15),
(608, 'Tena', 15),
(609, 'Tenjo', 15),
(610, 'Tibacuy', 15),
(611, 'Tibirita', 15),
(612, 'Tocaima', 15),
(613, 'Tocancipá', 15),
(614, 'Topaipí', 15),
(615, 'Ubalá', 15),
(616, 'Ubaque', 15),
(617, 'Une', 15),
(618, 'Útica', 15),
(619, 'Vianí', 15),
(620, 'Villagómez', 15),
(621, 'Villapinzón', 15),
(622, 'Villeta', 15),
(623, 'Viotá', 15),
(624, 'Zipacón', 15),
(625, 'San Juan de Río Seco', 15),
(626, 'Villa de San Diego d', 15),
(627, 'Guayabal de Siquima', 15),
(628, 'San Antonio del Tequ', 15),
(629, 'Agua de Dios', 15),
(630, 'Carmen de Carupa', 15),
(631, 'Vergara', 15),
(632, 'Albán', 15),
(633, 'Anolaima', 15),
(634, 'Chía', 15),
(635, 'El Peñón', 15),
(636, 'Sopó', 15),
(637, 'Gama', 15),
(638, 'Sasaima', 15),
(639, 'Yacopí', 15),
(640, 'Fusagasugá', 15),
(641, 'Zipaquirá', 15),
(642, 'Facatativá', 15),
(644, 'Inírida', 16),
(645, 'Barranco Minas', 16),
(646, 'Mapiripana', 16),
(647, 'San Felipe', 16),
(648, 'Puerto Colombia', 16),
(649, 'La Guadalupe', 16),
(650, 'Cacahual', 16),
(651, 'Pana Pana', 16),
(652, 'Morichal', 16),
(653, 'Calamar', 17),
(654, 'San José del Guaviar', 17),
(655, 'Miraflores', 17),
(656, 'El Retorno', 17),
(657, 'Neiva', 18),
(658, 'Acevedo', 18),
(659, 'Agrado', 18),
(660, 'Aipe', 18),
(661, 'Algeciras', 18),
(662, 'Altamira', 18),
(663, 'Baraya', 18),
(664, 'Campoalegre', 18),
(665, 'Colombia', 18),
(666, 'Elías', 18),
(667, 'Garzón', 18),
(668, 'Gigante', 18),
(669, 'Guadalupe', 18),
(670, 'Hobo', 18),
(671, 'Iquira', 18),
(672, 'Isnos', 18),
(673, 'La Argentina', 18),
(674, 'La Plata', 18),
(675, 'Nátaga', 18),
(676, 'Oporapa', 18),
(677, 'Paicol', 18),
(678, 'Palermo', 18),
(679, 'Palestina', 18),
(680, 'Pital', 18),
(681, 'Pitalito', 18),
(682, 'Rivera', 18),
(683, 'Saladoblanco', 18),
(684, 'Santa María', 18),
(685, 'Suaza', 18),
(686, 'Tarqui', 18),
(687, 'Tesalia', 18),
(688, 'Tello', 18),
(689, 'Teruel', 18),
(690, 'Timaná', 18),
(691, 'Villavieja', 18),
(692, 'Yaguará', 18),
(693, 'San Agustín', 18),
(694, 'Riohacha', 19),
(695, 'Albania', 19),
(696, 'Barrancas', 19),
(697, 'Dibula', 19),
(698, 'Distracción', 19),
(699, 'El Molino', 19),
(700, 'Fonseca', 19),
(701, 'Hatonuevo', 19),
(702, 'Maicao', 19),
(703, 'Manaure', 19),
(704, 'Uribia', 19),
(705, 'Urumita', 19),
(706, 'Villanueva', 19),
(707, 'La Jagua del Pilar', 19),
(708, 'San Juan del Cesar', 19),
(709, 'Santa Marta', 20),
(710, 'Algarrobo', 20),
(711, 'Aracataca', 20),
(712, 'Ariguaní', 20),
(713, 'Cerro San Antonio', 20),
(714, 'Chivolo', 20),
(715, 'Concordia', 20),
(716, 'El Banco', 20),
(717, 'El Piñon', 20),
(718, 'El Retén', 20),
(719, 'Fundación', 20),
(720, 'Guamal', 20),
(721, 'Nueva Granada', 20),
(722, 'Pedraza', 20),
(723, 'Pivijay', 20),
(724, 'Plato', 20),
(725, 'Remolino', 20),
(726, 'Salamina', 20),
(727, 'San Zenón', 20),
(728, 'Santa Ana', 20),
(729, 'Sitionuevo', 20),
(730, 'Tenerife', 20),
(731, 'Zapayán', 20),
(732, 'Zona Bananera', 20),
(733, 'San Sebastián de Bue', 20),
(734, 'Sabanas de San Angel', 20),
(735, 'Pijiño del Carmen', 20),
(736, 'Santa Bárbara de Pin', 20),
(737, 'Pueblo Viejo', 20),
(738, 'Ciénaga', 20),
(739, 'Uribe', 21),
(740, 'Villavicencio', 21),
(741, 'Acacias', 21),
(742, 'Cabuyaro', 21),
(743, 'Cubarral', 21),
(744, 'Cumaral', 21),
(745, 'El Calvario', 21),
(746, 'El Castillo', 21),
(747, 'El Dorado', 21),
(748, 'Granada', 21),
(749, 'Guamal', 21),
(750, 'Mapiripán', 21),
(751, 'Mesetas', 21),
(752, 'La Macarena', 21),
(753, 'Lejanías', 21),
(754, 'Puerto Concordia', 21),
(755, 'Puerto Gaitán', 21),
(756, 'Puerto López', 21),
(757, 'Puerto Lleras', 21),
(758, 'Puerto Rico', 21),
(759, 'Restrepo', 21),
(760, 'San Juanito', 21),
(761, 'San Martín', 21),
(762, 'Vista Hermosa', 21),
(763, 'Barranca de Upía', 21),
(764, 'Fuente de Oro', 21),
(765, 'San Carlos de Guaroa', 21),
(766, 'San Juan de Arama', 21),
(767, 'Castilla la Nueva', 21),
(768, 'Santacruz', 22),
(769, 'Pasto', 22),
(770, 'Albán', 22),
(771, 'Aldana', 22),
(772, 'Ancuyá', 22),
(773, 'Barbacoas', 22),
(774, 'Colón', 22),
(775, 'Consaca', 22),
(776, 'Contadero', 22),
(777, 'Córdoba', 22),
(778, 'Cuaspud', 22),
(779, 'Cumbal', 22),
(780, 'Cumbitara', 22),
(781, 'El Charco', 22),
(782, 'El Peñol', 22),
(783, 'El Rosario', 22),
(784, 'El Tambo', 22),
(785, 'Funes', 22),
(786, 'Guachucal', 22),
(787, 'Guaitarilla', 22),
(788, 'Gualmatán', 22),
(789, 'Iles', 22),
(790, 'Imués', 22),
(791, 'Ipiales', 22),
(792, 'La Cruz', 22),
(793, 'La Florida', 22),
(794, 'La Llanada', 22),
(795, 'La Tola', 22),
(796, 'La Unión', 22),
(797, 'Leiva', 22),
(798, 'Linares', 22),
(799, 'Los Andes', 22),
(800, 'Magüí', 22),
(801, 'Mallama', 22),
(802, 'Mosquera', 22),
(803, 'Nariño', 22),
(804, 'Olaya Herrera', 22),
(805, 'Ospina', 22),
(806, 'Francisco Pizarro', 22),
(807, 'Policarpa', 22),
(808, 'Potosí', 22),
(809, 'Providencia', 22),
(810, 'Puerres', 22),
(811, 'Pupiales', 22),
(812, 'Ricaurte', 22),
(813, 'Roberto Payán', 22),
(814, 'Samaniego', 22),
(815, 'Sandoná', 22),
(816, 'San Bernardo', 22),
(817, 'San Lorenzo', 22),
(818, 'San Pablo', 22),
(819, 'Santa Bárbara', 22),
(820, 'Sapuyes', 22),
(821, 'Taminango', 22),
(822, 'Tangua', 22),
(823, 'Túquerres', 22),
(824, 'Yacuanquer', 22),
(825, 'San Pedro de Cartago', 22),
(826, 'El Tablón de Gómez', 22),
(827, 'Buesaco', 22),
(828, 'San Andrés de Tumaco', 22),
(829, 'Belén', 22),
(830, 'Chachagüí', 22),
(831, 'Arboleda', 22),
(832, 'Silos', 23),
(833, 'Cácota', 23),
(834, 'Toledo', 23),
(835, 'Mutiscua', 23),
(836, 'El Zulia', 23),
(837, 'Salazar', 23),
(838, 'Cucutilla', 23),
(839, 'Puerto Santander', 23),
(840, 'Gramalote', 23),
(841, 'El Tarra', 23),
(842, 'Teorama', 23),
(843, 'Arboledas', 23),
(844, 'Lourdes', 23),
(845, 'Bochalema', 23),
(846, 'Convención', 23),
(847, 'Hacarí', 23),
(848, 'Herrán', 23),
(849, 'Tibú', 23),
(850, 'San Cayetano', 23),
(851, 'San Calixto', 23),
(852, 'La Playa', 23),
(853, 'Chinácota', 23),
(854, 'Ragonvalia', 23),
(855, 'La Esperanza', 23),
(856, 'Villa del Rosario', 23),
(857, 'Chitagá', 23),
(858, 'Sardinata', 23),
(859, 'Abrego', 23),
(860, 'Los Patios', 23),
(861, 'Ocaña', 23),
(862, 'Bucarasica', 23),
(863, 'Santiago', 23),
(864, 'Labateca', 23),
(865, 'Cachirá', 23),
(866, 'Villa Caro', 23),
(867, 'Durania', 23),
(868, 'Pamplona', 23),
(869, 'Pamplonita', 23),
(870, 'Cúcuta', 23),
(871, 'El Carmen', 23),
(872, 'Mocoa', 24),
(873, 'Colón', 24),
(874, 'Orito', 24),
(875, 'Puerto Caicedo', 24),
(876, 'Puerto Guzmán', 24),
(877, 'Leguízamo', 24),
(878, 'Sibundoy', 24),
(879, 'San Francisco', 24),
(880, 'San Miguel', 24),
(881, 'Santiago', 24),
(882, 'Valle de Guamez', 24),
(883, 'Puerto Asís', 24),
(884, 'Villagarzón', 24),
(885, 'Armenia', 25),
(886, 'Buenavista', 25),
(887, 'Circasia', 25),
(888, 'Córdoba', 25),
(889, 'Filandia', 25),
(890, 'La Tebaida', 25),
(891, 'Montenegro', 25),
(892, 'Pijao', 25),
(893, 'Quimbaya', 25),
(894, 'Salento', 25),
(895, 'Calarcá', 25),
(896, 'Génova', 25),
(897, 'Pereira', 26),
(898, 'Apía', 26),
(899, 'Balboa', 26),
(900, 'Dosquebradas', 26),
(901, 'Guática', 26),
(902, 'La Celia', 26),
(903, 'La Virginia', 26),
(904, 'Marsella', 26),
(905, 'Mistrató', 26),
(906, 'Pueblo Rico', 26),
(907, 'Quinchía', 26),
(908, 'Santuario', 26),
(909, 'Santa Rosa de Cabal', 26),
(910, 'Belén de Umbría', 26),
(911, 'Providencia', 27),
(912, 'San Andrés', 27),
(913, 'Puerto Wilches', 28),
(914, 'Puerto Parra', 28),
(915, 'Bucaramanga', 28),
(916, 'Aguada', 28),
(917, 'Albania', 28),
(918, 'Aratoca', 28),
(919, 'Barbosa', 28),
(920, 'Barichara', 28),
(921, 'Barrancabermeja', 28),
(922, 'Betulia', 28),
(923, 'Bolívar', 28),
(924, 'Cabrera', 28),
(925, 'California', 28),
(926, 'Carcasí', 28),
(927, 'Cepitá', 28),
(928, 'Cerrito', 28),
(929, 'Charalá', 28),
(930, 'Charta', 28),
(931, 'Chipatá', 28),
(932, 'Cimitarra', 28),
(933, 'Concepción', 28),
(934, 'Confines', 28),
(935, 'Contratación', 28),
(936, 'Coromoro', 28),
(937, 'Curití', 28),
(938, 'El Guacamayo', 28),
(939, 'El Playón', 28),
(940, 'Encino', 28),
(941, 'Enciso', 28),
(942, 'Florián', 28),
(943, 'Floridablanca', 28),
(944, 'Galán', 28),
(945, 'Gambita', 28),
(946, 'Girón', 28),
(947, 'Guaca', 28),
(948, 'Guadalupe', 28),
(949, 'Guapotá', 28),
(950, 'Guavatá', 28),
(951, 'Güepsa', 28),
(952, 'Jesús María', 28),
(953, 'Jordán', 28),
(954, 'La Belleza', 28),
(955, 'Landázuri', 28),
(956, 'La Paz', 28),
(957, 'Lebríja', 28),
(958, 'Los Santos', 28),
(959, 'Macaravita', 28),
(960, 'Málaga', 28),
(961, 'Matanza', 28),
(962, 'Mogotes', 28),
(963, 'Molagavita', 28),
(964, 'Ocamonte', 28),
(965, 'Oiba', 28),
(966, 'Onzaga', 28),
(967, 'Palmar', 28),
(968, 'Páramo', 28),
(969, 'Piedecuesta', 28),
(970, 'Pinchote', 28),
(971, 'Puente Nacional', 28),
(972, 'Rionegro', 28),
(973, 'San Andrés', 28),
(974, 'San Gil', 28),
(975, 'San Joaquín', 28),
(976, 'San Miguel', 28),
(977, 'Santa Bárbara', 28),
(978, 'Simacota', 28),
(979, 'Socorro', 28),
(980, 'Suaita', 28),
(981, 'Sucre', 28),
(982, 'Suratá', 28),
(983, 'Tona', 28),
(984, 'Vélez', 28),
(985, 'Vetas', 28),
(986, 'Villanueva', 28),
(987, 'Zapatoca', 28),
(988, 'Palmas del Socorro', 28),
(989, 'San Vicente de Chucu', 28),
(990, 'San José de Miranda', 28),
(991, 'Santa Helena del Opó', 28),
(992, 'Sabana de Torres', 28),
(993, 'El Carmen de Chucurí', 28),
(994, 'Valle de San José', 28),
(995, 'San Benito', 28),
(996, 'Hato', 28),
(997, 'Chimá', 28),
(998, 'Capitanejo', 28),
(999, 'El Peñón', 28),
(1000, 'Sincelejo', 29),
(1001, 'Buenavista', 29),
(1002, 'Caimito', 29),
(1003, 'Coloso', 29),
(1004, 'Coveñas', 29),
(1005, 'Chalán', 29),
(1006, 'El Roble', 29),
(1007, 'Galeras', 29),
(1008, 'Guaranda', 29),
(1009, 'La Unión', 29),
(1010, 'Los Palmitos', 29),
(1011, 'Majagual', 29),
(1012, 'Morroa', 29),
(1013, 'Ovejas', 29),
(1014, 'Palmito', 29),
(1015, 'San Benito Abad', 29),
(1016, 'San Marcos', 29),
(1017, 'San Onofre', 29),
(1018, 'San Pedro', 29),
(1019, 'Sucre', 29),
(1020, 'Tolú Viejo', 29),
(1021, 'San Luis de Sincé', 29),
(1022, 'San Juan de Betulia', 29),
(1023, 'Santiago de Tolú', 29),
(1024, 'Sampués', 29),
(1025, 'Corozal', 29),
(1026, 'Alpujarra', 30),
(1027, 'Alvarado', 30),
(1028, 'Ambalema', 30),
(1029, 'Armero', 30),
(1030, 'Ataco', 30),
(1031, 'Cajamarca', 30),
(1032, 'Chaparral', 30),
(1033, 'Coello', 30),
(1034, 'Coyaima', 30),
(1035, 'Cunday', 30),
(1036, 'Dolores', 30),
(1037, 'Espinal', 30),
(1038, 'Falan', 30),
(1039, 'Flandes', 30),
(1040, 'Fresno', 30),
(1041, 'Guamo', 30),
(1042, 'Herveo', 30),
(1043, 'Honda', 30),
(1044, 'Icononzo', 30),
(1045, 'Mariquita', 30),
(1046, 'Melgar', 30),
(1047, 'Murillo', 30),
(1048, 'Natagaima', 30),
(1049, 'Ortega', 30),
(1050, 'Palocabildo', 30),
(1051, 'Piedras', 30),
(1052, 'Planadas', 30),
(1053, 'Prado', 30),
(1054, 'Purificación', 30),
(1055, 'Rio Blanco', 30),
(1056, 'Roncesvalles', 30),
(1057, 'Rovira', 30),
(1058, 'Saldaña', 30),
(1059, 'Santa Isabel', 30),
(1060, 'Venadillo', 30),
(1061, 'Villahermosa', 30),
(1062, 'Villarrica', 30),
(1063, 'Valle de San Juan', 30),
(1064, 'Carmen de Apicala', 30),
(1065, 'San Luis', 30),
(1066, 'San Antonio', 30),
(1067, 'Casabianca', 30),
(1068, 'Anzoátegui', 30),
(1069, 'Ibagué', 30),
(1070, 'Líbano', 30),
(1071, 'Lérida', 30),
(1072, 'Suárez', 30),
(1073, 'El Dovio', 31),
(1074, 'Roldanillo', 31),
(1075, 'Argelia', 31),
(1076, 'Sevilla', 31),
(1077, 'Zarzal', 31),
(1078, 'El Cerrito', 31),
(1079, 'Cartago', 31),
(1080, 'Caicedonia', 31),
(1081, 'El Cairo', 31),
(1082, 'La Unión', 31),
(1083, 'Restrepo', 31),
(1084, 'Dagua', 31),
(1085, 'Guacarí', 31),
(1086, 'Ansermanuevo', 31),
(1087, 'Bugalagrande', 31),
(1088, 'La Victoria', 31),
(1089, 'Ginebra', 31),
(1090, 'Yumbo', 31),
(1091, 'Obando', 31),
(1092, 'Bolívar', 31),
(1093, 'Cali', 31),
(1094, 'San Pedro', 31),
(1095, 'Guadalajara de Buga', 31),
(1096, 'Calima', 31),
(1097, 'Andalucía', 31),
(1098, 'Pradera', 31),
(1099, 'Yotoco', 31),
(1100, 'Palmira', 31),
(1101, 'Riofrío', 31),
(1102, 'Alcalá', 31),
(1103, 'Versalles', 31),
(1104, 'El Águila', 31),
(1105, 'Toro', 31),
(1106, 'Candelaria', 31),
(1107, 'La Cumbre', 31),
(1108, 'Ulloa', 31),
(1109, 'Trujillo', 31),
(1110, 'Vijes', 31),
(1111, 'Tuluá', 31),
(1112, 'Florida', 31),
(1113, 'Jamundí', 31),
(1114, 'Buenaventura', 31),
(1115, 'Mitú', 32),
(1116, 'Carurú', 32),
(1117, 'Taraira', 32),
(1118, 'Papunahua', 32),
(1119, 'Yavaraté', 32),
(1120, 'Pacoa', 32),
(1121, 'Puerto Carreño', 33),
(1122, 'La Primavera', 33),
(1123, 'Santa Rosalía', 33),
(1124, 'Cumaribo', 33);

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
  `numero_comercial` varchar(25) DEFAULT NULL,
  `estado_customer` varchar(25) NOT NULL DEFAULT 'inactivo' COMMENT 'Estados posibles: "activo", "inactivo"',
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene a los usuarios tipo inmobiliaria';

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id_customer`, `nombre_customer`, `logo_customer`, `correo_notificaciones`, `telefono_notificaciones`, `telefono_fijo`, `codigo_customer`, `perfil`, `numero_comercial`, `estado_customer`, `id_usuario`) VALUES
(1, 'test', 'customer-1-1730955641328-99772360.png', 'test@notify', '12123123', '23234234', '400004', 'constructora', '34343434', 'activo', 1),
(2, '', NULL, '', '', NULL, NULL, '', NULL, 'activo', 2),
(3, 'nuevo customer', NULL, 'noti@hotmail.com', '4458458 ext 511', '56566554', NULL, 'inmobiliaria', NULL, 'inactivo', 18),
(4, 'Propietario pato', NULL, 'noti@hotmail.com', '4458458 ext 511', '56566554', NULL, 'propietario', '63421232', 'inactivo', 19),
(5, 'actualizado', NULL, 'noti@hotmail.com', '4458458 ext 511', '56566554', '4040040404', 'inmobiliaria', '63421232', '0', 18),
(8, 'inmobiliaria prueba', NULL, 'noti@hotmail.com', '4458458 ext 511', '56566554', NULL, 'inmobiliaria', '63421232', '0', 23),
(9, 'inmobiliaria ácp', NULL, 'notif@hotmail.com', '4458458 ext 511', '56566554', NULL, 'inmobiliaria', '6343221232', 'inactivo', 25),
(10, 'Propietario pato', NULL, 'noti@hotmail.com', '4458458 ext 511', '56566554', NULL, 'propietario', '63421232', 'inactivo', 26);

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

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id_departamento`, `nombre_departamento`) VALUES
(1, 'Amazonas'),
(2, 'Antioquia'),
(3, 'Arauca'),
(4, 'Atlántico'),
(5, 'Bogotá'),
(6, 'Bolívar'),
(7, 'Boyacá'),
(8, 'Caldas'),
(9, 'Caquetá'),
(10, 'Casanare'),
(11, 'Cauca'),
(12, 'Cesar'),
(13, 'Chocó'),
(14, 'Córdoba'),
(15, 'Cundinamarca'),
(16, 'Guainía'),
(17, 'Guaviare'),
(18, 'Huila'),
(19, 'La Guajira'),
(20, 'Magdalena'),
(21, 'Meta'),
(22, 'Nariño'),
(23, 'Norte de Santander'),
(24, 'Putumayo'),
(25, 'Quindío'),
(26, 'Risaralda'),
(27, 'San Andrés y Providencia'),
(28, 'Santander'),
(29, 'Sucre'),
(30, 'Tolima'),
(31, 'Valle del Cauca'),
(32, 'Vaupés'),
(33, 'Vichada');

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
  `parqueadero` varchar(25) NOT NULL COMMENT 'Posibles valores: ''Sí, carros'',''Sí, moto'',''No''',
  `amoblado` tinyint(1) NOT NULL COMMENT '0 indica que no es amoblado, 1 indica que sí',
  `id_inmueble` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL COMMENT 'Referencia al proyecto. si es null es porque no pertenece a un proyecto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene detalles de los inmuebles y separar proyectos';

--
-- Volcado de datos para la tabla `detalles_inmuebles`
--

INSERT INTO `detalles_inmuebles` (`id_detalle`, `valor_inmueble`, `area`, `iframe_recorrido`, `cantidad_habitaciones`, `cantidad_baños`, `parqueadero`, `amoblado`, `id_inmueble`, `id_proyecto`) VALUES
(2, 300000.00, 150, 'hhttpads', 4, 2, 'no', 0, 61, NULL),
(7, 300000.00, 150, 'hhttpads', 4, 2, 'si, motos', 0, 66, NULL),
(8, 200000.00, 155, 'hadasdads', 5, 1, 'no', 0, 66, NULL),
(12, 200000.00, 155, 'hadasdads', 5, 1, 'no', 0, 69, NULL),
(13, 300000.00, 150, 'hhttpads', 4, 2, 'si, motos', 0, 71, NULL),
(15, 300000.00, 150, 'hhttpads', 4, 2, 'si, motos', 0, 72, NULL),
(18, 200000.00, 155, 'hadasdads', 5, 1, 'no', 0, 75, 1),
(19, 6550000.00, 50, 'hhttpads', 5, 3, 'no', 0, 80, NULL),
(20, 6550000.00, 50, 'hhttpads', 7, 5, 'no', 1, 81, NULL),
(21, 300000.00, 150, 'hhttpads', 4, 2, 'si, motos', 1, 84, 3),
(22, 20000.00, 155, 'hadasdads', 5, 1, 'no', 0, 84, 3),
(23, 6550000.00, 50, 'hhttpads', 7, 5, 'no', 1, 86, NULL),
(26, 3050000.00, 30, 'fram-editado2', 7, 5, 'no', 1, 88, NULL),
(27, 2030000.00, 200, 'hadasdads', 5, 1, 'si, motos', 1, 88, NULL),
(28, 2030000.00, 200, 'hadasdads', 5, 1, 'si, motos', 1, 88, NULL),
(32, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 89, 5),
(33, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 91, 6),
(35, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 91, 6),
(36, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 91, 6),
(37, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 106, NULL),
(38, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 141, 7),
(39, 20030000.00, 155, 'hadasdads', 3, 1, 'no', 1, 141, 7),
(40, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 141, 7),
(41, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 141, 7),
(42, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 144, NULL),
(43, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 146, 8),
(44, 20030000.00, 155, 'hadasdads', 3, 1, 'no', 1, 146, 8),
(45, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 146, 8),
(46, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 146, 8),
(48, 20030000.00, 155, 'hadasdads', 3, 1, 'no', 1, 148, 9),
(49, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 148, 9),
(50, 1500000.00, 150, 'hhttpads', 5, 2, 'si, motos', 0, 148, 9),
(52, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 152, NULL),
(53, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 154, NULL),
(57, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 160, NULL),
(58, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 162, NULL),
(59, 3050000.00, 50, 'hhttpads', 7, 5, 'no', 1, 164, NULL);

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

--
-- Volcado de datos para la tabla `fotos`
--

INSERT INTO `fotos` (`id_foto`, `url_foto`, `id_detalle_inmueble`, `id_blog`) VALUES
(11, 'C:\\Users\\ADMIN\\Videos\\Invermax-temp\\uploads\\inmuebles\\videos\\8-1729906903562-451773453.mp4', 8, NULL),
(16, 'C:\\Users\\ADMIN\\Videos\\Invermax-temp\\uploads\\inmuebles\\fotos\\12-1730156144496-285083416.png', 12, NULL),
(17, 'C:\\Users\\ADMIN\\Videos\\Invermax-temp\\uploads\\inmuebles\\fotos\\13-1730156164178-893880629.png', 13, NULL),
(18, 'C:\\Users\\ADMIN\\Videos\\Invermax-temp\\uploads\\inmuebles\\fotos\\undefined-1730240695591-420851340.png', 23, NULL),
(20, 'C:\\Users\\ADMIN\\Videos\\Invermax-temp\\uploads\\inmuebles\\fotos\\[object Object]-1730260008480-364328343.png', 21, NULL),
(27, '32-1730395800246-104973427.png', 32, NULL),
(28, '32-1730395801663-979429027.png', 32, NULL),
(29, '32-1730396012211-670185053.png', 32, NULL),
(30, '32-1730396013069-595700666.png', 32, NULL),
(32, '32-1730396015568-455164404.png', 32, NULL),
(33, '32-1730396016070-249155927.png', 32, NULL);

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
  `estrato` tinyint(1) UNSIGNED NOT NULL,
  `administracion_incluida` tinyint(1) DEFAULT NULL COMMENT 'Valor de 0\r\nindica que no está incluida',
  `tipo_vivienda` varchar(25) NOT NULL COMMENT 'Puede ser VIS o NO VIS',
  `iframe_maps` varchar(255) NOT NULL,
  `estado_publicacion` varchar(25) NOT NULL COMMENT 'Puede estar en ''borrador'' o ''publicado''',
  `fecha_publicacion` datetime DEFAULT NULL COMMENT 'Fecha de publicacion, es null cuando no está publicado el inmueble',
  `id_customer` int(11) NOT NULL,
  `cod_ciudad` int(11) NOT NULL,
  `id_tipo_inmueble` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inmuebles`
--

INSERT INTO `inmuebles` (`id_inmueble`, `codigo_inmueble`, `descripcion`, `estado_inmueble`, `modalidad`, `titulo_inmueble`, `estrato`, `administracion_incluida`, `tipo_vivienda`, `iframe_maps`, `estado_publicacion`, `fecha_publicacion`, `id_customer`, `cod_ciudad`, `id_tipo_inmueble`) VALUES
(31, '2045243', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(33, '2045245', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(35, '20452455', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(37, '2045211155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(39, '2045213155', 'U', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(40, '2035213155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(41, '203523155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 43, 2),
(43, '202523155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(44, '232223155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', '2024-10-26 20:37:27', 1, 43, 2),
(45, '120201', 'Nova descripcion', 'usado', 'compra', 'cambio-titulo', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', '2024-11-02 01:44:09', 1, 43, 2),
(48, '2213023155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', '2024-11-02 01:47:20', 1, 43, 2),
(49, '22123023155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(50, '22233023155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', '2024-11-01 20:51:30', 1, 43, 2),
(51, '222323423155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', '2024-11-01 21:02:29', 1, 43, 2),
(54, '231003303155', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', '2024-11-03 17:36:42', 1, 43, 2),
(55, '229', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(56, '129', 'Una descripcion creativa', 'usado', 'compra', 'pruebaasdsd', 5, 1, 'VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 3, 2),
(61, '102', 'Una descripcion creativa', 'usado', 'compra', 'pruebaasdsd', 5, 1, 'VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 3, 2),
(66, '482445242', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 2),
(69, '48224425242', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 43, 2),
(71, '484425242', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 43, 2),
(72, '48446625242', 'Una descripcion creativa', 'usado', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 43, 2),
(75, '484466252242', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 43, 5),
(80, '10001', 'Una descripcion creativa', 'nuevo', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 43, 4),
(81, '130001', 'Una descripcion creativa', 'nuevo', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'publicado', NULL, 1, 23, 4),
(84, '4899966252242', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 5),
(86, '13031', 'Una descripcion creativa', 'nuevo', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 23, 4),
(88, '120002', 'Una descripcion creativa', 'nuevo', 'arriendo', 'cambio-titulo', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 23, 4),
(89, '999999', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 5),
(91, '99433499', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 5),
(106, '23449941', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 23, 3),
(141, '994332499', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 5),
(144, '23449921', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 23, 3),
(146, '99433899', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 5),
(148, '9943899', 'Una descripcion creativa', 'nuevo', 'compra', 'prueba', 5, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 43, 5),
(152, '234429921', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 23, 3),
(154, '234422921', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 1, 23, 3),
(160, '2134422921', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 8, 23, 3),
(162, '2323921', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 4, 23, 3),
(164, '232233921', 'Una descripcion creativa', 'usado', 'arriendo', 'probando', 3, 1, 'no VIS', 'asassddjkasdhkasjd.com', 'borrador', NULL, 10, 23, 3);

--
-- Disparadores `inmuebles`
--
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

--
-- Volcado de datos para la tabla `interesados`
--

INSERT INTO `interesados` (`id_interesado`, `nombre`, `telefono`, `correo`, `ubicacion`, `subsidio`, `estado_civil`, `id_inmueble`) VALUES
(1, 'Raul Alvarez', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(2, 'Raul Alvarez', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(6, 'Raul Alvarez', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 75),
(7, 'Kevin', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 40),
(8, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(9, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(12, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(13, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(14, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(15, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41),
(16, 'Cam cif', '494992939', 'hola@gmail.com', 'rural', 0, 'viudo', 41);

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

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id_proyecto`, `fecha_entrega`, `id_inmueble`) VALUES
(1, '2025-12-06', 75),
(3, '2025-12-06', 84),
(5, '2025-12-06', 89),
(6, '2027-11-05', 91),
(7, '2027-11-05', 141),
(8, '2027-11-05', 146),
(9, '2027-11-05', 148);

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
-- Estructura de tabla para la tabla `tipos_inmueble`
--

CREATE TABLE `tipos_inmueble` (
  `id_tipo_inmueble` int(11) NOT NULL,
  `tipo_inmueble` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_inmueble`
--

INSERT INTO `tipos_inmueble` (`id_tipo_inmueble`, `tipo_inmueble`) VALUES
(1, 'apartamento'),
(2, 'apartaestudio'),
(3, 'casa'),
(4, 'oficina/local'),
(5, 'proyecto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tipo_usuario` varchar(25) NOT NULL COMMENT 'Estos pueden ser\r\n''usuario'',''customer'',''admin'''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `tipo_usuario`) VALUES
(1, 'test@gmail.com', 'customer'),
(2, 'correo@gmail.com', 'customer'),
(18, 'correo@gmail.com', 'customer'),
(19, 'correo@gmail.com', 'customer'),
(20, 'correo_test@gmail.com', 'customer'),
(23, 'correo_test@gmail.com', 'customer'),
(25, 'corret@gmail.com', 'customer'),
(26, 'correo_test@gmail.com', 'customer');

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

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id_video`, `url_video`, `id_detalle_inmueble`, `id_blog`) VALUES
(21, '32-1730396141005-939855727.mp4', 32, NULL),
(22, '32-1730396141912-513050915.mp4', 32, NULL),
(23, '32-1730672251776-565073422.mp4', 32, NULL),
(24, '32-1730676337191-998007189.mp4', 32, NULL);

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

--
-- Volcado de datos para la tabla `zonas`
--

INSERT INTO `zonas` (`id_zona`, `nombre`, `icono`, `tipo_zona`) VALUES
(1, 'Parqueadero visitantes', NULL, 'zona común'),
(2, 'Zona de lavado', NULL, 'zona común'),
(3, 'Gimnasio', NULL, 'zona común'),
(4, 'Transporte público', NULL, 'zona de interés'),
(5, 'Parques', NULL, 'zona de interés'),
(6, 'Centros comerciales', NULL, 'zona de interés');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas_inmuebles`
--

CREATE TABLE `zonas_inmuebles` (
  `id_inmueble` int(11) NOT NULL,
  `id_zona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Intermedia entre los inmuebles y las zonas';

--
-- Volcado de datos para la tabla `zonas_inmuebles`
--

INSERT INTO `zonas_inmuebles` (`id_inmueble`, `id_zona`) VALUES
(40, 1),
(40, 2),
(40, 3),
(40, 4),
(71, 2),
(72, 1),
(72, 3),
(72, 5),
(75, 1),
(75, 2),
(75, 3),
(75, 5);

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
  ADD PRIMARY KEY (`id_caracteristica`);

--
-- Indices de la tabla `caracteristicas_planes`
--
ALTER TABLE `caracteristicas_planes`
  ADD PRIMARY KEY (`id_plan`,`id_caracteristica`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_caracteristica` (`id_caracteristica`);

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
  ADD KEY `id_usuario` (`id_usuario`);

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
-- Indices de la tabla `tipos_inmueble`
--
ALTER TABLE `tipos_inmueble`
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
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `cod_ciudad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1125;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `detalles_inmuebles`
--
ALTER TABLE `detalles_inmuebles`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `inmuebles`
--
ALTER TABLE `inmuebles`
  MODIFY `id_inmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

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
  MODIFY `id_interesado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id_suscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_inmueble`
--
ALTER TABLE `tipos_inmueble`
  MODIFY `id_tipo_inmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id_video` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `id_zona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `inmuebles_destacados_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inmuebles_destacados_ibfk_2` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripciones` (`id_suscripcion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inmuebles_en_ascenso`
--
ALTER TABLE `inmuebles_en_ascenso`
  ADD CONSTRAINT `inmuebles_en_ascenso_ibfk_1` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripciones` (`id_suscripcion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inmuebles_en_ascenso_ibfk_2` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `interesados`
--
ALTER TABLE `interesados`
  ADD CONSTRAINT `interesados_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Filtros para la tabla `zonas_inmuebles`
--
ALTER TABLE `zonas_inmuebles`
  ADD CONSTRAINT `zonas_inmuebles_ibfk_1` FOREIGN KEY (`id_zona`) REFERENCES `zonas` (`id_zona`) ON UPDATE CASCADE,
  ADD CONSTRAINT `zonas_inmuebles_ibfk_2` FOREIGN KEY (`id_inmueble`) REFERENCES `inmuebles` (`id_inmueble`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
