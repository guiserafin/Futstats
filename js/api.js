/**
 * Arquivo onde ficarão as funções que trarão as informações da API
 * chave da API = 4a7d28e3ff0b8bb527cfd5267e3195b1173342cefeec4ec35d31300116398c48
 */

var apiKey = '4a7d28e3ff0b8bb527cfd5267e3195b1173342cefeec4ec35d31300116398c48';


//Funcao que mostra os jogos acontecendo ao vivo (aparecerá no Home)
//vai receber como parametro o id das ligas que iremos mostrar os jogos
//serao 5 ligas - Brasileirão (BRA), Premier League(ING), Serie A (ITA), Bundesliga(ALE) e La Liga(ESP)
// ID das ligas - BRA = 99 ING = 152 ITA = 207 ALE = 175 ESP = 302
function getJogosAoVivo(prLigaId){

    let date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();

    // we will display the date as YYYY-MM-DD 
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    let url = `https://apiv3.apifootball.com/?action=get_events&from=${currentDate}&to=${currentDate}&league_id=` + prLigaId + '&APIkey=' + apiKey + "&match_live=1";
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){

        
        let divDados = document.getElementById('aoVivo');

        //gambiarra pra quando não souber se vem json puro
        //ou array de jsons, mudar no futuro pra nao usar try catch
        try{
            for (game of data){

                data = game;

                if (data.error == undefined){

                    divDados.innerHTML +=`<div class="card-jogo w80">
                            
                                        <div class="time-home">
                                            
                                            <img src="`+data.team_home_badge+`">
                                            
                                            <p>`+data.match_hometeam_name+`</p>
                                        </div>
            
                                        <div class="infos d-flex">
                                            <div class="liga">
                                                <!-- Logo da liga -->
                                                <img src="`+data.league_logo+`">
                                            </div>
                                            <div class="placar d-flex">
            
                                                <div class="placar-home">
                                                    <span>`+data.match_hometeam_score+`</span>
                                                </div>
                                                <span>&nbsp;X&nbsp;</span>
                                                <div class="placar-away">
                                                    <span>`+data.match_awayteam_score+`</span>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div class="time-away">
                                            <!--Logo do time de fora-->
                                            <img src="`+data.team_away_badge+`">
                                            <!--Nome do time de fora-->
                                            <p>`+data.match_awayteam_name+`</p>
                                        </div>
            
                                    </div>`;
                }
            }

        }catch{
            console.log('Not an array');
        }
        
        
    })
    .catch()
    {
        console.log('erro');
    }
}

//so faz a chamda da função getJogosAoVivo, mas coloquei em função pra
//deixar o código mais organizado
function showJogosAoVivo(){
    //Array com o ID das ligas para fazer o for e mostrar liga a liga
    //(pelo que eu li na documentação, nao da pra passar mais de um id de liga por vez)
    aLigasId = [99, 152, 207, 175, 302];
    
    for (ligaId of aLigasId) {
    
        getJogosAoVivo(ligaId)
        getJogos7Dias(ligaId)
    }
}

function getJogos7Dias(prLigaId){

    // Obter a data atual
    let dataAtual = new Date();

    let data7diasAtras = new Date();

    // Subtrair 7 dias
    data7diasAtras.setDate(data7diasAtras.getDate() - 7);

    // Formatar a data no formato YYYY-MM-DD
    let ano = dataAtual.getFullYear();
    let mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2); // Os meses são indexados de 0 a 11
    let dia = ('0' + dataAtual.getDate()).slice(-2);

    let ano7diasAtras = data7diasAtras.getFullYear();
    let mes7diasAtras = ('0' + (data7diasAtras.getMonth() + 1)).slice(-2);
    let dia7diasAtras = ('0' + data7diasAtras.getDate()).slice(-2);

    let dataHoje = ano + '-' + mes + '-' + dia;
    let dataSemanaPassada = ano7diasAtras + '-' + mes7diasAtras + '-' + dia7diasAtras;


    let url = `https://apiv3.apifootball.com/?action=get_events&from=${dataSemanaPassada}&to=${dataHoje}&league_id=` + prLigaId + '&APIkey=' + apiKey;

    console.log(url)
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){

        
        let divDados = document.getElementById('jogosSemana');

        //gambiarra pra quando não souber se vem json puro
        //ou array de jsons, mudar no futuro pra nao usar try catch
        try{
            for (game of data){

                data = game;

                if (data.error == undefined){

                    divDados.innerHTML +=`<div class="card-jogo w80">
                            
                                        <div class="time-home">
                                            
                                            <img src="`+data.team_home_badge+`">
                                            
                                            <p>`+data.match_hometeam_name+`</p>
                                        </div>
            
                                        <div class="infos d-flex">
                                            <div class="liga">
                                                <!-- Logo da liga -->
                                                <img src="`+data.league_logo+`">
                                            </div>
                                            <div class="placar d-flex">
            
                                                <div class="placar-home">
                                                    <span>`+data.match_hometeam_score+`</span>
                                                </div>
                                                <span>&nbsp;X&nbsp;</span>
                                                <div class="placar-away">
                                                    <span>`+data.match_awayteam_score+`</span>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div class="time-away">
                                            <!--Logo do time de fora-->
                                            <img src="`+data.team_away_badge+`">
                                            <!--Nome do time de fora-->
                                            <p>`+data.match_awayteam_name+`</p>
                                        </div>
            
                                    </div>`;
                }

            }

        }catch{
            console.log('Not an array');
        }
        
        
    })
    .catch()
    {
        console.log('erro');
    }

}

showJogosAoVivo();