<?php
require_once "conexao.php";

$id = $_POST['id'];

$sql  = "DELETE FROM jogos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>