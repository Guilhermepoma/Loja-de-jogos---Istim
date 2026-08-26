//cara, ta funfando, muito video e to com sono, boa noite


function listarJogos() {
    var listaDiv = document.getElementById("listaJogos");

    fetch("api/listar.php")
        .then(res => res.json())
        .then(jogos => {
            if (jogos.length == 0) {
                listaDiv.innerHTML = "<h3>Lista de Jogos:</h3><p>Nenhum jogo encontrado.</p>";
                return;
            }

            var html = "<h3>Lista de Jogos:</h3><ul>";
            for (var i = 0; i < jogos.length; i++) {
                var j = jogos[i];
                html += "<li>"
                    + j.nome + " - " + j.descricao + " - R$ " + j.valor
                    + " <button onclick=\"preencherEdicao(" + j.id + ", '" + j.nome + "', '" + j.descricao + "', '" + j.valor + "', '" + j.img + "')\">Editar</button>"
                    + " <button onclick=\"deletarJogo(" + j.id + ")\">Deletar</button>"
                    + "</li>";
            }
            html += "</ul>";
            listaDiv.innerHTML = html;
        })
        .catch(erro => {
            listaDiv.innerHTML = "<p>Erro ao carregar jogos.</p>";
            console.log(erro);
        });
}

function preencherEdicao(id, nome, descricao, valor, img) {
    document.getElementById("editId").value = id;
    document.getElementById("editNome").value = nome;
    document.getElementById("editDescricao").value = descricao;
    document.getElementById("editValor").value = valor;
    document.getElementById("editImg").value = img;
    document.getElementById("editarCard").style.display = "block";
}

function deletarJogo(id) {
    if (!confirm("Tem certeza que quer deletar?")) return;

    var dados = new FormData();
    dados.append('id', id);

    fetch("api/deletar.php", {
        method: 'POST',
        body: dados
    })
    .then(res => res.text())
    .then(resultado => {
        if (resultado.trim() == 'success') {
            alert('Jogo deletado!');
            listarJogos();
        } else {
            alert('Erro: ' + resultado);
        }
    })
    .catch(erro => {
        alert('Erro de conexão');
        console.log(erro);
    });
}

document.getElementById("adicionarForm").onsubmit = function(e) {
    e.preventDefault();

    var dados = new FormData(this);

    fetch("api/add.php", {
        method: 'POST',
        body: dados
    })
    .then(res => res.text())
    .then(resultado => {
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

document.getElementById("editarForm").onsubmit = function(e) {
    e.preventDefault();

    var dados = new FormData(this);

    fetch("api/update.php", {
        method: 'POST',
        body: dados
    })
    .then(res => res.text())
    .then(resultado => {
        if (resultado.trim() == 'success') {
            alert('Jogo atualizado!');
            this.reset();
            document.getElementById("editarCard").style.display = "none";
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

document.getElementById("buscar").onclick = listarJogos;
window.onload = listarJogos;