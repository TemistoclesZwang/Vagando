document.addEventListener('DOMContentLoaded', function () {
    const alunoButton = document.getElementById('alunoButton');
    const empresaButton = document.getElementById('empresaButton');
    const matriculaLabel = document.querySelector('label[for="matricula"]');
    const nomeInput = document.getElementById('nome');
    const tecnologiasLabel = document.querySelector('label[for="tecnologias"]');
    const tecnologiasInput = document.getElementById('tecnologias');
    const nascimentoLabel = document.querySelector('label[for="nascimento"]');
    const nascimentoInput = document.getElementById('nascimento');
    const formulario = document.querySelector('#formulario form');

    const proximoElementoMatricula = matriculaLabel.nextElementSibling;
    const proximoElementoNome = nomeInput.nextElementSibling;

    function adicionarElemento(elemento, referencia) {
        if (elemento && !elemento.parentNode) {
            formulario.insertBefore(elemento, referencia.nextSibling);
        }
    }

    function removerElemento(elemento) {
        if (elemento && elemento.parentNode) {
            elemento.parentNode.removeChild(elemento);
        }
    }

    function configurarCamposAluno() {
        matriculaLabel.textContent = 'Matricula:';
        nomeInput.value = "";
        adicionarElemento(tecnologiasInput, proximoElementoMatricula);
        adicionarElemento(tecnologiasLabel, proximoElementoMatricula);
        adicionarElemento(nascimentoInput, nascimentoLabel);
    }

    function configurarCamposEmpresa() {
        matriculaLabel.textContent = 'CNPJ:';
        nomeInput.value = "";
        removerElemento(tecnologiasInput);
        removerElemento(tecnologiasLabel);
        removerElemento(nascimentoInput);
        removerElemento(nascimentoLabel);
    }

    alunoButton.addEventListener('change', function () {
        if (alunoButton.checked) {
            configurarCamposAluno();
        }
    });

    empresaButton.addEventListener('change', function () {
        if (empresaButton.checked) {
            configurarCamposEmpresa();
        }
    });

    async function enviarFormulario() {
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
    
        const response = await fetch('http://localhost:3005/criar/cadastro', config);
        return response
    }

    const form = document.querySelector('#formulario form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formEntries = Array.from(formData.entries());
        if (empresaButton.checked) {
            console.log('Itens do formulário:');
            formEntries.forEach(([name, value]) => {
                console.log(`${name}: ${value}`);
            });
        }
        // !pegar itens do formulário aqui e enviar para o endpoint
    });
});
