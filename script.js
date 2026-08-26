///---- fiz com sono e com tutoriais da internet, mas ta funfando

//função de lista jogos
function listarJogos() {

    //esse pega a div do html, ai tem que arrumar para ficar mais bonito
    var listaDiv = document.getElementById("listaJogos");

    //busca os jogos no php
    fetch("api/listar.php")
        .then(res => res.json())
        .then(jogos => {
            //se não tiver nada no banco, avisa na tela
            if (jogos.length == 0) {
                listaDiv.innerHTML = "<h3>Lista de Jogos:</h3><p>Nenhum jogo encontrado.</p>";
                return;
            }

            //monta o html da lista
            var html = "<h3>Lista de Jogos:</h3><ul>";
            
            //percorre os jogos e adiciona na lista
            for (var i = 0; i < jogos.length; i++) {
                var j = jogos[i];
                html += "<li>" + j.nome + " - " + j.descricao + " - R$ " + j.valor + "</li>";
            }
            
            html += "</ul>";
            listaDiv.innerHTML = html;
        })
        .catch(erro => {
            //se der erro na busca, mostra na tela
            listaDiv.innerHTML = "<p>Erro ao carregar jogos.</p>";
            console.log(erro);
        });
}

//envia o formulario sem recarregar a pagina
document.getElementById("adicionarForm").onsubmit = function(e) {
    e.preventDefault();

    //pega todos os inputs de uma vez
    var dados = new FormData(this);

    //manda os dados pro php via POST
    fetch("api/add.php", {
        method: 'POST',
        body: dados
    })
    .then(res => res.text())
    .then(resultado => {
        //se deu certo, avisa, limpa os campos e atualiza a lista
        if (resultado.trim() == 'success') {
            alert('Jogo adicionado com sucesso!');
            this.reset();
            listarJogos();
        } else {
            alert('Erro: ' + resultado);
        }
    })
    .catch(erro => {
        alert('Erro de conexão');
        console.log(erro);
    });
};

//clique no botao e carregamento da pagina chamam a funcao
document.getElementById("buscar").onclick = listarJogos;
window.onload = listarJogos;