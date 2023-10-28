"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var formfield = document.getElementById("adicionarCampos");
var botaoAdicionar = document.getElementById("botaoAdicionar");
var form = document.getElementById("formAdicionarNota");
var menuAdicionar = document.getElementById("menuAdicionar");
var menuLista = document.getElementById("menuLista");
var tabelaAlunos = document.createElement("table");
var arrayAlunos = [];
function add() {
  var _formfield$lastChild;
  if ((_formfield$lastChild = formfield.lastChild) !== null && _formfield$lastChild !== void 0 && _formfield$lastChild.lastChild) {
    formfield.lastChild.lastChild.remove();
  }
  var novaDiv1 = document.createElement("div");
  var camposAdicionados = document.getElementsByClassName("my-3 row").length + 1;
  novaDiv1.setAttribute("class", "my-3 row");
  novaDiv1.innerHTML = "<label for=\"av".concat(camposAdicionados, "\" class=\"col-sm-2 col-form-label d-flex align-items-center\">Avalia\xE7\xE3o ").concat(camposAdicionados, "</label>\n    <div class=\"col-sm-2 d-flex align-items-center\">\n        <input type=\"number\" class=\"form-control\" name=\"avaliacao\" id=\"av").concat(camposAdicionados, "\" min=\"0\" max=\"10\" required>\n    </div>");
  formfield.appendChild(novaDiv1);
}
function calcmedia(notas) {
  var total = notas.reduce(function (total, atual) {
    return parseFloat(total) + parseFloat(atual);
  });
  return total / notas.length;
}
function enviarFormulario(event) {
  event.preventDefault();
  var dadosFormulario = new FormData(form);
  var dados = Object.fromEntries(dadosFormulario.entries());
  dados.avaliacao = dadosFormulario.getAll("avaliacao");
  var media = calcmedia(dados.avaliacao);
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
  var preencherTabela = document.getElementById("preencherTabela");
  var preencherUl = document.getElementById("preencherUl");
  tabelaAlunos.className = "mx-auto table table-striped";
  tabelaAlunos.innerHTML = "<thead><th>Aluno</th><th class=\"text-center\">M\xE9dia</th></thead>";
  for (var _i = 0, _arrayAlunos = arrayAlunos; _i < _arrayAlunos.length; _i++) {
    var aluno = _arrayAlunos[_i];
    var newRow = document.createElement("tr");
    var tdAluno = document.createElement("td");
    var tdMedia = document.createElement("td");
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
  var alunosAprovados = arrayAlunos.filter(function (aluno) {
    return aluno.media >= 6;
  });
  var _iterator = _createForOfIteratorHelper(alunosAprovados),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _aluno = _step.value;
      var ulAlunos = document.createElement("ul");
      var liNome = document.createElement("li");
      liNome.textContent = _aluno.nome;
      ulAlunos.appendChild(liNome);
      preencherUl.appendChild(ulAlunos);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});