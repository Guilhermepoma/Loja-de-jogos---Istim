-- Criar usuário e banco de dados com permissões completas
CREATE DATABASE IF NOT EXISTS istim;
CREATE USER IF NOT EXISTS 'higemax'@'%' IDENTIFIED BY 'higemax123';
CREATE USER IF NOT EXISTS 'higemax'@'localhost' IDENTIFIED BY 'higemax123';
GRANT ALL PRIVILEGES ON istim.* TO 'higemax'@'%';
GRANT ALL PRIVILEGES ON istim.* TO 'higemax'@'localhost';
FLUSH PRIVILEGES;
