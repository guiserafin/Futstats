/**
 * Arquivo onde ficarão as funções que trarão as informações da API
 * chave da API = 4a7d28e3ff0b8bb527cfd5267e3195b1173342cefeec4ec35d31300116398c48
 */

var apiKey = '4a7d28e3ff0b8bb527cfd5267e3195b1173342cefeec4ec35d31300116398c48';


//Funcao que mostra os jogos acontecendo ao vivo (aparecerá no Home)
//vai receber como parametro o id das ligas que iremos mostrar os jogos
//serao 5 ligas - Brasileirão (BRA), Premier League(ING), Serie A (ITA), Bundesliga(ALE) e La Liga(ESP)
// ID das ligas - BRA = 99 ING = 152 ITA = 207 ALE = 171 ESP = 302
function getJogosAoVivo(prLigaId){

    //match_live=1
    fetch('https://apiv3.apifootball.com/?action=get_events&from=2023-05-01&to=2023-05-30&league_id=' + prLigaId + '&APIkey=' + apiKey)
    .then((resp) => resp.json())
    .then(function(data){

        
        let divDados = document.getElementById('aoVivo');


        //gambiarra pra quando não souber se vem json puro
        //ou array de jsons, mudar no futuro pra nao usar try catch
        try{
            for (game of data){

                data = game;

            }

        }catch{
            console.log('Not an array');
        }
        console.log(data);
        
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
    aLigasId = [99, 152, 207, 171, 302];
    
    for (ligaId of aLigasId) {
    
        getJogosAoVivo(ligaId)
    }
}

showJogosAoVivo();