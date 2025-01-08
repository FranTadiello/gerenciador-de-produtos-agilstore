const fs = require('fs');
const path = require('path');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function listProdutos() {
    try {
      const data = fs.readFileSync(produtosPath, 'utf8'); 
      const produtos = JSON.parse(data); 
      
      if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
      } else {
        console.log("\n=== Lista de Produtos ===");
        console.table(produtos.map(produto => ({
          "ID": produto.id,
          "Nome": produto.nome,
          "Categoria": produto.categoria,
          "Quantidade em Estoque": produto.quantidade,
          "Preço (R$)":  produto.preco.toFixed(2)
        })));
      }
    } catch (error) {
      console.error("Erro ao listar os produtos:", error.message);
    }
  }

  module.exports = listProdutos;