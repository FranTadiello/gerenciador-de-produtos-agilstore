const readline = require('readline-sync');
const path = require('path');
const fs = require('fs');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function searchProduto() {
  try {
    // Ler o inventário de produtos
    const data = fs.readFileSync(produtosPath, 'utf8');
    const produtos = JSON.parse(data);

    console.log("\n=== Buscar Produto ===");
    console.log("Você deseja buscar pelo:");
    console.log("1. ID");
    console.log("2. Nome");

    const escolha = readline.questionInt("Digite a opção desejada (1 ou 2): ");

    if (escolha === 1) {
      // Buscar pelo ID
      const id = readline.questionInt("\nDigite o ID do produto: ");
      const produto = produtos.find(p => p.id === id);

      if (!produto) {
        console.log("\nProduto com o ID informado não foi encontrado.");
      } else {
        console.log("\nProduto encontrado:");
        console.log(`ID: ${produto.id}`);
        console.log(`Nome: ${produto.nome}`);
        console.log(`Categoria: ${produto.categoria}`);
        console.log(`Quantidade em Estoque: ${produto.quantidade}`);
        console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);
      }
    } else if (escolha === 2) {
      // Buscar pelo Nome
      const nome = readline.question("\nDigite parte do nome do produto: ");
      const resultados = produtos.filter(p =>
        p.nome.toLowerCase().includes(nome.toLowerCase())
      );

      if (resultados.length === 0) {
        console.log("\nNenhum produto encontrado com o nome informado.");
      } else {
        console.log(`\nProdutos encontrados (${resultados.length}):`);
        resultados.forEach(produto => {
          console.log(`\nID: ${produto.id}`);
          console.log(`Nome: ${produto.nome}`);
          console.log(`Categoria: ${produto.categoria}`);
          console.log(`Quantidade em Estoque: ${produto.quantidade}`);
          console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);
        });
      }
    } else {
      console.log("\nOpção inválida! Por favor, escolha 1 ou 2.");
    }
  } catch (error) {
    console.error("Erro ao buscar o produto:", error.message);
  }
}

module.exports = searchProduto;
