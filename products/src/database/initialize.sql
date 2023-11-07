-- Seleccionar la base de datos adecuada
USE apigateway;

-- Inicializar la tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Agrega aquí más sentencias SQL si es necesario para inicializar tu base de datos
