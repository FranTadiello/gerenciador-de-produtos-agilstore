const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function listProdutos() {
  try {
    const data = fs.readFileSync(produtosPath, 'utf8');
    const produtos = JSON.parse(data);

    if (produtos.length === 0) {
      console.log("Nenhum produto cadastrado.");
      return;
    }

    console.log("\n=== Lista de Produtos ===");
    console.log("1. Filtrar por categoria");
    console.log("2. Ordenar por nome");
    console.log("3. Ordenar por quantidade");
    console.log("4. Ordenar por preço");
    console.log("5. Listar todos os produtos");

    const opcao = readline.questionInt("\nEscolha uma opção (1-4): ");

    let produtosFiltrados = [...produtos];

    switch (opcao) {
      case 1:
        const categoria = readline.question("Digite a categoria para filtrar: ");
        produtosFiltrados = produtos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
        break;
      case 2:
        produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 3:
        produtosFiltrados.sort((a, b) => a.quantidade - b.quantidade);
        break;
      case 4:
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
        break;
      case 5:
        console.log("\nExibindo todos os produtos sem filtros ou ordenação.");
        break;
      default:
        console.log("\nOpção inválida. Nenhuma ação realizada.");
        return;
    }

    if (produtosFiltrados.length === 0) {
      console.log("\nNenhum produto encontrado com o filtro aplicado.");
    } else {
      console.table(
        produtosFiltrados.map(produto => ({
          "ID": produto.id,
          "Nome": produto.nome,
          "Categoria": produto.categoria,
          "Quantidade em Estoque": produto.quantidade,
          "Preço": `R$ ${produto.preco.toFixed(2)}`
        })));
    }
  } catch (error) {
    console.error("Erro ao listar os produtos:", error.message);
  }

}

module.exports = listProdutos;