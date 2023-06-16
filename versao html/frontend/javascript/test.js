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

window.onload = () => {
    // Para aguardar a página carregar

    const btnSubmit = document.getElementById('login')

    btnSubmit.addEventListener("click", async (event) => {
        event.preventDefault();

        sendPassword().then(response => {
        if (response.status === 200) {
            window.location.href = '../html/home.html';
        } else {
            console.log('Ocorreu um erro durante o login');
            // !inserir pop de erro aqui
        }
    })
    })

}