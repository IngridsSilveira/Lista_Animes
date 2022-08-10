const corpo = document.querySelector("[data-corpo]");

var url = 'http://localhost:3000/animes';

let inputItens = document.querySelector("[data-nome]");

let form = document.querySelector(".form");

var data = "";

//POST//ADICIONANDO OS ANIMES NA LISTA//
form.addEventListener("submit", (e) =>{
    e.preventDefault();

    fetch(url, {
    method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
        nome: inputItens.value,
    })
    })
    .then(response => response.json())
    .then(resposta => {
        const respostaArray = [];
        respostaArray.push(resposta);
        pegandoDados(respostaArray);
    })
})

//GET//PEGANDO OS DADOS DOS ANIMES//
    fetch(url).then(resposta => resposta.json())
    .then(dados => pegandoDados(dados))
        
const pegandoDados = (dados) => {
    dados.forEach(element => {
        data += `
            <tr data-id=${element.id}>
            <td class="td_titulo" data-titulo>${element.nome}</td>
            <td>
            <button class='btn_editar' id="editar">Editar</button>
            </td>
            <td>
            <button id="deletar" class="btn_deletar">Deletar</button>
            </td>
            </tr>
            `
    })
    corpo.innerHTML = data;
}

corpo.addEventListener("click", (e) => {
    e.preventDefault();

    let botaoDeletar = e.target.id == 'deletar';
    let botaoEditar = e.target.id == 'editar';

    let id = e.target.parentElement.parentElement.dataset.id;

//DELETANDO//
    if(botaoDeletar){
        fetch(`${url}/${id}`,{
            method: "DELETE",
        })
        .then(resposta => resposta.json())
        .then(() => location.reload())
    }
//SELECIONANDO O BOTÃO DE EDITAR E O CONTEUDO//
    if(botaoEditar){
      const parente = e.target.parentElement.parentElement;

      let nomeConteudo = parente.querySelector("[data-titulo]").textContent;

      inputItens.value = nomeConteudo;
    }

let btnEditar = document.querySelector(".btn_editar");

//EDITANDO OS ITENS//
btnEditar.addEventListener("click", () => {
        fetch(`${url}/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                nome: inputItens.value,
            })
        })
        .then(resposta => resposta.json())
        .then(() => location.reload())
    })
})