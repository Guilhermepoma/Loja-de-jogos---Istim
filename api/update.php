<?php
require_once "conexao.php";

$id        = $_POST['id'];
$nome      = $_POST['nome'];
$descricao = $_POST['descricao'];
$valor     = $_POST['valor'];
$img       = $_POST['img'];

//reddit salvou aqui
$sql  = "UPDATE jogos SET nome = ?, descricao = ?, valor = ?, img = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdsi", $nome, $descricao, $valor, $img, $id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>