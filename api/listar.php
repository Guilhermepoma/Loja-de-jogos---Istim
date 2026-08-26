<?php
require_once "conexao.php";

//lista com base no que a voz da minha cabeça falou
$sql = "SELECT * FROM jogos";
$resultado = $conn->query($sql);


$jogos = [];
if ($resultado && $resultado->num_rows > 0) {
    while($row = $resultado->fetch_assoc()) {
        $jogos[] = $row;
    }
}

echo json_encode($jogos);

$conn->close();
?>