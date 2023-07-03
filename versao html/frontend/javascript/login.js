async function sendPassword() {
    const login = {
        "email": document.getElementById('email').value,
        "password": document.getElementById('password').value
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    };

    const response = await fetch('http://localhost:3005/signin', config);
    return response
}


async function accessFeed() {

    const config = {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'

        },
    };

    const response = await fetch('http://localhost:3005/feed', config);
    return await response.json();

}

function redirecionarTipoUsuario() {
    accessFeed().then(result => {
        const tipoUsuario = result['dadosRetornados']['tipoUsuario']
        if (tipoUsuario === 'aluno') {
            window.location.href = '../html/homeEstudante.html';
        } else {
            window.location.href = '../html/homeEmpresa.html';
        }
    })

}

window.onload = () => {
    // Para aguardar a página carregar

    const btnCadastro = document.getElementById('cadastro')
    btnCadastro.addEventListener("click", async (event) => {
        event.preventDefault();
        window.location.href = '../html/cadastro.html';

    })


    const btnSubmit = document.getElementById('login');

    btnSubmit.addEventListener("click", async (event) => {
        event.preventDefault();

        const retornoDoPassWord = sendPassword();

        retornoDoPassWord.then(response => {
            if (response.status === 200) {
                accessFeed()
                    .then(result => {
                        redirecionarTipoUsuario(); 
                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                    });
            } else {
                console.log('Ocorreu um erro durante o login');
                exibirMensagemErro();
            }
        });
    });

    function exibirMensagemErro() {
        const mensagemErro = document.getElementById('mensagem-erro');
        mensagemErro.textContent = 'Senha incorreta. Por favor, tente novamente.';
        mensagemErro.style.display = 'block';
    }


}
