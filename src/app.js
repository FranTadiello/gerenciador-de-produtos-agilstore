const readline = require('readline-sync');
const addProduto  = require('./funcoes/addProduto');

function menu() {
  console.log("\n=== Gerenciamento de Produtos - AgilStore ===");
  console.log("1. Adicionar Produto");
  console.log("2. Listar Produtos");
  console.log("3. Atualizar Produto");
  console.log("4. Excluir Produto");
  console.log("5. Buscar Produto");
  console.log("0. Sair");
  
  const escolhas = readline.questionInt("\nEscolha uma opção: ");

  switch (escolhas) {
    case 1:
      addProduto();
      break;
    case 2:
      listProdutos();
      break;
    case 3:
      updateProduto();
      break;
    case 4:
      deleteProduto();
      break;
    case 5:
      searchProduto();
      break;
    case 0:
      console.log("Saindo...");
      process.exit();
    default:
      console.log("Opção inválida.");
  }
}

while (true) {
  menu();
}
