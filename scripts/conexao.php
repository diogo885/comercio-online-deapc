<?php

$dbPath = __DIR__ . "/../database/loja.db";
$db = new SQLite3($dbPath);

if (!$db) {
    die("Erro ao ligar à base de dados.");
}

?>