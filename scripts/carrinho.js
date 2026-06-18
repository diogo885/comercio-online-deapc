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