var formfield = document.getElementById("adicionarCampos");
var botaoAdicionar = document.getElementById("botaoAdicionar");
var form = document.getElementById("formAdicionarNota");
var menuAdicionar = document.getElementById("menuAdicionar");
var menuLista = document.getElementById("menuLista");
var tabelaAlunos = document.createElement("table");
var arrayAlunos = [];

function add() {
    if (formfield.lastChild?.lastChild) {
        formfield.lastChild.lastChild.remove();
    }
    var novaDiv1 = document.createElement("div");
    var camposAdicionados =
        document.getElementsByClassName("my-3 row").length + 1;
    novaDiv1.setAttribute("class", "my-3 row");
    novaDiv1.innerHTML = `<label for="av${camposAdicionados}" class="col-sm-2 col-form-label d-flex align-items-center">Avaliação ${camposAdicionados}</label>
    <div class="col-sm-2 d-flex align-items-center">
        <input type="number" class="form-control" name="avaliacao" id="av${camposAdicionados}" min="0" max="10" required>
    </div>`;
    formfield.appendChild(novaDiv1);
}

function calcmedia(notas) {
    const total = notas.reduce((total, atual) => {
        return parseFloat(total) + parseFloat(atual);
    });

    return total / notas.length;
}

function enviarFormulario(event) {
    event.preventDefault();
    const dadosFormulario = new FormData(form);

    const dados = Object.fromEntries(dadosFormulario.entries());
    dados.avaliacao = dadosFormulario.getAll("avaliacao");

    const media = calcmedia(dados.avaliacao);
    dados.media = media;

    arrayAlunos.push(dados);
    formfield.innerHTML = "";
    event.target.reset();
}

botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    add();
});

form.addEventListener("submit", enviarFormulario);

form.addEventListener("reset", function (event) {
    formfield.innerHTML = "";
});

menuAdicionar.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("paginaAdicionar").classList.remove("d-none");
    document.getElementById("paginaExibir").classList.add("d-none");
});

menuLista.addEventListener("click", function (event) {
    event.preventDefault();

    const preencherTabela = document.getElementById("preencherTabela");
    const preencherUl = document.getElementById("preencherUl");
    tabelaAlunos.className = "mx-auto table table-striped";
    tabelaAlunos.innerHTML = `<thead><th>Aluno</th><th class="text-center">Média</th></thead>`;

    for (const aluno of arrayAlunos) {
        const newRow = document.createElement("tr");
        const tdAluno = document.createElement("td");
        const tdMedia = document.createElement("td");
        tdMedia.className = "text-center";
        tdAluno.textContent = aluno.nome;
        tdMedia.textContent = aluno.media;
        newRow.appendChild(tdAluno);
        newRow.appendChild(tdMedia);
        tabelaAlunos.appendChild(newRow);
    }

    preencherTabela.appendChild(tabelaAlunos);
    document.getElementById("paginaExibir").classList.remove("d-none");
    document.getElementById("paginaAdicionar").classList.add("d-none");

    let alunosAprovados = arrayAlunos.filter((aluno) => {
        return aluno.media >= 6;
    });

    for (const aluno of alunosAprovados) {
        const ulAlunos = document.createElement("ul");
        const liNome = document.createElement("li");
        liNome.textContent = aluno.nome;
        ulAlunos.appendChild(liNome);
        preencherUl.appendChild(ulAlunos);
    }
});
