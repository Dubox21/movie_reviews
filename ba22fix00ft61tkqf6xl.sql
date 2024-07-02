-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: ba22fix00ft61tkqf6xl-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 02-07-2024 a las 12:53:14
-- Versión del servidor: 8.0.22-13
-- Versión de PHP: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ba22fix00ft61tkqf6xl`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `country`) VALUES
(1, 'Estados Unidos'),
(2, 'Mexico'),
(3, 'España'),
(4, 'Argentina'),
(5, 'Inglaterra'),
(6, 'Alemania'),
(7, 'Italia'),
(8, 'Francia'),
(9, 'Brasil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genres`
--

CREATE TABLE `genres` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'Acción'),
(2, 'Comedia'),
(3, 'Drama'),
(4, 'Ciencia Ficción'),
(5, 'Animación'),
(6, 'Musical'),
(7, 'Documental'),
(8, 'Terror'),
(9, 'Suspenso'),
(10, 'Acción y Aventura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movies`
--

CREATE TABLE `movies` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image_cover` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_banner` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `trailer` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `director` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `screenwriter` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `language` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `duration` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `premiere` date DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movies`
--

INSERT INTO `movies` (`id`, `title`, `image_cover`, `image_banner`, `description`, `trailer`, `director`, `screenwriter`, `language`, `duration`, `premiere`, `rating`, `genre_id`, `country_id`, `user_id`) VALUES
(4, '¿Y donde estan las rubias? (2004)', 'donde_estan_las_rubias.png', 'Img_donde_estan_las_rubias.png', 'Dos agentes del FBI en desgracia van encubiertos en un esfuerzo por proteger a unas herederas de hoteles, las hermanas Wilson, de un complot de secuestro.\r\n\"¿Y dónde están las rubias?\" es una comedia del año 2004 dirigida por Keenen Ivory Wayans. La trama sigue ados agentes del FBI, interpretados por Shawn Wayans y Marlon Wayans, que se encuentran en una situación difícil y son asignados a una misión encubierta. Deben proteger a unas herederas de hoteles, las hermanas Wilson, interpretadas por Brittany Daniel y Jessica Cauffiel, de un complot de secuestro. La película está llena de humor absurdo, situaciones cómicas y parodias de otras películas y programas de televisión. En resumen, \"¿Y dónde están las rubias?\" es una película divertida que ofrece una combinación de comedia física y humor satírico.', 'https://www.youtube.com/embed/aeVkbNka9HM?si=T6j5xkaQB-5ttBZ', 'Keenen Ivory Wayans', 'Shawn Wayans, Marlon Wayans, Andrew McElfresh, Michael Anthony Snowden, Xavier Cook', 'Ingles', '109 min', '2004-10-01', 4, 2, 1, 2),
(5, 'Escuela de Rock (2003)', 'escuela_de_rock.png', 'Img_escuela_de_rock.png', 'Tras ser expulsado de un grupo de rock, Dewey Finn trabaja como profesor substituto en una estricta escuela privada, e intenta convertirla en un grupo de rock.\r\n\"Escuela de Rock\" es una comedia musical que sigue la historia de Dewey Finn, un músico sin suerte que se hace pasar por un profesor sustituto en una escuela privada. Con la ayuda de sus talentosos estudiantes, Dewey forma una banda de rock clandestina y desata el caos en el campus. Con actuaciones divertidas, una banda sonora pegadiza y un mensaje sobre la importancia de la música y la autoexpresión, esta película es un viaje emocionante y divertido para toda la familia.\r\n        ', 'https://www.youtube.com/embed/xFPPoxTE3t8', 'Richard Linklater', 'Mike White', 'Ingles', '108 min', '2004-02-20', 5, 2, 1, 2),
(6, 'Ghostbusters: Apocalipsis Fantasma (2024)', 'ghostbusters.png', 'Img_ghostbusters.png', 'Cuando el descubrimiento de un artefacto antiguo libera una fuerza maligna, los nuevos y viejos Ghostbusters unen sus fuerzas para proteger su hogar y salvar al mundo de una segunda era de hielo.\r\n\"Ghostbusters: Apocalipsis Fantasma2 retoma la icónica franquicia con una nueva aventura llena de acción, humor y espectaculares efectos visuales. La película presenta un elenco talentoso, quienes encarnan a un equipo de cazafantasmas enfrentándose a una amenaza paranormal de proporciones épicas. Con referencias nostálgicas para los fans y un enfoque fresco para atraer a una nueva generación de espectadores, esta entrega promete emocionar y divertir a todos los amantes del cine de ciencia ficción y comedia.\r\n       ', 'https://www.youtube.com/embed/U6FxpBxM7j4', 'Gil Kenan', 'Gil Kenan, Jason Reitman, Ivan Reitman', 'Ingles', '115 min', '2024-03-21', 3, 10, 1, 2),
(8, 'No Sé Si Cortarme Las Venas O Dejármelas Largas (2013)', 'no_se_si_cortarme_las_venas.png', 'Img_no_se_si_cortarme_las_venas.jpg', 'La historia toma lugar con la llegada de un nuevo personaje en sus vidas, el ex – jugador de futbol llamado Felix. \r\n\"No Sé Si Cortarme Las Venas O Dejármelas Largas\" es una película española dirigida por Manolo Caro que te sumerge en un universo de tragicomedia y surrealismo. Esta historia gira en torno a una familia disfuncional que se ve obligada a reunirse tras la muerte del patriarca. Lo que sigue es un viaje emocional a través de los conflictos y secretos de cada miembro de la familia, explorando temas como el amor, la pérdida, la identidad y la aceptación. \r\nCon un elenco excepcional encabezado por una brillante Mariana Treviño, la película te cautiva con su humor ácido y sus diálogos ingeniosos, al mismo tiempo que te conmueve con sus momentos de sinceridad y vulnerabilidad. La dirección de Caro aporta un estilo visual distintivo y una narrativa que te mantiene intrigado de principio a fin.', 'https://www.youtube.com/embed/IJ9zw7cImc8', 'Manolo Caro', 'Manolo Caro', 'Español', '103 min', '2013-08-23', 3, 3, 2, NULL),
(10, 'Paddington 2 (2017)', 'paddington_2.png', 'Img_Paddington-2.png', 'Completamente integrado a la sociedad, el oso Paddington (Ben Whishaw) vive feliz con los Brown, gozando de la simpatía y respeto de la comunidad de Windsor Gardens.\n\"Paddinton 2\'\" es una encantadora y conmovedora película familiar que sigue las aventuras del adorable oso Paddington en Londres. Dirigida por Paul King, esta secuela captura el corazón de su audiencia con una historia llena de humor, ternura y lecciones valiosas sobre la amistad y la importancia de ser amable. Con un elenco carismático y una animación impecable que da vida al querido personaje de Michael Bond, esta película es una delicia visual y emocional para espectadores de todas las edades. Con momentos hilarantes, emocionantes y conmovedores, \'Paddinton 2\' es una experiencia cinematográfica que deja una sonrisa en tu rostro y calidez en tu corazón.', 'https://www.youtube.com/embed/sw7RElt-SvE', 'Paul King', 'Paul King, Michael Bond, Simon Farnaby', 'Ingles', '105 min', '2018-02-09', 4, 5, 5, NULL),
(11, 'pelicula probando', 'pared_con_pared.png', 'Img_pared_con_pared.png', 'La película española «Pared con pared» es una nueva versión de la comedia romántica francesa «Tras la pared» o Un peu, beaucoup, aveuglément. La película española «Pared con pared» es una nueva versión de la comedia romántica francesa «Tras la pared» o Un peu, beaucoup, aveuglément. La adaptación está protagonizada por la famosa cantante Aitana. Ella es una joven pianista que se prepara para una audición. Él (Fernando Guallar) es un diseñador de juegos que necesita silencio absoluto para concentrarse. Ambos viven en apartamentos contiguos que están separados solo por una delgadísima pared. ¿Lograrán aprender?\"', 'https://www.youtube.com/embed/jRUheYjIVew', 'Patricia Font', 'Marta Sánchez', 'Español', '98 min', '2024-04-12', 2, 2, 3, NULL),
(12, 'Pitch Perfect (2012)', 'pitch_perfect.png', 'Img_notas_perfectas.png', 'La estudiante universitaria Beca (Anna Kendrick) sabe que no quiere ser parte de una camarilla, pero ahí es exactamente donde se encuentra después de llegar a su nueva escuela.\r\n\"Pitch Perfect\" es una comedia musical que sigue a un grupo de estudiantes universitarios que forman un equipo de canto a capella para competir en un importante concurso. Dirigida por Jason Moore, esta película es una mezcla de música, humor y amistad que cautiva al público con su energía contagiosa y actuaciones vocales impresionantes. Con un elenco talentoso liderado por Anna Kendrick y Rebel Wilson, \"Pitch Perfect\" se ha convertido en un éxito de culto que sigue resonando con los amantes de la música y la comedia.', 'https://www.youtube.com/embed/8dItOM6eYXY', 'Jason Moore', 'Kay Cannon', 'Ingles', '112 min', '2012-09-28', 4, 6, 1, NULL),
(13, 'Rocko\'s Modern Life: Static Cling (2019)', 'rockos.png', 'Img_rockos.png', 'Después de estar en el espacio durante unos 20 años, Rocko y sus amigos intentan adaptarse a una vida aún más moderna en O-Town.\r\n\"Rocko\'s Modern Life: Static Cling\" es una película de animación que retoma la querida serie de televisión de los años 90. Dirigida por Joe Murray y Cosmo Segurson, esta película sigue a Rocko y sus amigos en una nueva aventura después de haber estado congelados en el espacio durante dos décadas. Llena de humor inteligente y nostalgia, \"Static Cling\" deleita a los fanáticos de la serie original mientras aborda temas contemporáneos de una manera divertida y reflexiva.', 'https://www.youtube.com/embed/1Now4KeAiys', 'Joe Murray, Cosmo Segurson', 'Joe Murray', 'Ingles', '45  min', '2019-08-09', 5, 5, 1, NULL),
(14, 'Yo era famoso (2022)', 'yo_era_famoso.png', 'Img_yo_era_famoso.png', 'Una exestrella de una banda de chicos obtiene una segunda oportunidad cuando se une a un talentoso baterista. Estreno exclusivo de Netflix.\r\nVince, una ex estrella del pop desesperada que sueña con regresar. Una improvisada sesión de improvisación con el joven baterista autista Stevie provoca una amistad inesperada entre los dos músicos incomprendidos.\r\n       ', 'https://www.youtube.com/embed/S7zP4ccVxYY', 'Eddie Sternberg', 'Eddie Sternberg, Zak Klein', 'Ingles', '104 min', '2022-09-16', 5, 6, 5, NULL),
(15, 'Frida (2024)', 'frida.png', 'Img_frida.png', 'Un viaje íntimamente crudo y mágico a través de la vida, la mente y el corazón de la icónica artista Frida Kahlo.\r\n\"Frida\" es una película biográfica que narra la vida y obra de la famosa pintora mexicana Frida Kahlo. Dirigida por Carla Gutierrez, esta película presenta una interpretación cautivadora de la vida de Kahlo, desde su complicada relación con Diego Rivera hasta su lucha personal y artística. Con una actuación destacada en el papel titular, \"Frida\" ofrece una visión íntima y conmovedora de una de las artistas más influyentes del siglo XX.\r\n        ', 'https://www.youtube.com/embed/JPKskw16yEk', 'Carla Gutierrez', 'N/A', 'Español', '87 min', '2024-03-15', 4, 7, 1, NULL),
(16, 'La Primera Profecía (2024)', 'la_primera_profecia.png', 'Img_la_primera_profecia.png', 'Cuando una joven estadounidense es enviada a Roma para comenzar una vida de servicio a la Iglesia, descubre una oscuridad que la lleva a cuestionar su propia fe y devela una conspiración aterradora que espera provocar el nacimiento de la encarnación del mal.\r\nLa primera profecía es una película estadounidense de terror sobrenatural dirigida por Arkasha Stevenson, quien coescribió el guion con Tim Smith y Keith Thomas a partir de una historia de Ben Jacoby. Es una precuela de La profecía, siendo a su vez la sexta película de la franquicia.\r\n        ', 'https://www.youtube.com/embed/61rrDlVwvx4', 'Arkasha Stevenson', 'Arkasha Stevenson, Tim Smith, Keith Thomas', 'Ingles', '120 min', '2024-04-04', 4, 8, 7, NULL),
(17, 'El Cazador de Monstruos (2020)', 'el_cazador_de_mounstro.png', 'Img_head_hunter.png', 'Un guerrero recorre grandes extensiones a caballo, persiguiendo al monstruo que asesinó a su hija.\r\nUn guerrero recorre grandes extensiones a caballo, persiguiendo al monstruo que asesinó a su hija. Su sed de venganza es el motor de una película construida con muy pocos elementos, minimalistas y épicos al mismo tiempo, donde la fantasía y el horror encuentran sus encarnaciones más físicas y sangrientas\r\n       ', 'https://www.youtube.com/embed/t-tfbMcZ8H', 'Jordan Downey', 'Jordan Downey, Kevin Stewart', 'Ingles', '72 min', '2020-04-04', 5, 4, 1, NULL),
(18, 'Sobreviviendo Mis XV (2023)', 'sobreviviendo_a_mis_15.png', 'Img_sobreviviendo_mis_15.png', '¡Los XV, una edad mágica!… excepto cuando tu familia te quiere meter en un vestido ampón y ponerte a bailar vals frente a todo el mundo, que es justo lo que le pasa a Danae muy poco después de cambiarse a una escuela privada muy fresa.\r\nCumplir 15 años es maravilloso, excepto si tu familia desea que te vistas de forma ridícula y bailes en público. Danae debe lidiar con esto, pero también con una nueva escuela, nuevas amigas, la tradición familiar, la modernidad y un montón de cosas. Ahora Danae tiene que arreglárselas para balancear las exigencias de su familia, las de sus nuevas amigas y organizar sus XV años cool, pero tradicional, pero moderna, pero emotiva, pero aesthetic, pero que también le guste a la abuela… Sin morir en el intento..\r\n        ', 'https://www.youtube.com/embed/j3VsLAuVpb8', 'Chava Cartas', 'Juan Carlos Garzón, Angélica Gudiño', 'Español', '101 min', '2023-09-21', 1, 2, 2, NULL),
(19, 'Soy Tu Fan: La Película (2022)', 'soy_tu_fan.png', 'Img_soy_tu_fan.png', 'En el año 2012, Charly abandona a Nicolás minutos antes de casarse y se muda de país. Ha pasado ya una década desde que Charly y Nico se encontraron en una encrucijada de amor y, después de varios años, descubrirán si entre ellos la llama aún sigue viva.\r\nLa magia que los entrañables personajes vivieron hace 10 años regresa una vez que todos los amigos se dan cita en una playa de México para celebrar la boda íntima de Rocío (Maya Zapata) y Diego (Gonzalo García Vivanco). Ahí, juntos revivirán icónicos momentos de amor y reflexión; sumando a la historia nuevas aventuras.', 'https://www.youtube.com/embed/rtggffCAWSk', 'Mariana Chenillo', 'Dolores Fonzi, Constanza Novick, Laura Paredes', 'Español', '100 min', '2022-09-21', 5, 3, 2, NULL),
(20, 'Recursos Humanos (2023)', 'recursos_humanos.png', 'Img_recursos_humanos.png', 'Gabriel Lynch (Pedro de Tavira), un sombrío supervisor de la división de impresiones acaba de solicitar el puesto de gerente.\r\nGabriel, un supervisor de impresiones en una compañía, aplica para la vacante de una gerencia. Pero para su sorpresa, el puesto se lo dan a un familiar de uno de los jefes del lugar. De a poco, a partir de esto, conocemos a algunos empleados como la persona nueva del área de recursos humanos; desde luego que al nuevo gerente; un compañero de Gabriel; y una misteriosa mujer que permanece en la vida del protagonista más allá del trabajo.\r\n        ', 'https://www.youtube.com/embed/WAXVbuQqvS8', 'Jesús Magaña Vázquez', 'Jesús Magaña Vázquez, Fernando del Razo', 'Español', '92 min', '2023-11-16', 2, 2, 4, NULL),
(21, 'Barbie (2023)', 'barbie.png', 'Img_barbie.png', 'Vivir en Barbie Land es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial total. O eres un Ken.Esta comedia familiar de aventuras es una adaptación al cine sobre una de las muñecas de juguete más famosas del mundo. Barbie (Margot Robbie) lleva una vida ideal en Barbieland, allí todo es perfecto, con chupi fiestas llenas de música y color, y todos los días son el mejor día. Claro que Barbie se hace algunas preguntas, cuestiones bastante incómodas que no encajan con el mundo idílico en el que ella y las demás Barbies viven.\r\n        ', 'https://www.youtube.com/embed/zh4KhVSMwtQ', 'Greta Gerwig', 'Greta Gerwig, Noah Baumbach', 'Ingles', '114 min', '2023-07-20', 4, 2, 1, NULL),
(22, 'Oppenheimer (2023)', 'oppenheimer.png', 'Img_oppenheimer.png', 'Durante la Segunda Guerra Mundial, el teniente general Leslie Groves Jr. nombra al físico J. Robert Oppenheimer para trabajar en el ultrasecreto Proyecto Manhattan.\r\nImpactado por su poder destructivo, Oppenheimer se cuestiona las consecuencias morales de su creación. Desde entonces y durante el resto de su vida, se opondría firmemente a la guerra nuclear y a la todavía más destructiva bomba de hidrógeno. Su vida daría así un profundo vuelco, pasando de tener un papel fundamental en el mapa político de la Guerra Fría a ser acusado de comunista en la era McCarthy. Cuestionando su lealtad, Oppenheimer fue tachando de espía de la Unión Soviética y obligado a dimitir de cualquier función pública\r\n        ', 'https://www.youtube.com/embed/gMPEbJQun68', 'Christopher Nolan', 'Christopher Nolan', 'Ingles', '181 min', '2023-07-21', 5, 9, 1, NULL),
(23, 'Lo que el viento se llevó (1939)', 'lo_que_el_viento_se_llevo.png', 'Img_lo_que_el_viento_se_llevo.png', 'Ella suspira por el amor de Ashley (Leslie Howard), pero él está prometido con su prima, la dulce y bondadosa Melanie (Olivia de Havilland).\r\n\"Lo que el viento se llevó\" es un clásico del cine que narra la historia épica de amor y supervivencia durante la Guerra Civil estadounidense. Dirigida por Victor Fleming, mientras luchan por mantenerse fieles a sí mismos y a sus seres queridos en medio del caos y la adversidad. Con actuaciones memorables y una cinematografía impresionante, \"Lo que el viento se llevó\" sigue siendo una obra maestra intemporal que ha cautivado a generaciones de espectadores.\r\n        ', 'https://www.youtube.com/embed/0X94oZgJis4', 'Victor Fleming', 'Sidney Howard', 'Ingles', '238 min', '1939-12-15', 4, 3, 1, NULL),
(24, 'El Padrino: parte III (1990)', 'el_padrino.png', 'Img_el_padrino.png', 'A pesar del reconfortante recibimiento de sus predecesoras, este filme ha sido el más controversial, dejando divididos a los críticos y fanáticos con sus respectivas opiniones.\r\n\"El Padrino: Parte III\" cierra la legendaria trilogía de El Padrino con una historia de poder, redención y tragedia. Dirigida por Francis Ford Coppola, mientras lucha por proteger a su familia y su legado en el mundo del crimen organizado. Con actuaciones magistrales de Al Pacino y un elenco estelar, \"El Padrino: Parte III\" es un final épico para una de las sagas cinematográficas más influyentes de todos los tiempos.\r\n        ', 'https://www.youtube.com/embed/UUkG37KSWf0', 'Francis Ford Coppola', 'Francis Ford Coppola', 'Ingles', '162 min', '1990-12-25', 4, 3, 1, NULL),
(25, 'El Exorcista (1973)', 'el_exorcista.png', 'Img_the_exorcist.png', 'Adaptación de la novela de William Peter Blatty que se inspiró en un exorcismo real ocurrido en Washington en 1949.\r\n\"El Exorcista\" es un clásico del cine de terror que ha aterrorizado a audiencias desde su estreno. Dirigida por William Friedkin, esta película sigue la aterradora historia mientras luchan contra una fuerza demoníaca que ha poseído a su hija. Con su atmósfera inquietante, actuaciones poderosas y efectos especiales impactantes, \"El Exorcista\" sigue siendo una de las películas de terror más influyentes y perturbadoras de todos los tiempos.\r\n        ', 'https://www.youtube.com/embed/7iCJssW8XiI', 'William Friedkin', 'William Peter Blatty', 'Ingles', '122 min', '1973-12-26', 5, 8, 1, NULL),
(26, 'Rocky (1976)', 'rocky.png', 'Img_rocky.png', 'El boxeador Rocky Balboa, obtiene una gran oportunidad para luchar contra el \'\'Campeón Pesado\'\', Apollo Creed, en un combate en el que se esfuerza por llegar hasta el final por amor propio.\r\n\"Rocky\" es un clásico del cine de boxeo que sigue la historia inspiradora de un boxeador de Filadelfia que recibe la oportunidad de su vida para enfrentarse al campeón del mundo. Dirigida por John G. Avildsen, esta película es una emocionante historia de lucha, determinación y esperanza que ha tocado los corazones de audiencias de todo el mundo. Con una actuación inolvidable de Sylvester Stallone, \'Rocky\' se ha convertido en un símbolo de perseverancia y superación personal.\r\n        ', 'https://www.youtube.com/embed/-Hk-LYcavrw', 'John G. Avildsen', 'Sylvester Stallone', 'Ingles', '120 min', '1973-11-21', 5, 3, 1, NULL),
(27, 'Grease (1978)', 'grease.png', 'Img_grease.png', 'Verano de 1959. Sandy (Olivia Newton John) y Danny (John Travolta) han pasado un romántico y maravilloso verano juntos, pero, cuando las vacaciones se acaban, sus caminos se separan. Inesperadamente, vuelven a verse en el instituto Rydell, pero la actitud de Danny ya no es la misma: ya no es el chico encantador y atento que encandiló a Sandy; ahora es engreído e insensible.\r\n\"Grease\" es un clásico del cine musical que sigue la historia de amor en el contexto de los años 50. Dirigida por Randal Kleiser, esta película combina música pegadiza, coreografías espectaculares y un elenco carismático para crear una experiencia cinematográfica inolvidable. Con actuaciones destacadas de John Travolta y Olivia Newton-John, \'Grease\' ha dejado una huella indeleble en la cultura pop y sigue siendo una de las películas musicales más queridas de todos los tiempos.\r\n        ', 'https://www.youtube.com/embed/THd96gHV7Tg', 'Randal Kleiser', 'Jim Jacobs, Warren Casey', 'Ingles', '110 min', '1978-06-16', 5, 6, 1, NULL),
(28, 'Taxi Driver (1976)', 'taxi_driver.png', 'Img_taxi_driver.png', 'Un veterano de la guerra de Vietnam mentalmente inestable trabaja como taxista nocturno en la ciudad de Nueva York, donde la decadencia percibida y sordidez alimenta su impulso para la acción violenta, tratando de salvar a una prostituta preadolescente en el proceso.\r\n\"Taxi Driver\" es un clásico del cine dirigido por Martin Scorsese que sigue la historia de un taxista solitario y alienado que deambula por las calles nocturnas de Nueva York. Con una actuación icónica de Robert De Niro, esta película es una exploración inquietante de la soledad, la alienación y la violencia urbana. Con su atmósfera sombría y su narrativa provocativa, \"Taxi Driver\" es una obra maestra del cine que sigue siendo relevante hoy en día.\r\n        ', 'https://www.youtube.com/embed/T5IligQP7Fo', 'Martin Scorsese', 'Paul Schrader', 'Ingles', '113 min', '1976-02-08', 4, 3, 1, NULL),
(29, 'Misery (1990)', 'misery.png', 'Img_misery.png', 'Un escritor llamado Paul Sheldon (James Caan) lleva años malgastando su talento con unas románticas historias, de gran éxito comercial, cuya protagonista es una mujer llamada Misery.\r\n\"Misery\" es un thriller psicológico basado en la novela de Stephen King. Dirigida por Rob Reiner, esta película te sumerge en un mundo de obsesión y terror cuando un escritor es secuestrado por su fan más ferviente. Con actuaciones poderosas de James Caan y Kathy Bates, \"Misery\" es un viaje emocionante y perturbador que te mantiene al borde de tu asiento hasta el último momento.\r\n        ', 'https://www.youtube.com/embed/9HU-RfV7QA0', 'Rob Reiner', 'William Goldman', 'Ingles', '107 min', '1990-11-30', 4, 3, 1, NULL),
(30, 'Día de la Independencia (1996)', 'dia_de_independencia.png', 'Img_el-dia-de-la-independencia.png', 'Una raza extraterrestre llega a la Tierra con el objetivo de invadir y destruir. Peleando contra tecnología superior, la mejor arma de la raza humana será su fuerza de voluntad.\r\n\"Día de la Independencia\" es una emocionante película de ciencia ficción que narra la invasión alienígena de la Tierra y la lucha desesperada de la humanidad por sobrevivir. Dirigida por Roland Emmerich, esta película ofrece una mezcla de acción intensa, efectos visuales impresionantes y un sentido de patriotismo estadounidense. Con un elenco estelar liderado por Will Smith y Jeff Goldblum, \"Día de la Independencia\" es un clásico del cine de acción que sigue emocionando a los espectadores con su espectacularidad.\r\n        ', 'https://www.youtube.com/embed/B1E7h3SeMDk', 'Roland Emmerich', 'Roland Emmerich, Dean Devlin', 'Ingles', '145 min', '1996-07-02', 3, 4, 1, NULL),
(31, 'Alicia en el País de Las Pesadillas (2023)', 'alicia.png', 'Img_alicia.png', 'Alicia en el País del Terror, es una inquietante versión del clásico cuento de Lewis Carroll, que transporta al espectador a un mundo retorcido y oscuro.\r\nUna adolescente recientemente desconsolada se va a vivir con su abuela a una casa aislada en el bosque, sin saber que fuerzas siniestras la acechan. Una adolescente recientemente desconsolada se va a vivir con su abuela a una casa aislada en el bosque, sin saber que fuerzas siniestras la acechan.\r\n        ', 'https://www.youtube.com/embed/-AiIPckFfos', 'Richard John Taylor', 'Richard John Taylor', 'Ingles', '77 min', '2024-03-07', 2, 8, 5, NULL),
(32, 'La Monja II (2023)', 'la_monja.png', 'Img_la_monja.png', 'En 1956 en Francia, un sacerdote es asesinado y parece que un mal se está extendiendo. La hermana Irene una vez más se encuentra cara a cara con una fuerza demoníaca.\r\nAño 1956. Cuatro años antes la hermana Irene se tuvo que enfrentar a una inexplicable fuerza demoníaca que aterraba un convento de Rumanía. Un demonio de nombre Valak poseyó los cuerpos de los religiosos miembros allí presentes, y también de los investigadores que le dieron caza. Ahora es Francia donde el mal campa a sus anchas, con un sacerdote asesinado, y todas las señales apuntan a Valak. La hermana Irene tendrá que enfrentarse a esta malévola pero familiar fuerza que debe ser contenida a toda costa.\r\n        ', 'https://www.youtube.com/embed/Em7wEqLzDnE', 'Michael Chaves', 'Ian B. Goldberg, Richard Naing, Akela Cooper', 'Ingles', '109 min', '2023-09-07', 2, 8, 1, NULL),
(33, 'M3gan (2022)', 'megan.png', 'Img_m3gan.png', 'M3GAN es una maravilla de la inteligencia artificial, una muñeca realista programada para ser la mejor compañera de los niños y la mayor aliada de los padres.\r\nM3GAN es una maravilla de la inteligencia artificial, una muñeca realista programada para ser la mejor compañera de los niños y la mayor aliada de los padres. Diseñada por Gemma, M3GAN es capaz de escuchar, observar y aprender mientras se convierte en amiga, profesora, compañera de juegos y protectora del niño al que se vincule. Cuando, inesperadamente, Gemma se convierte en la tutora legal de Cady, su sobrina huérfana de 9 años, no sabe muy bien qué hacer ni se siente preparada para ejercer de madre. Sometida a un intenso estrés laboral, Gemma decide vincular su prototipo de M3GAN a Cady en un intento de resolver ambos problemas, pero no tardará en descubrir las inimaginables consecuencias de su decisión.\r\n        ', 'https://www.youtube.com/embed/BRb4U99OU80', 'Gerard Johnstone', 'James Wan, Akela Cooper', 'Ingles', '102 min', '2022-12-29', 3, 8, 1, NULL),
(34, 'pelicula probando', 'barbie.png', 'background_library.png', 'La película española «Pared con pared» es una nueva versión de la comedia romántica francesa «Tras la pared» o Un peu, beaucoup, aveuglément. La película española «Pared con pared» es una nueva versión de la comedia romántica francesa «Tras la pared» o Un peu, beaucoup, aveuglément. La adaptación está protagonizada por la famosa cantante Aitana. Ella es una joven pianista que se prepara para una audición. Él (Fernando Guallar) es un diseñador de juegos que necesita silencio absoluto para concentrarse. Ambos viven en apartamentos contiguos que están separados solo por una delgadísima pared. ¿Lograrán aprender?\"', 'https://www.youtube.com/embed/jRUheYjIVew', 'Patricia Font', 'Marta Sánchez', 'Español', '98 min', '2024-04-12', 2, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `correo_electronico` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo_electronico`, `contrasena`) VALUES
(1, 'PruebaCleverCloud', 'clever@cloud.com', '12345'),
(2, 'Ambar', 'ambarprueba@gmail.com', '123456'),
(3, 'Prueba3', 'test3@gmail.com', '123abc'),
(4, 'prueba', 'pureba@mail.com', '12345678');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_genre` (`genre_id`),
  ADD KEY `fk_country` (`country_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `fk_genre` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
