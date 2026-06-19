<?php
header('Content-Type: application/json');

// Receber dados JSON
$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos']);
    exit;
}

// Validar dados básicos
if (empty($dados['nomeCliente']) || empty($dados['emailCliente']) || empty($dados['total'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados obrigatórios em falta']);
    exit;
}

// Aqui pode adicionar lógica para guardar em base de dados
// Por enquanto, apenas confirmamos o pagamento

$resposta = [
    'sucesso' => true,
    'mensagem' => 'Pagamento processado com sucesso',
    'referencia' => 'PED-' . date('YmdHis') . '-' . rand(1000, 9999),
    'cliente' => $dados['nomeCliente'],
    'total' => $dados['total']
];

// Opcional: Guardar informações da compra em ficheiro de log
$log_data = [
    'timestamp' => date('Y-m-d H:i:s'),
    'cliente' => $dados['nomeCliente'],
    'email' => $dados['emailCliente'],
    'telefone' => $dados['telefoneCliente'],
    'morada' => $dados['morada'],
    'codigoPostal' => $dados['codigoPostal'],
    'total' => $dados['total'],
    'cartao_ultimos4' => $dados['numeroCartao'],
    'itens' => $dados['itens'],
    'referencia' => $resposta['referencia']
];

// Guardar log (crie uma pasta 'vendas' ou 'compras' se não existir)
if (!is_dir('../database/compras')) {
    mkdir('../database/compras', 0755, true);
}

file_put_contents(
    '../database/compras/compra_' . date('Ymd') . '.log',
    json_encode($log_data) . "\n",
    FILE_APPEND
);

echo json_encode($resposta);
?>
