const lista = "https://my-json-server.typicode.com/ingridsSilveira/Lista_Animes/Animes";

function pegandoData(){
    fetch(lista).then((res) => res.json()
    ).then((resposta) => {
        var data = "";
        resposta.forEach((element) =>{
            data += `<div class="anime">
            <img src="${element.imagem}" alt="${element.nome}">
            <h3>${element.nome}</h3>
            <p>${element.sinopse}</p>
            </div>`;
        })
    })
}
pegandoData();