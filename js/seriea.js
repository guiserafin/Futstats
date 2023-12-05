document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'https://apiv3.apifootball.com/';
    const apiKey = '4a7d28e3ff0b8bb527cfd5267e3195b1173342cefeec4ec35d31300116398c48';

    // Função para buscar a tabela da Bundesliga
    function fetchBrasileiraoTable() {
        fetch(`${baseUrl}/?action=get_standings&league_id=207&APIkey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const tableData = data;
                const tbody = document.querySelector('#tabela-brasileirao tbody');
                tableData.forEach((team, index) => {
                    const row = document.createElement('tr');
                    row.classList.add('sla');
                    const statsClass = calculateStatsClass(index);
                    console.log(team);
                    row.innerHTML = `
                        <td class="stats-${statsClass}"> </td>
                        <td>${index + 1}</td>
                        <td class="t-align-left"><img style="width:30px; vertical-align:middle" src="${team.team_badge}"></img>  ${team.team_name}</td>
                        <td>${team.overall_league_PTS}</td>
                        <td>${team.overall_league_W}</td>
                        <td>${team.overall_league_D}</td>
                        <td>${team.overall_league_L}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    // Chamada inicial para preencher a tabela
    fetchBrasileiraoTable();

    // Função para calcular a classe com base no índice
    function calculateStatsClass(index) {
        if (index + 1 < 5) {
            return 1;
        } else if (index + 1 == 5) {
            return 2;
        } else if (index + 1 >= 18) {
            return 3;
        } else {
            return 0; // Retorna 0 para outros casos
        }
    }
});

