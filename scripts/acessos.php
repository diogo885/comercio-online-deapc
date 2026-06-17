<?php

require_once "conexao.php";

$sql = "SELECT nome, email, ultimo_acesso FROM utilizadores";

$result = $db->query($sql);

echo "<h2>Registo de acessos</h2>";

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {

    echo "Nome: " . $row["nome"] . "<br>";
    echo "Email: " . $row["email"] . "<br>";
    echo "Último acesso: " . $row["ultimo_acesso"] . "<br><br>";

}

?>