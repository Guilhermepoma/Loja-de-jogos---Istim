<?php

//se tiver dando erro de conexão ta aqui o culpado, temos que trocar na sala

$host = 'mysql';
$user = 'higemax';
$password = 'higemax123';
$database = 'istim';

try {

    $conn = new mysqli($host, $user, $password, $database);

    if ($conn->connect_error) {
        die("Erro na conexão: " . $conn->connect_error);
    }

} catch (Exception $e) { //coloquei aqui caso der erro, temos que saber o erro né mateus 😎

    echo "<h1>funfo nn</h1>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>