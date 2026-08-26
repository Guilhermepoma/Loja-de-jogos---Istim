<?php
require_once "conexao.php";

//pegar os inputs do html, nn sabia se era aqui ou no js, botei aqui ai ter que ver com o felipe amanha
$nome = $_POST['nome'];
$descricao = $_POST['descricao'];
$valor = $_POST['valor'];
$img = $_POST['img'];

$sql = "INSERT INTO jogos (nome, descricao, valor, img) VALUES ('$nome', '$descricao', $valor, '$img')";

if ($conn->query($sql)) {
    echo "success";
} else {
    echo "error";
}

$conn->close();
?>