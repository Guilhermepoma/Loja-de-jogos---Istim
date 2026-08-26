<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "istim";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Erro na conexão: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8");
?>