#!/bin/bash

# Aguardar MySQL ficar pronto
sleep 10

# Conectar como root e dar permissões completas ao higemax
docker exec mysql_app mysql -uroot -proot123 -e "
GRANT ALL PRIVILEGES ON istim.* TO 'higemax'@'%' IDENTIFIED BY 'higemax123';
GRANT ALL PRIVILEGES ON istim.* TO 'higemax'@'localhost' IDENTIFIED BY 'higemax123';
FLUSH PRIVILEGES;
SELECT user, host FROM mysql.user WHERE user='higemax';
"
