player = 0;
placar1 = 0;
placar2 = 0;
player1 = [];
player2 = [];

$(".campo").click(function(){

    if ($(this).html() == ""){
        switch(player){
            case 1:
                player = 0;
                break;
            case 0:
                player = 1;
                break;
        }
    
        var id = $(this).attr("id");

        console.log(id);
    
        $(this).html(escrever(player));
    
        jogada(player, id);
    }
});

function bolax(c){
    switch (c) {
        case 0:
            return false;
        case 1:
            return true;
    }
}

function escrever(c){
    
    if (!bolax(c)) {
        letra = "O";
    }else {
        letra = "X";
    }
    
    return letra;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function jogada(jogador, coordenada) {
    if (bolax(jogador)){
        // jogador 1
        player1.push(coordenada);
        await sleep(20);
        if (verificaVitoria(player1)) {
            if (window.confirm("Jogador 1 venceu!")) {
                resetaGame(1);
            }
        }
    }else {
        // jogador 2
        player2.push(coordenada);
        await sleep(20);
        if (verificaVitoria(player2)) {
            if (window.confirm("Jogador 2 venceu!")) {
                resetaGame(2);
            }
        }
    }
}

function verificaVitoria(jogadas) {

    condicoes_vitoria = [
        ['a2', 'b2', 'c2'], // 2+5+8 = 15
        ['a1', 'b1', 'c1'], // 1+4+7 = 12
        ['a3', 'b3', 'c3'], // 3+6+9 = 18
        ['a1', 'a2', 'a3'], // 1+2+3 = 6
        ['b1', 'b2', 'b3'], // 4+5+6 = 15
        ['c1', 'c2', 'c3'], // 7+8+9 = 24
        ['a1', 'b2', 'c3'], // 1+5+9 = 15
        ['a3', 'b2', 'c1'] // 3+5+7 = 15
    ];

    if (jogadas.length > 2 && jogadas.length <= 5) {
        for (x = 0; x < condicoes_vitoria.length; x++){
            filtro = condicoes_vitoria[x].filter(a => jogadas.includes(a));

            if (filtro.length === 3) {
                return true;
            }else if (jogadas.length === 5 && filtro.length < 3){
                resetaGame(3);
            }
        }
    }

}

function pontuar(n){
    switch (n){
        case 1:
            placar1 += 1;
            $("#pontos1").html(placar1);
            break;
        case 2:
            placar2 += 1;
            $("#pontos2").html(placar2);
            break;
    }
}

function resetaGame(n) {
    $(".campo").html("");
    
    if (n === 3) {
        alert("Deu velha!");
    }else{
        pontuar(n);
    }
    player = 0;
    player1 = [];
    player2 = [];
}