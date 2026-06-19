function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho') || '[]');
}

function guardarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarCarrinho(nomeProduto, preco, imagem, quantidade = 1, tamanho = 'M') {
    const carrinho = getCarrinho();
    const chaveItem = `${nomeProduto}-${tamanho}`;
    const itemExistente = carrinho.find(item => item.chave === chaveItem);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            chave: chaveItem,
            nome: nomeProduto,
            preco: preco,
            imagem: imagem,
            quantidade: quantidade,
            tamanho: tamanho
        });
    }

    guardarCarrinho(carrinho);
    atualizarCarrinho();
    alert(nomeProduto + " adicionado ao carrinho.");
}

function removerDoCarrinho(chaveProduto) {
    let carrinho = getCarrinho().filter(item => item.chave !== chaveProduto);
    guardarCarrinho(carrinho);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinho = getCarrinho();
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems || !cartTotal) {
        return;
    }

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">O seu carrinho está vazio.</p>';
        cartTotal.textContent = 'Total: 0,00€';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.imagem}" alt="${item.nome}">
                <div>
                    <h4>${item.nome}</h4>
                    <p>Tamanho: ${item.tamanho}</p>
                    <p>${item.quantidade} x ${item.preco.toFixed(2)}€</p>
                </div>
            </div>
            <button class="remove-btn" onclick="removerDoCarrinho('${item.chave}')">Remover</button>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = `Total: ${total.toFixed(2).replace('.', ',')}€`;
}

window.addEventListener('DOMContentLoaded', atualizarCarrinho);

// Funções para Modal de Pagamento
function mostrarFormularioPagamento() {
    const carrinho = getCarrinho();
    if (carrinho.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
    }
    document.getElementById('modalPagamento').style.display = 'block';
}

function fecharModalPagamento() {
    document.getElementById('modalPagamento').style.display = 'none';
}

function mostrarModalSucesso(total) {
    const mensagem = `Obrigado pela sua compra! Total: ${total}€<br>Receberá um email de confirmação em breve.`;
    document.getElementById('mensagemSucesso').innerHTML = mensagem;
    document.getElementById('modalSucesso').style.display = 'block';
}

function voltarAoPrincipio() {
    localStorage.removeItem('carrinho');
    window.location.href = 'produtos.html';
}

// Fechar modal ao clicar fora dela
window.onclick = function(event) {
    const modalPagamento = document.getElementById('modalPagamento');
    const modalSucesso = document.getElementById('modalSucesso');
    
    if (event.target == modalPagamento) {
        modalPagamento.style.display = 'none';
    }
    if (event.target == modalSucesso) {
        modalSucesso.style.display = 'none';
    }
};

// Adicionar listener ao formulário de pagamento
document.addEventListener('DOMContentLoaded', function() {
    const formPagamento = document.getElementById('formPagamento');
    if (formPagamento) {
        formPagamento.addEventListener('submit', function(e) {
            e.preventDefault();
            processarPagamento();
        });
    }
});

function processarPagamento() {
    // Validar campos do formulário
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const emailCliente = document.getElementById('emailCliente').value.trim();
    const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
    const morada = document.getElementById('morada').value.trim();
    const codigoPostal = document.getElementById('codigoPostal').value.trim();
    const numeroCartao = document.getElementById('numeroCartao').value.trim().replace(/\s/g, '');
    const validade = document.getElementById('validade').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Validações básicas
    if (!nomeCliente || !emailCliente || !telefoneCliente || !morada || !codigoPostal) {
        alert('Por favor, preencha todos os campos de endereço.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCliente)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    if (!/^\d{16}$/.test(numeroCartao)) {
        alert('O número do cartão deve ter 16 dígitos.');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(validade)) {
        alert('A validade deve estar no formato MM/AA.');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('O CVV deve ter 3 dígitos.');
        return;
    }

    // Obter total do carrinho
    const carrinho = getCarrinho();
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });

    // Dados de pagamento
    const dadosPagamento = {
        nomeCliente: nomeCliente,
        emailCliente: emailCliente,
        telefoneCliente: telefoneCliente,
        morada: morada,
        codigoPostal: codigoPostal,
        numeroCartao: numeroCartao.slice(-4).padStart(16, '*'), // Apenas últimos 4 dígitos
        total: total.toFixed(2),
        itens: carrinho,
        data: new Date().toISOString()
    };

    // Enviar para o servidor
    fetch('scripts/finalizarcompra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPagamento)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            fecharModalPagamento();
            mostrarModalSucesso(total.toFixed(2).replace('.', ','));
        } else {
            alert('Erro ao processar o pagamento: ' + data.mensagem);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao processar o pagamento. Tente novamente.');
    });
}

// Funções para Modal de Sobre Nós
function mostrarSobreNos() {
    document.getElementById('modalSobreNos').style.display = 'block';
}

function fecharSobreNos() {
    document.getElementById('modalSobreNos').style.display = 'none';
}

// Fechar modal de Sobre Nós ao clicar fora
window.addEventListener('click', function(event) {
    const modalSobreNos = document.getElementById('modalSobreNos');
    if (modalSobreNos && event.target == modalSobreNos) {
        modalSobreNos.style.display = 'none';
    }
});