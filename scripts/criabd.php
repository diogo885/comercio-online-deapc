<?php

$db = new SQLite3('../database/loja.db');

$db->exec("
CREATE TABLE IF NOT EXISTS utilizadores (
    id_utilizador INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    password TEXT,
    telefone TEXT,
    morada TEXT,
    tipo_utilizador TEXT
)
");

$db->exec("
CREATE TABLE IF NOT EXISTS produtos (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    preco REAL,
    stock INTEGER,
    imagem TEXT,
    categoria_id INTEGER
)
");

echo "Base de dados criada com sucesso.";

?>