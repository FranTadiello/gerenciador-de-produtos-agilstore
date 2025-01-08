const readline = require('readline-sync');
const path = require('path');
const fs = require('fs');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function deleteProduto() {
  try {
    const data = fs.readFileSync(produtosPath, 'utf8');
    const produtos = JSON.parse(data);

    console.log("\n=== Excluir Produto ===");
    const id = readline.questionInt("Digite o ID do produto que deseja excluir: ");

    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
      console.log("\nProduto não encontrado! Certifique-se de que o ID está correto.");
      return;
    }

    const produto = produtos[produtoIndex];
    console.log("\nProduto encontrado:");
    console.log(`ID: ${produto.id}`);
    console.log(`Nome: ${produto.nome}`);
    console.log(`Categoria: ${produto.categoria}`);
    console.log(`Quantidade em Estoque: ${produto.quantidade}`);
    console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);

    const confirmacao = readline.question("Tem certeza de que deseja excluir este produto? (s/n): ");

    if (confirmacao.toLowerCase() !== 's') {
      console.log("\nExclusão cancelada.");
      return;
    }

    produtos.splice(produtoIndex, 1);

    fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));

    console.log("\nProduto excluído com sucesso!");

  } catch (error) {
    console.error("Erro ao excluir o produto:", error.message);
  }
}

module.exports = deleteProduto;
