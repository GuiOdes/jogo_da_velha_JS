player = 0;
placar1 = 0;
placar2 = 0;
player1 = [];
player2 = [];

function validaPlayers() {
    p1 = $("#player1").val();
    p2 = $("#player2").val();
    if (p1 == "" || p2 == "") {
        $("#erro").css("display", "block");
    }else {
        $("#modalPlayers").modal("hide");
        trocaNomes(p1, p2);
    }
    return "oi";
}

function trocaNomes(p1, p2){
    $("#placar1").html(p1);
    $("#placar2").html(p2);
}

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
        verificaVitoria(1, player1);
    }else {
        // jogador 2
        player2.push(coordenada);
        await sleep(20);
        verificaVitoria(2, player2);
    }
}

function verificaVitoria(jogador, jogadas) {

    condicoes_vitoria = [
        ['a2', 'b2', 'c2'],
        ['a1', 'b1', 'c1'],
        ['a3', 'b3', 'c3'],
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1']
    ];

    if (jogadas.length > 2 && jogadas.length <= 5) {
        for (x = 0; x < condicoes_vitoria.length; x++){
            filtro = condicoes_vitoria[x].filter(a => jogadas.includes(a));

            if (filtro.length === 3) {
                pontuar(jogador);
                return true;
            }else if (jogadas.length === 5 && filtro.length < 3){
                if (window.confirm("Deu velha!")) {
                    resetaGame();
                    break;
                }
            }
        }
    }
    
}

function pontuar(n){
    switch (n){
        case 1:
            placar1 += 1;
            $("#pontos1").html(placar1);
            if (window.confirm("Jogador 1 venceu!")) {
                resetaGame();
            }
        break;

        case 2:
            placar2 += 1;
            $("#pontos2").html(placar2);
            if (window.confirm("Jogador 2 venceu!")) {
                resetaGame();
            }
        break;
    }
    resetaGame();
}

function resetaGame() {
    $(".campo").html("");

    player = 0;
    player1 = [];
    player2 = [];
}