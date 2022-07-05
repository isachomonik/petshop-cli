const cachorros = require("./database/cachorros.json");
const fs = require("fs");
const path = require("path");
const { emitKeypressEvents } = require("readline");
const { findSourceMap } = require("module");
const { map } = require("./settings/servicos");
const { captureRejections } = require("events");
const { get } = require("http");

// const newCachorros = JSON.parse(cachorros);

function salvar() {
  let arquivo = path.resolve("./database/cachorros.json");
  let json = JSON.stringify(cachorros, null, 4);

  fs.writeFileSync(arquivo, json);

  // console.log('arquivo: ' + arquivo + ' json: ' + json);
}

// salvar();

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

function listar() {
  console.table(cachorros);
}

function descrever(idBuscado) {
  let cachorro = buscar(idBuscado);
  cachorro
    ? console.log(cachorro)
    : console.log("Não existe cachorro com o id ${idBuscado}");
}

function adicionar(cachorroNovo) {
  let novoCachorro = {
    id: cachorros.length + 1,
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

// let dog = {
//   nome : 'Marcelinho',
//   castrado : false,
//   dataDeNascimento : '2009-12-01',
//   peso : 12,
//   sexo : 'm'
// }

// adicionar(dog)

function getDate(){
  // let dataAtual = new Date();
  // let day = dataAtual.getDay();
  // let month = dataAtual.getMonth() + 1;
  // let year = dataAtual.getFullYear();

  // let data = '${year}-${month}-${day}';

  // return data;

  var today = new Date();
 var data = today.toISOString().substring(0, 10);

  return data.slice(0,10)
}

function vacinar(id, vacina, dataVacina) {

  let cachorro = buscar(id);
  dataVacina = getDate();
  let dadosVacina = {
    nome: vacina,
    data: dataVacina
  };

  if(cachorro.id){
    cachorro.vacinas.push(dadosVacina);
  } else {
   console.log("Cachorro inexistente!")
  };

  salvar();
};

function atribuirServico(id, servico, dataServico) {

  let cachorro = buscar(id);
  dataServico = getDate();

  let dadosServico = {
    nome: servico,
    data: dataServico
  };

  if(cachorro.id){
    cachorro.servicos.push(dadosServico);
  } else {
   console.log("Cachorro inexistente!")
  };

  salvar();
};

function remover(id){
  let cachorro = buscar(id);
  cachorros.splice(cachorros.indexOf(cachorro), 1)

  salvar()
}



module.exports = { remover, adicionar, atribuirServico, vacinar, listar, descrever};
