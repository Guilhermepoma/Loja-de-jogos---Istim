var botaoBuscar = document.getElementById("buscar");
var botaoSalvar = document.getElementById("salvar");
var botaoSalvarEdicao = document.getElementById("salvarEdicao");

var cabecalho = "<tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Valor</th><th>Ações</th></tr>";

function listarJogos() {
    fetch("api/listar.php")
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(jogos) {
        var html = cabecalho;
        jogos.forEach(function(j) {
            html += "<tr>";
            html += "<td>" + j.id + "</td>";
            html += "<td>" + j.nome + "</td>";
            html += "<td>" + j.descricao + "</td>";
            html += "<td>R$ " + j.valor + "</td>";
            html += "<td>";
            html += "<button onclick=\"preencherEdicao(" + j.id + ", '" + j.nome + "', '" + j.descricao + "', '" + j.valor + "', '" + j.img + "')\">Editar</button> ";
            html += "<button onclick=\"deletarJogo(" + j.id + ")\">Deletar</button>";
            html += "</td>";
            html += "</tr>";
        });
        document.getElementById("resultado").innerHTML = html;
    });
}

function adicionarJogo() {
    var nome      = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var valor     = document.getElementById("valor").value;
    var img       = document.getElementById("img").value;

    fetch("api/add.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "nome=" + nome + "&descricao=" + descricao + "&valor=" + valor + "&img=" + img
    })
    .then(function(resposta) {
        return resposta.text();
    })
    .then(function(retorno) {
        if (retorno.trim() == "success") {
            alert("Jogo cadastrado!");
            document.getElementById("nome").value      = "";
            document.getElementById("descricao").value = "";
            document.getElementById("valor").value     = "";
            document.getElementById("img").value       = "";
            listarJogos();
        } else {
            alert("Erro ao cadastrar.");
        }
    });
}

function preencherEdicao(id, nome, descricao, valor, img) {
    document.getElementById("editId").value        = id;
    document.getElementById("editNome").value      = nome;
    document.getElementById("editDescricao").value = descricao;
    document.getElementById("editValor").value     = valor;
    document.getElementById("editImg").value       = img;
    document.getElementById("formEditar").style.display = "block";
}

function atualizarJogo() {
    var id        = document.getElementById("editId").value;
    var nome      = document.getElementById("editNome").value;
    var descricao = document.getElementById("editDescricao").value;
    var valor     = document.getElementById("editValor").value;
    var img       = document.getElementById("editImg").value;

    fetch("api/update.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + id + "&nome=" + nome + "&descricao=" + descricao + "&valor=" + valor + "&img=" + img
    })
    .then(function(resposta) {
        return resposta.text();
    })
    .then(function(retorno) {
        if (retorno.trim() == "success") {
            alert("Jogo atualizado!");
            document.getElementById("formEditar").style.display = "none";
            listarJogos();
        } else {
            alert("Erro ao atualizar.");
        }
    });
}

function deletarJogo(id) {
    if (!confirm("Tem certeza que quer deletar?")) return;

    fetch("api/deletar.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "id=" + id
    })
    .then(function(resposta) {
        return resposta.text();
    })
    .then(function(retorno) {
        if (retorno.trim() == "success") {
            alert("Jogo deletado!");
            listarJogos();
        } else {
            alert("Erro ao deletar.");
        }
    });
}

botaoBuscar.onclick = function() { listarJogos(); }
botaoSalvar.onclick = function() { adicionarJogo(); }
botaoSalvarEdicao.onclick = function() { atualizarJogo(); }