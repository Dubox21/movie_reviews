DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT NOT NULL
);

INSERT INTO countries (id, country) VALUES
(1,'Estados Unidos'),
(2,'Mexico'),
(3,'España'),
(4,'Argentina'),
(5,'Inglaterra'),
(6,'Alemania'),
(7,'Italia'),
(8,'Francia'),
(9,'Brasil');


CREATE TABLE genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT INTO genres (id, name) VALUES
(1,'Acción'),
(2,'Comedia'),
(3,'Drama'),
(4,'Ciencia Ficción'),
(5,'Animación'),
(6,'Musical'),
(7,'Documental'),
(8,'Terror'),
(9,'Suspenso'),
(10,'Acción y Aventura');


CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    correo_electronico TEXT,
    contrasena TEXT
);

INSERT INTO usuarios VALUES
(1,'PruebaCleverCloud','clever@cloud.com','12345'),
(2,'Ambar','ambarprueba@gmail.com','123456'),
(3,'Prueba3','test3@gmail.com','123abc'),
(4,'prueba','pureba@mail.com','12345678');


CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image_cover TEXT,
    image_banner TEXT,
    description TEXT,
    trailer TEXT,
    director TEXT,
    screenwriter TEXT,
    language TEXT,
    duration TEXT,
    premiere TEXT,
    rating INTEGER,
    genre_id INTEGER,
    country_id INTEGER,
    user_id INTEGER
);

INSERT INTO movies VALUES
(4,'¿Y donde estan las rubias? (2004)','donde_estan_las_rubias.png','Img_donde_estan_las_rubias.png','Dos agentes del FBI en desgracia van encubiertos en un esfuerzo por proteger a unas herederas de hoteles, las hermanas Wilson, de un complot de secuestro.','https://www.youtube.com/embed/aeVkbNka9HM?si=T6j5xkaQB-5ttBZ','Keenen Ivory Wayans','Shawn Wayans, Marlon Wayans, Andrew McElfresh, Michael Anthony Snowden, Xavier Cook','Ingles','109 min','2004-10-01',4,2,1,2),

(5,'Escuela de Rock (2003)','escuela_de_rock.png','Img_escuela_de_rock.png','Tras ser expulsado de un grupo de rock...','https://www.youtube.com/embed/xFPPoxTE3t8','Richard Linklater','Mike White','Ingles','108 min','2004-02-20',5,2,1,2),

(6,'Ghostbusters: Apocalipsis Fantasma (2024)','ghostbusters.png','Img_ghostbusters.png','Cuando el descubrimiento de un artefacto...','https://www.youtube.com/embed/U6FxpBxM7j4','Gil Kenan','Gil Kenan, Jason Reitman, Ivan Reitman','Ingles','115 min','2024-03-21',3,10,1,2),

(8,'No Sé Si Cortarme Las Venas O Dejármelas Largas (2013)','no_se_si_cortarme_las_venas.png','Img_no_se_si_cortarme_las_venas.jpg','La historia toma lugar...','https://www.youtube.com/embed/IJ9zw7cImc8','Manolo Caro','Manolo Caro','Español','103 min','2013-08-23',3,3,2,NULL),

(10,'Paddington 2 (2017)','paddington_2.png','Img_Paddington-2.png','Completamente integrado...','https://www.youtube.com/embed/sw7RElt-SvE','Paul King','Paul King, Michael Bond, Simon Farnaby','Ingles','105 min','2018-02-09',4,5,5,NULL),

(11,'pelicula probando','pared_con_pared.png','Img_pared_con_pared.png','La película española...','https://www.youtube.com/embed/jRUheYjIVew','Patricia Font','Marta Sánchez','Español','98 min','2024-04-12',2,2,3,NULL),

(12,'Pitch Perfect (2012)','pitch_perfect.png','Img_notas_perfectas.png','La estudiante universitaria...','https://www.youtube.com/embed/8dItOM6eYXY','Jason Moore','Kay Cannon','Ingles','112 min','2012-09-28',4,6,1,NULL),

(13,'Rocko''s Modern Life: Static Cling (2019)','rockos.png','Img_rockos.png','Después de estar en el espacio...','https://www.youtube.com/embed/1Now4KeAiys','Joe Murray','Joe Murray','Ingles','45 min','2019-08-09',5,5,1,NULL),

(14,'Yo era famoso (2022)','yo_era_famoso.png','Img_yo_era_famoso.png','Una exestrella...','https://www.youtube.com/embed/S7zP4ccVxYY','Eddie Sternberg','Eddie Sternberg','Ingles','104 min','2022-09-16',5,6,5,NULL),

(15,'Frida (2024)','frida.png','Img_frida.png','Un viaje íntimo...','https://www.youtube.com/embed/JPKskw16yEk','Carla Gutierrez','N/A','Español','87 min','2024-03-15',4,7,1,NULL),

(16,'La Primera Profecía (2024)','la_primera_profecia.png','Img_la_primera_profecia.png','Cuando una joven...','https://www.youtube.com/embed/61rrDlVwvx4','Arkasha Stevenson','Arkasha Stevenson','Ingles','120 min','2024-04-04',4,8,7,NULL),

(17,'El Cazador de Monstruos (2020)','el_cazador_de_mounstro.png','Img_head_hunter.png','Un guerrero recorre...','https://www.youtube.com/embed/t-tfbMcZ8H','Jordan Downey','Jordan Downey','Ingles','72 min','2020-04-04',5,4,1,NULL),

(18,'Sobreviviendo Mis XV (2023)','sobreviviendo_a_mis_15.png','Img_sobreviviendo_mis_15.png','¡Los XV...','https://www.youtube.com/embed/j3VsLAuVpb8','Chava Cartas','Juan Carlos Garzón','Español','101 min','2023-09-21',1,2,2,NULL),

(19,'Soy Tu Fan: La Película (2022)','soy_tu_fan.png','Img_soy_tu_fan.png','En el año 2012...','https://www.youtube.com/embed/rtggffCAWSk','Mariana Chenillo','Dolores Fonzi','Español','100 min','2022-09-21',5,3,2,NULL),

(20,'Recursos Humanos (2023)','recursos_humanos.png','Img_recursos_humanos.png','Gabriel Lynch...','https://www.youtube.com/embed/WAXVbuQqvS8','Jesús Magaña','Jesús Magaña','Español','92 min','2023-11-16',2,2,4,NULL),

(21,'Barbie (2023)','barbie.png','Img_barbie.png','Vivir en Barbie Land...','https://www.youtube.com/embed/zh4KhVSMwtQ','Greta Gerwig','Greta Gerwig','Ingles','114 min','2023-07-20',4,2,1,NULL),

(22,'Oppenheimer (2023)','oppenheimer.png','Img_oppenheimer.png','Durante la Segunda Guerra...','https://www.youtube.com/embed/gMPEbJQun68','Christopher Nolan','Christopher Nolan','Ingles','181 min','2023-07-21',5,9,1,NULL),

(23,'Lo que el viento se llevó (1939)','lo_que_el_viento_se_llevo.png','Img_lo_que_el_viento_se_llevo.png','Ella suspira...','https://www.youtube.com/embed/0X94oZgJis4','Victor Fleming','Sidney Howard','Ingles','238 min','1939-12-15',4,3,1,NULL),

(24,'El Padrino: parte III (1990)','el_padrino.png','Img_el_padrino.png','A pesar...','https://www.youtube.com/embed/UUkG37KSWf0','Francis Ford Coppola','Francis Ford Coppola','Ingles','162 min','1990-12-25',4,3,1,NULL),

(25,'El Exorcista (1973)','el_exorcista.png','Img_the_exorcist.png','Adaptación...','https://www.youtube.com/embed/7iCJssW8XiI','William Friedkin','William Peter Blatty','Ingles','122 min','1973-12-26',5,8,1,NULL),

(26,'Rocky (1976)','rocky.png','Img_rocky.png','El boxeador...','https://www.youtube.com/embed/-Hk-LYcavrw','John G. Avildsen','Sylvester Stallone','Ingles','120 min','1976-11-21',5,3,1,NULL),

(27,'Grease (1978)','grease.png','Img_grease.png','Verano de 1959...','https://www.youtube.com/embed/THd96gHV7Tg','Randal Kleiser','Jim Jacobs','Ingles','110 min','1978-06-16',5,6,1,NULL),

(28,'Taxi Driver (1976)','taxi_driver.png','Img_taxi_driver.png','Un veterano...','https://www.youtube.com/embed/T5IligQP7Fo','Martin Scorsese','Paul Schrader','Ingles','113 min','1976-02-08',4,3,1,NULL),

(29,'Misery (1990)','misery.png','Img_misery.png','Un escritor...','https://www.youtube.com/embed/9HU-RfV7QA0','Rob Reiner','William Goldman','Ingles','107 min','1990-11-30',4,3,1,NULL),

(30,'Día de la Independencia (1996)','dia_de_independencia.png','Img_el-dia-de-la-independencia.png','Una raza...','https://www.youtube.com/embed/B1E7h3SeMDk','Roland Emmerich','Roland Emmerich','Ingles','145 min','1996-07-02',3,4,1,NULL),

(31,'Alicia en el País de Las Pesadillas (2023)','alicia.png','Img_alicia.png','Alicia...','https://www.youtube.com/embed/-AiIPckFfos','Richard John Taylor','Richard John Taylor','Ingles','77 min','2024-03-07',2,8,5,NULL),

(32,'La Monja II (2023)','la_monja.png','Img_la_monja.png','En 1956...','https://www.youtube.com/embed/Em7wEqLzDnE','Michael Chaves','Ian Goldberg','Ingles','109 min','2023-09-07',2,8,1,NULL),

(33,'M3gan (2022)','megan.png','Img_m3gan.png','M3GAN es...','https://www.youtube.com/embed/BRb4U99OU80','Gerard Johnstone','James Wan','Ingles','102 min','2022-12-29',3,8,1,NULL),

(34,'pelicula probando','barbie.png','background_library.png','La película española...','https://www.youtube.com/embed/jRUheYjIVew','Patricia Font','Marta Sánchez','Español','98 min','2024-04-12',2,2,3,NULL);
