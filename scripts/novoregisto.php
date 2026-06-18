<?php

require_once "conexao.php";

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($nome === "" || $email === "" || $password === "") {
    header("Location: ../index.html");
    exit;
}

$stmt = $db->prepare(
    "INSERT INTO utilizadores (nome, email, password) VALUES (:nome, :email, :password)"
);
$stmt->bindValue(":nome", $nome, SQLITE3_TEXT);
$stmt->bindValue(":email", $email, SQLITE3_TEXT);
$stmt->bindValue(":password", $password, SQLITE3_TEXT);

if ($stmt->execute()) {
    header("Location: ../index.html");
    exit;
} else {
    header("Location: ../index.html");
    exit;
}

?>