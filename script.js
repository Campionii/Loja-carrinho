const itensCarrinho = {};
let precoTotal = 0; // Adicione esta linha para declarar e inicializar a variável precoTotal

function addCarrinho(itemNome, itemPreco) {
    if (itensCarrinho[itemNome]) {
        itensCarrinho[itemNome].quantidade++;
        itensCarrinho[itemNome].precoTotal += itemPreco;
        itensCarrinho[itemNome].liItem.querySelector(".quantidade").innerHTML = itensCarrinho[itemNome].quantidade;
        itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2);
    } else {
        const liItem = document.createElement("li");
        liItem.innerHTML = `
            <div class="item">
                <span>${itemNome}</span>
                <button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})"><b><</b></button>
                <span class="quantidade">1</span>
                <button class="add" onclick="addCarrinho('${itemNome}', ${itemPreco})"><b>></b></button>
                <span class="preco-total">R$${itemPreco.toFixed(2)}</span>
            </div>
        `;
        document.getElementById("itens-lista").appendChild(liItem);

        itensCarrinho[itemNome] = {
            quantidade: 1,
            precoTotal: itemPreco,
            liItem: liItem
        };
    }
    precoTotal += itemPreco; // Atualize o valor total
    document.getElementById("preco-total").innerHTML = "Total R$" + precoTotal.toFixed(2);
    updateCarrinho();
}

function removeCarrinho(itemNome, itemPreco) {
    if (itensCarrinho[itemNome]) {
        if (itensCarrinho[itemNome].quantidade > 1) {
            itensCarrinho[itemNome].quantidade--;
            itensCarrinho[itemNome].precoTotal -= itemPreco;
            itensCarrinho[itemNome].liItem.querySelector(".quantidade").innerHTML = itensCarrinho[itemNome].quantidade;
            itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2);
        } else {
            document.getElementById("itens-lista").removeChild(itensCarrinho[itemNome].liItem);
            delete itensCarrinho[itemNome];
        }
        precoTotal -= itemPreco; // Atualize o valor total
        document.getElementById("preco-total").innerHTML = "Total R$" + precoTotal.toFixed(2);
        updateCarrinho();
    }
}

function updateCarrinho() {
    let cont = 0;
    for (let item in itensCarrinho) {
        cont += itensCarrinho[item].quantidade;
    }
    document.getElementById("cont-carrinho").innerHTML = cont;
}

function limparCarrinho() {
    
    let itensCarrinho = {};
    precoTotal = 0;

    
    const listaCarrinho = document.getElementById("itens-lista");
    while (listaCarrinho.firstChild) {
        listaCarrinho.removeChild(listaCarrinho.firstChild);
    }

    document.getElementById("preco-total").innerHTML = "Total R$0.00";
    document.getElementById("cont-carrinho").innerHTML = "0";
}



