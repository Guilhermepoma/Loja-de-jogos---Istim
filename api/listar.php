<?php

require_once "conexao.php";

header("Content-Type: application/json");

$sql = "SELECT * FROM jogos";
$resultado = mysqli_query($conn, $sql);

$jogos = array();

if ($resultado) {

    while ($row = mysqli_fetch_assoc($resultado)) {
        $jogos[] = $row;
    }
    echo json_encode($jogos);

} else {
    echo json_encode(array(
        "erro" => "Erro na consulta"
    ));
}
mysqli_close($conn);
?>