function sortear() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const de = parseInt(document.getElementById('de').value);
    const ate = parseInt(document.getElementById('ate').value);
    const botaoSortear = document.getElementById('btn-sortear');

    console.log(`[debug] O valor de 'quantidade' é: ${quantidade}`);
    console.log(`[debug] O valor de 'de' é: ${de}`);
    console.log(`[debug] O valor de 'ate' é: ${ate}`);

    // Validações
    if (Number.isNaN(quantidade) || Number.isNaN(de) || Number.isNaN(ate)) {
        console.log('[debug] Entrada inválida: algum campo não é número.');
        alterarTexto('Preencha todos os campos com números válidos.');
        return;
    }

    if (de > ate) {
        console.log('[debug] Validação falhou: "de" não pode ser maior que "até".');
        alterarTexto(`Valor inválido: "de" (${de}) não pode ser maior que "até" (${ate}).`);
        return;
    }

    const totalPossivel = ate - de + 1;
    console.log(`[debug] Total possível de números únicos no intervalo: ${totalPossivel}`);

    if (quantidade < 1) {
        console.log('[debug] Validação falhou: quantidade mínima é 1.');
        alterarTexto('A quantidade deve ser pelo menos 1.');
        return;
    }

    if (quantidade > totalPossivel) {
        console.log('[debug] Validação falhou: quantidade maior que o total possível.');
        alterarTexto(`Não é possível sortear ${quantidade} números únicos de ${de} até ${ate}. Máximo permitido: ${totalPossivel}.`);
        return;
    }

    const sorteados = [];
    while (sorteados.length < quantidade) {
        const numero = obterNumeroAleatorio(de, ate);
        console.log(`[debug] Gerado número aleatório: ${numero}`);

        if (!sorteados.includes(numero)) {
            sorteados.push(numero);
            console.log(`[debug] Número adicionado: ${numero}`);
        } else {
            console.log(`[debug] Número repetido (${numero}), ignorado.`);
        }
    }

    sorteados.sort((a, b) => a - b);
    console.log(`[debug] Números sorteados em ordem crescente: ${sorteados.join(', ')}`);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${sorteados.join(', ')}</label>`;

    alterarStatusBotao(); // habilita o botão "reiniciar"
    desabilitarBotaoSortear(botaoSortear); // desabilita o botão "sortear"
}

function obterNumeroAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao() {
    const botao = document.getElementById('btn-reiniciar');
    if (botao.classList.contains('container__botao-desabilitado')) {
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
    } else {
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');
    }
}

function desabilitarBotaoSortear(botao) {
    console.log('[debug] Botão "Sortear" desabilitado após o sorteio.');
    botao.disabled = true;
    botao.classList.add('container__botao-desabilitado');
}

function habilitarBotaoSortear() {
    const botao = document.getElementById('btn-sortear');
    console.log('[debug] Botão "Sortear" reabilitado.');
    botao.disabled = false;
    botao.classList.remove('container__botao-desabilitado');
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML =
        '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';

    alterarStatusBotao(); // volta o botão reiniciar ao estado original
    habilitarBotaoSortear(); // reativa o botão sortear
}

function alterarTexto(mensagem) {
    const resultado = document.getElementById('resultado');
    console.log(`[debug] Mensagem ao usuário: ${mensagem}`);
    resultado.innerHTML = `<label class="texto__paragrafo" style="color:#c0392b">${mensagem}</label>`;
}
