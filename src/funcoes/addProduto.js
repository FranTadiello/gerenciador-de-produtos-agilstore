const readline = require('readline-sync');
const produtos = require('./produtos.json');
const fs = require('fs');

function addProduto() {
    console.log("\n=== Adicionar Produto ===");
    
    const nome = readline.question("Nome do produto: ");
    const categoria = readline.question("Categoria do produto: ");
    const quantidade = readline.questionInt("Quantidade em estoque: ");
    const preco = readline.questionFloat("Preço do produto: ");
    
    const id = produtos.length + 1;

    const novoProduto = {
        id, nome, categoria, quantidade, preco
    };
    produtos.push(novoProduto)

    fs.writeFileSync('./produtos.json', JSON.stringify(produtos, null, 2));
    console.log("\nProduto adicionado com sucesso!");
    console.log(novoProduto)
}

module.exports = addProduto;