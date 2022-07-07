const cachorros = require("./database/cachorros.json");
const fs = require("fs");
const path = require("path");
const { emitKeypressEvents } = require("readline");
const { findSourceMap } = require("module");
const { map } = require("./settings/servicos");
const { captureRejections } = require("events");
const { get } = require("http");

// função que salva o arquivo em JSON
function salvar() {
  let arquivo = path.resolve("./database/cachorros.json");
  let json = JSON.stringify(cachorros, null, 4);

  fs.writeFileSync(arquivo, json);
}

// função que busca e retorna um cachorro pelo ID
function buscar(idBuscado) {
  let cachorro = cachorros.find((cachorro) => {
    return cachorro.id == idBuscado;
  });
  if (cachorro) {
    return cachorro;
  } else {
    return `Não existe cachorro com o id ${idBuscado}`;
  }
}

//função que mostra uma lista com todos os cachorros cadastrados
function listar() {
  console.table(cachorros);
}

//função que mostra as informações de um cachorro buscado
function descrever(idBuscado) {
  let cachorro = buscar(idBuscado);
  cachorro
    ? console.log(cachorro)
    : console.log("Não existe cachorro com o id ${idBuscado}");
}

//função que adiciona um novo cachorro ao fim da lista
function adicionar(cachorroNovo) {
  

  let novoCachorro = {
    id: cachorros[cachorros.length - 1].id + 1,
    nome: cachorroNovo.nome,
    sexo: cachorroNovo.sexo,
    castrado: cachorroNovo.castrado,
    dataDeNascimento: cachorroNovo.dataDeNascimento,
    peso: cachorroNovo.peso,
    vacinas: [],
    servicos: [],
  };

  cachorros.push(novoCachorro);

  salvar();
}

//função que retorna a data atual
function getDate() {
  var today = new Date();
  var data = today.toISOString().substring(0, 10);

  return data.slice(0, 10);
}

//função que adiciona vacina ao cachorro selecionado
function vacinar(id, vacina, dataVacina) {
  let cachorro = buscar(id);
  dataVacina = getDate();
  let dadosVacina = {
    nome: vacina,
    data: dataVacina,
  };

  if (cachorro.id) {
    cachorro.vacinas.push(dadosVacina);
  } else {
    console.log("Cachorro inexistente!");
  }

  salvar();
}

//função que adiciona serviço ao cachorro selecionado
function atribuirServico(id, servico, dataServico) {
  let cachorro = buscar(id);
  dataServico = getDate();

  let dadosServico = {
    nome: servico,
    data: dataServico,
  };

  if (cachorro.id) {
    cachorro.servicos.push(dadosServico);
  } else {
    console.log("Cachorro inexistente!");
  }

  salvar();
}

//função que remove um cachorro da lista
function remover(id) {
  let cachorro = buscar(id);
  cachorros.splice(cachorros.indexOf(cachorro), 1);

  salvar();
}

module.exports = {
  remover,
  adicionar,
  atribuirServico,
  vacinar,
  listar,
  descrever,
};
