CREATE DATABASE pwcidb;
USE pwcidb;

CREATE TABLE usuarios(
id_Usuario int auto_increment,
nombre_Usuario varchar(20) not null,
correo_Usuario varchar(50) not null,
password_Usuario varchar(15) not null,
imagen_Avatar mediumblob,
estado bit DEFAULT(1),
tipo_Cuenta enum('private','public') default 'private',
primary key(id_Usuario)
);

CREATE TABLE lista(
id_Lista int auto_increment,
nombre_Lista varchar(30) not null,
descrip_Lista varchar(100),
tipo_Lista enum('private','public') default 'private',
usuario_Dueno int not null,
/*image longblob NOT NULL,
imageType varchar(5) NOT NULL,*/
primary key(id_Lista),
foreign key(usuario_Dueno) references usuarios(id_Usuario)
);

CREATE TABLE objeto(
id_Objeto int auto_increment,
nombre_Objeto varchar(30) not null,
descrip_Objeto varchar(100) not null,
estado_Objeto enum('busca','tiene') not null default 'busca',
precio_Objeto int,
lista_Duena int not null,
primary key(id_Objeto),
foreign key(lista_Duena) references lista(id_Lista)
);

