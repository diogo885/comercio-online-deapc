<?php

require_once "conexao.php";

$resultado = $db->query("SELECT * FROM utilizadores");

while ($linha = $resultado->fetchArray(SQLITE3_ASSOC)) {

    echo "ID: " . $linha["id_utilizador"] . "<br>";
    echo "Nome: " . $linha["nome"] . "<br>";
    echo "Email: " . $linha["email"] . "<br><br>";

}

?>