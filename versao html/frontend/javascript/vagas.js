async function getInfosCardsIniciais() {
    const paginasParaCarregar = {
        'numeroDaPagina': '1'
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paginasParaCarregar)
    };

    const response = await fetch('http://localhost:3005/vagas/historico', config);
    return await response.json();

}


async function pegarDadosDoUsuario() {

    const config = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'

        },
    };

    const response = await fetch('http://localhost:3005/feed', config);
    return await response.json();

}


// add nome do usuario
// document.addEventListener('DOMContentLoaded', async function () {
//     try {
//         const result = await pegarDadosDoUsuario();
//         const nomeUsuario = result['dadosRetornados']['nome'];
//             const nomeUsuarioElement = document.getElementById('nome-usuario');
//             nomeUsuarioElement.textContent = await nomeUsuario ;

//     } catch (error) {
//         console.error('Erro ao obter o nome do usuário:', error);
//         return null;
//     }
// });




function insereNovoElementoNoClone(seletor, cardClone, novoElemento) {
    const nameElement = cardClone.querySelector(seletor);
    nameElement.textContent = novoElemento;
}

function curtir(cardClone, id) {
    const btnCurtirElement = cardClone.querySelector("#btn-curtir");

    btnCurtirElement.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log('curtido', id);

    });
}


function addInfosSobreDemanda(paginacao) {

// Adicione o event listener ao objeto window
window.addEventListener('scroll', async function () {
    // Verifique se o usuário alcançou o final da página
    if (window.innerHeight + 
        window.scrollY >= document.body.offsetHeight - 100
        && paginacao > 1) {
        try {
            // Chame a função getInfosCardsIniciais() para carregar os novos resultados
            const result = await getInfosCardsIniciais();
            // Manipule os resultados como desejar
            console.log(result);
        } catch (error) {
            console.error('Erro ao carregar novos resultados:', error);
        }
    }
});
}

function renderInfosVagas() {
    const feedContainer = document.getElementById('id-feed');

    // Verifique se o feedContainer existe
    if (!feedContainer) {
        console.error('Elemento #feed não encontrado!');
        return;
    }

    getInfosCardsIniciais().then(result => {
        // Manipula a resposta da requisição
        // console.log(result['cardsRetornados']);
        const dadosDosCardsDaApi = result
        console.log(dadosDosCardsDaApi);
        // Itere pelos nomes e gere os templates
        dadosDosCardsDaApi.forEach((itemDaApi) => {
            // Clone o template do card
            const cardTemplate = document.getElementById('card-template');
            const cardClone = cardTemplate.content.cloneNode(true);

            const selecionarIdDoCard = cardClone.querySelector("#id-vagas");

            selecionarIdDoCard.setAttribute("id", itemDaApi.id);
            insereNovoElementoNoClone('p', cardClone, itemDaApi.tituloVaga)


            insereNovoElementoNoClone('#id-numero-candidatos', cardClone, '999')
            insereNovoElementoNoClone('#id-data', cardClone, itemDaApi.date_time)


            // insereNovoElementoNoClone('h3', cardClone, itemDaApi.nome)

            // curtir(cardClone, selecionarIdDoCard.id)


            // Adicione o card clonado ao container do feed
            feedContainer.appendChild(cardClone);
        });
    })
        .catch(error => {
            // Trata erros de rede ou outras falhas na requisição
            console.error('Erro na requisição:', error);
        });



    // Busque os nomes da API ou use nomes estáticos para testar
    // const names = ['Fulano 1', 'Fulano 2', 'Fulano 3'];

}
