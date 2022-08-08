//ADICIONANDO OS ANIMES NA LISTA//
function addAnime(){
    let inputItens = {}
    inputItens["nome"] = document.querySelector("[data-nome]").value;

    fetch("https://my-json-server.typicode.com/ingridsSilveira/Lista_Animes/animes/post", {
     
    method: "POST",
    body: JSON.stringify({inputItens}),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())

.then(resposta =>  {
    const nome = resposta.inputItens.nome;
    document.querySelector(".item").innerHTML = nome;
    console.log(nome);
})
pegandoData();
}

//PEGANDO OS DADOS DOS ANIMES//
function pegandoData(){
    fetch('https://my-json-server.typicode.com/ingridsSilveira/Lista_Animes/animes').then((res) => res.json()
    ).then((resposta) => {
        var data = "";
        resposta.forEach((element) =>{
            data += "<tr>"
            data += "<td>"+element.nome+"</td>"
            data += "<td><button class='btn'>Editar</button></td>"
            data += "<td><button class='btn'>Deletar</button></td>"
            data +="</tr>";
        })
        document.querySelector("[data-corpo]").innerHTML = data;
    })
}
pegandoData();