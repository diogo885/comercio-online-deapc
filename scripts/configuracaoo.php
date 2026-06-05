<?php

$db = new SQLite3('../database/loja.db');

if(!$db){
    die("Erro na ligação à base de dados");
}

?>