<?php

require_once "conexao.php";

echo "<h1>Teste de Registo</h1>";

$nome = $_POST["nome"];
$email = $_POST["email"];
$password = $_POST["password"];

echo "Nome: " . $nome . "<br>";
echo "Email: " . $email . "<br>";
echo "Password: " . $password . "<br>";

// SQL (ainda versão simples como tinhas)
$sql = "INSERT INTO utilizadores (nome, email, password)
        VALUES ('$nome', '$email', '$password')";

if ($db->exec($sql)) {
    echo "<br><strong>Utilizador registado com sucesso!</strong>";
} else {
    echo "<br><strong>Erro ao registar utilizador.</strong>";
}

?>