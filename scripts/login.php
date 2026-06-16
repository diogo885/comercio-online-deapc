<?php

require_once "conexao.php";

echo "<h1>Teste Login</h1>";

$email = $_POST["email"];
$password = $_POST["password"];

echo "Email: " . $email . "<br>";
echo "Password: " . $password . "<br>";

?>