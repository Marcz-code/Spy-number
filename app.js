let numerosSorteados = [];
let numeroLimite = 10000; // O NÚMERO LIMITE É USADO PARA DEFINIR O LIMITE DE NÚMEROS SORTEADOS, QUANDO BATER ESSE LIMITE ZERA, A FUNÇÃO TEM QUE SER CHAMADA ANTES DA FUNÇÃO GERAR NÚMERO ALEATÓRIO PARA VER SE O LIMITE FOI BATIDO, SE SIM, ZERA A LISTA DE NÚMEROS SORTEADOS
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate: 0.8});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();
// VERIFICARCHUTE É CHAMADA QUANDO O USUÁRIO CLICA NO BOTÃO DE VERIFICAR, ENTÃO O NOME DA FUNÇÃO PODE SER QUALQUER UM, DESDE QUE SEJA REFERENCIADO NO HTML
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
// A FUNÇÃO GERAR NÚMERO ALEATÓRIO É CHAMADA PARA GERAR O NÚMERO SECRETO, ELA VERIFICA SE O NÚMERO GERADO JÁ FOI SORTEADO ANTES, SE SIM, ELA CHAMA A SI MESMA PARA GERAR UM NOVO NÚMERO, SE NÃO, ELA ADICIONA O NÚMERO À LISTA DE NÚMEROS SORTEADOS E RETORNA O NÚMERO GERADO
function gerarNumeroAleatorio() {
   let quantidadeNumerosSorteados = numerosSorteados.length;
   if(quantidadeNumerosSorteados == numeroLimite) {
         numerosSorteados = [];
    }


   let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
   console.log(numeroGerado);
   if (numerosSorteados.includes(numeroGerado)) {
       return gerarNumeroAleatorio();
   } else {
   numerosSorteados.push(numeroGerado);
   console.log(numerosSorteados);
   return numeroGerado;
   // RETURN FINALIZA A FUNÇÃO PARA GERAR O NÚMERO ALEATÓRIO E VER SE ELE JÁ FOI SORTEADO
   }
}
// A FUNÇÃO LIMPAR CAMPO É CHAMADA PARA LIMPAR O CAMPO DE INPUT APÓS CADA CHUTE, PARA QUE O USUÁRIO POSSA DIGITAR UM NOVO NÚMERO SEM PRECISAR APAGAR O ANTERIOR
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
// A FUNÇÃO REINICIAR JOGO É CHAMADA QUANDO O USUÁRIO CLICA NO BOTÃO DE REINICIAR, ENTÃO O NOME DA FUNÇÃO PODE SER QUALQUER UM, DESDE QUE SEJA REFERENCIADO NO HTML
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
