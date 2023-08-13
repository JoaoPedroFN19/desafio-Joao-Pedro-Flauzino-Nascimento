const metodoDePagamento = {
    debito: {
        nome: 'Débito',
        acrescimo: 0
    },
    credito: {
        nome: 'Crédito',
        acrescimo: 0.03
    },
    dinheiro: {
        nome: 'Dinheiro',
        acrescimo: -0.05
    }
};

export { metodoDePagamento };
