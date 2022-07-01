const cachorros = require("./database/cachorros.json");
const fs = require("fs");
const path = require("path");

// const newCachorros = JSON.parse(cachorros);

function salvar() {
  let arquivo = path.resolve("./database/cachorros.json");
  let json = JSON.stringify(cachorros, null, 4);

  fs.writeFileSync(arquivo, json);

  // console.log('arquivo: ' + arquivo + ' json: ' + json);
}

// salvar();

function buscar(idBuscado) {

  // idBuscado = 2;
  function mesmoId(cachorro){
    if(cachorro.id == idBuscado){
      return true;

    } else {
      return false;
    }
  }    

  return cachorros.find(mesmoId);

  
  
}

buscar(20);

// console.table(resultado);

module.exports = {};
