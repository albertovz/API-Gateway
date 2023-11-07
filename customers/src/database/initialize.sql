-- Seleccionar la base de datos adecuada
USE apigateway;

-- Inicializar la tabla de clientes
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Agrega aquí más sentencias SQL si es necesario para inicializar tu base de datos
