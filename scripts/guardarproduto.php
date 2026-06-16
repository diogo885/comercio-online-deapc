<?php

require_once "conexao.php";

$stmt = $db->prepare("
    INSERT INTO produtos (nome, descricao, preco, stock)
    VALUES (:nome, :descricao, :preco, :stock)
");

$stmt->bindValue(":nome", "T-Shirt Preta", SQLITE3_TEXT);
$stmt->bindValue(":descricao", "100% Algodão", SQLITE3_TEXT);
$stmt->bindValue(":preco", 19.99, SQLITE3_FLOAT);
$stmt->bindValue(":stock", 20, SQLITE3_INTEGER);

$stmt->execute();

echo "Produto inserido com sucesso.";

?>