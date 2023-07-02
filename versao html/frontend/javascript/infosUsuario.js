async function dadosDOU() {

    const config = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'

        },
        // body: JSON.stringify(login)
    };

    const response = await fetch('http://localhost:3005/feed', config);
    return await response.json();

}


async function pegarNomeUsuario(){
    await dadosDOU().then(result => {
        const nomeUsuario = result['dadosRetornados']['nome']
        return nomeUsuario
    })

}


function insereNovoElementoNoClone(seletor,cardClone,novoElemento){
    const nameElement = cardClone.querySelector(seletor);
    nameElement.textContent = novoElemento;
}

const selecionarIdDoCard = cardClone.querySelector("#id-card");
selecionarIdDoCard.setAttribute("id", itemDaApi.id);

insereNovoElementoNoClone('h3',cardClone,itemDaApi.nome)
insereNovoElementoNoClone('p',cardClone,itemDaApi.tecnologias)

curtir(cardClone,selecionarIdDoCard.id)


// Adicione o card clonado ao container do feed
feedContainer.appendChild(cardClone);