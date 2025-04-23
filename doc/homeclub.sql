
-- creacion de tablas

CREATE DATABASE homeclub_db;

use homeclub_db;

CREATE TABLE tipo_apartamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL -- Ej: corporativo, turístico
);

CREATE TABLE pais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE ciudad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_pais INT NOT NULL,
    FOREIGN KEY (id_pais) REFERENCES pais(id)
);

CREATE TABLE apartamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    id_tipo_apartamento INT NOT NULL,
    id_ciudad INT NOT NULL,
    latitud DECIMAL(9,6),
    longitud DECIMAL(9,6),
    estado ENUM('activo', 'no activo') DEFAULT 'activo',
    FOREIGN KEY (id_tipo_apartamento) REFERENCES tipo_apartamento(id),
    FOREIGN KEY (id_ciudad) REFERENCES ciudad(id)
);


CREATE TABLE tipo_tarifa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL -- Ej: diaria, mensual
);

CREATE TABLE tarifa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_apartamento INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    id_tipo_tarifa INT NOT NULL,
    FOREIGN KEY (id_apartamento) REFERENCES apartamento(id),
    FOREIGN KEY (id_tipo_tarifa) REFERENCES tipo_tarifa(id)
);

CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);


CREATE TABLE reserva (
    codigo_reserva VARCHAR(20) PRIMARY KEY, -- Ej: 'R1234ABC'
    id_cliente INT NOT NULL,
    id_apartamento INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('activa', 'anulada') DEFAULT 'activa',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_apartamento) REFERENCES apartamento(id)
);


CREATE TABLE concepto_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL -- alquiler, tasa de servicio, tasa de reserva
);

CREATE TABLE pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_reserva VARCHAR(20) NOT NULL,
    id_concepto_pago INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (codigo_reserva) REFERENCES reserva(codigo_reserva),
    FOREIGN KEY (id_concepto_pago) REFERENCES concepto_pago(id)
);


-- información de tablas maestras


INSERT INTO pais (nombre) VALUES
('Colombia'),
('España'),
('México');

INSERT INTO ciudad (nombre, id_pais) VALUES
('Bogotá', 1),  -- Bogotá pertenece a Colombia
('Madrid', 2),  -- Madrid pertenece a España
('Ciudad de México', 3);  -- Ciudad de México pertenece a México

INSERT INTO tipo_apartamento (nombre) VALUES
('corporativo'),
('turistico');

INSERT INTO tipo_tarifa (nombre) VALUES
('mensual'),
('diaria');



INSERT INTO apartamento (nombre, direccion, id_tipo_apartamento, id_ciudad, latitud, longitud, estado) VALUES
('Torrenazas', 'Dirección de Torrenazas', 1, 1, 40.421172, -3.668683, 'activo'),
('Vinateros', 'Dirección de Vinateros', 2, 1, 40.410674, -3.654633, 'activo'),
('Guzman del Bueno', 'Dirección de Guzman del Bueno', 1, 1, 40.434092, -3.713227, 'activo'),
('Balseiro', 'Dirección de Balseiro', 1, 1, 40.449905, -3.710190, 'activo'),
('Maria del Portugal', 'Dirección de Maria del Portugal', 2, 1, 40.495361, -3.664375, 'activo'),
('Vallecas', 'Dirección de Vallecas', 2, 1, 40.363814, -3.587611, 'activo'),
('Botanic', 'Botanic (Valencia)', 1, 2, 39.471748, -0.385786, 'activo'),
('San Ramon', 'San Ramon (Barcelona)', 1, 3, 41.385891, 2.126838, 'activo'),
('Badalona', 'Badalona (Barcelona)', 1, 3, 41.458080, 2.241886, 'activo'),
('Miami Gardens', 'Miami Gardens (Miami)', 1, 3, 25.941063, -80.200227, 'activo');





