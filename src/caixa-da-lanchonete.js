import { cardapio } from './cardapio.js';
import { metodoDePagamento } from './metodoDePagamento.js';

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        // Verificar se o método de pagamento é válido
        if (!metodoDePagamento.hasOwnProperty(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Inicializar o valor total da compra
        let valorTotal = 0;

        // Inicializar variáveis para verificar a quantidade de itens
        let quantidadeItens = 0;
        let quantidadePrincipal = {};

        // Iterar pelos itens da compra
        for (const itemInfo of itens) {
            const [item, quantidade] = itemInfo.split(',');

            // Verificar se o código do item é válido
            if (!cardapio.hasOwnProperty(item)) {
                return "Item inválido!";
            }

            // Verificar se o item é um extra ou principal
            if (item === 'chantily' || item === 'queijo') {
                if (!quantidadePrincipal[item]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                quantidadePrincipal[item] -= parseInt(quantidade);
            } else {
                quantidadePrincipal[item] = (quantidadePrincipal[item] || 0) + parseInt(quantidade);
            }

            // Adicionar ao valor total o preço do item multiplicado pela quantidade
            valorTotal += cardapio[item] * parseInt(quantidade);
            quantidadeItens += parseInt(quantidade);
        }

        // Verificar se a quantidade de itens é válida
        if (quantidadeItens === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Verificar se a quantidade de itens principais é válida
        for (const [item, quantidade] of Object.entries(quantidadePrincipal)) {
            if (quantidade > 0) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        // Aplicar desconto ou acréscimo no método de pagamento
        valorTotal *= 1 + metodoDePagamento[metodoDePagamento].acrescimo;

        // Formatar o valor total da compra
        const valorFormatado = valorTotal.toFixed(2);

        // Retornar o valor formatado
        return `R$ ${valorFormatado}`;
    }
}

export { CaixaDaLanchonete };
