FROM php:8.2-apache

# Instalar extensões PHP necessárias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Copiar arquivos do projeto
COPY . /var/www/html/

# Definir permissões
RUN chown -R www-data:www-data /var/www/html

# Expor porta
EXPOSE 80

CMD ["apache2-foreground"]
