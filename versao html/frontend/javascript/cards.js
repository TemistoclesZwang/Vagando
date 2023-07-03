async function getInfosCardsIniciais() {
    const login = {
        'numeroDaPagina': '1'
    };

    const config = {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    };

    const response = await fetch('http://localhost:3005/feed/pagina', config);

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
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const result = await pegarDadosDoUsuario();
        const nomeUsuario = result['dadosRetornados']['nome'];
            const nomeUsuarioElement = document.getElementById('nome-usuario');
            nomeUsuarioElement.textContent = await nomeUsuario ;
        
    } catch (error) {
        console.error('Erro ao obter o nome do usuário:', error);
        return null;
    }
});




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


function renderInfosCards() {
    const feedContainer = document.getElementById('id-feed');

    if (!feedContainer) {
        console.error('Elemento #feed não encontrado!');
        return;
    }

    getInfosCardsIniciais().then(result => {
        // Manipula a resposta da requisição
        const dadosDosCardsDaApi = result['cardsRetornados']

        // Itere pelos nomes e gere os templates
        dadosDosCardsDaApi.forEach((itemDaApi) => {
            // Clone o template do card
            const cardTemplate = document.getElementById('card-template');
            const cardClone = cardTemplate.content.cloneNode(true);

            const selecionarIdDoCard = cardClone.querySelector("#id-card");
            selecionarIdDoCard.setAttribute("id", itemDaApi.id);

            insereNovoElementoNoClone('h3', cardClone, itemDaApi.nome)
            insereNovoElementoNoClone('p', cardClone, itemDaApi.tecnologias)

            curtir(cardClone, selecionarIdDoCard.id)

            // Adicione o card clonado ao container do feed
            feedContainer.appendChild(cardClone);
        });
    })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });

}
