<?php

$db = new SQLite3("../database/loja.db");

if (!$db) {
    die("Erro ao ligar à base de dados.");
}

?>