<?php

require_once "conexao.php";

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
    $stmt = $db->prepare("SELECT * FROM produtos WHERE id_produto = :id");
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $resultado = $stmt->execute();
    $produto = $resultado->fetchArray(SQLITE3_ASSOC);

    if ($produto) {
        header('Content-Type: application/json');
        echo json_encode($produto, JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['erro' => 'Produto não encontrado']);
    }
} else {
    $resultado = $db->query("SELECT * FROM produtos");

    while ($produto = $resultado->fetchArray(SQLITE3_ASSOC)) {
        echo "<h3>" . $produto["nome"] . "</h3>";
        echo "Descrição: " . $produto["descricao"] . "<br>";
        echo "Preço: " . $produto["preco"] . " €<br>";
        echo "Stock: " . $produto["stock"] . "<br><br>";
    }
}

?>