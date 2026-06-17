<?php

session_start();
require_once "conexao.php";

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM utilizadores WHERE email = :email AND password = :password";

$stmt = $db->prepare($sql);
$stmt->bindValue(":email", $email, SQLITE3_TEXT);
$stmt->bindValue(":password", $password, SQLITE3_TEXT);

$result = $stmt->execute();
$user = $result->fetchArray(SQLITE3_ASSOC);

if ($user) {

    $agora = date("Y-m-d H:i:s");

    // atualizar último acesso
    $update = $db->prepare("
        UPDATE utilizadores 
        SET ultimo_acesso = :data 
        WHERE id_utilizador = :id
    ");

    $update->bindValue(":data", $agora, SQLITE3_TEXT);
    $update->bindValue(":id", $user["id_utilizador"], SQLITE3_INTEGER);
    $update->execute();

    $_SESSION["user_id"] = $user["id_utilizador"];
    $_SESSION["nome"] = $user["nome"];

    echo "Login efetuado com sucesso!<br>";
    echo "Último acesso atualizado: " . $agora;

} else {
    echo "Credenciais inválidas.";
}

?>