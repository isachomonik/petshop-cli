const cachorros = require("./database/cachorros.json");
const fs = require("fs");
const path = require("path");
const { emitKeypressEvents } = require("readline");
const { findSourceMap } = require("module");

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



module.exports = { buscar };
