<?php

$db = new SQLite3('../database/loja.db');

echo "<h1>Teste de Registo</h1>";

$nome = $_POST["nome"];
$email = $_POST["email"];
$password = $_POST["password"];

echo "Nome: " . $nome . "<br>";
echo "Email: " . $email . "<br>";
echo "Password: " . $password . "<br>";

$sql = "INSERT INTO utilizadores (nome, email, password)
        VALUES ('$nome', '$email', '$password')";

if ($db->exec($sql)) {
    echo "<br><strong>Utilizador registado com sucesso!</strong>";
} else {
    echo "<br><strong>Erro ao registar utilizador.</strong>";
}

?>