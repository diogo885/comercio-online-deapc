<?php

echo "<h1>Teste de Registo</h1>";

$nome = $_POST["nome"];
$email = $_POST["email"];
$password = $_POST["password"];

echo "Nome: " . $nome . "<br>";
echo "Email: " . $email . "<br>";
echo "Password: " . $password . "<br>";

?>