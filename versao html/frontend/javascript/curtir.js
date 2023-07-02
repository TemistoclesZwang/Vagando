const curtirElement = document.getElementById('card-template');
    // Verifique se o feedContainer existe
    if (!curtirElement) {
        console.error('Elemento #feed não encontrado!');
    }
const btnCurtir = curtirElement.querySelectorById('btn-curtir')

btnCurtir.addEventListener("click", async (event) => {
    event.preventDefault();
    // const extrairTextoDoCmm = getCmm[0].value
    // await sendCmm(extrairTextoDoCmm,post.id)
    // console.log(getCmm[0].innerText);

    console.log('curtido');

});