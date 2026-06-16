<?php

require_once "conexao.php";

$resultado = $db->query("SELECT * FROM produtos");

while ($produto = $resultado->fetchArray(SQLITE3_ASSOC)) {

    echo "<h3>" . $produto["nome"] . "</h3>";
    echo "Descrição: " . $produto["descricao"] . "<br>";
    echo "Preço: " . $produto["preco"] . " €<br>";
    echo "Stock: " . $produto["stock"] . "<br><br>";

}

?>