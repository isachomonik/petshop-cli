const cachorros = require("./database/cachorros.json");
const fs = require("fs");
const path = require("path");
const { emitKeypressEvents } = require("readline");
const { findSourceMap } = require("module");
const { map } = require("./settings/servicos");
const { captureRejections } = require("events");

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

function vacinar(id, vacina, dataVacina) {

  let cachorro = buscar(id);

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



module.exports = { buscar };
