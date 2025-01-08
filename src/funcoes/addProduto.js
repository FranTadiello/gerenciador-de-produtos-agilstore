const readline = require('readline-sync');
const path = require('path');
const fs = require('fs');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function addProduto() {
    console.log("\n=== Adicionar Produto ===");

    const nome = readline.question("Nome do produto: ");
    const categoria = readline.question("Categoria do produto: ");
    const quantidade = readline.questionInt("Quantidade em estoque: ");
    const preco = readline.questionFloat("Preço do produto: ");
    
        console.log("Caminho do arquivo JSON:", produtosPath);
        
        const data = fs.readFileSync(produtosPath, 'utf8');
        
        const produtos = JSON.parse(data);
        console.log("Produtos carregados:", produtos);

        const id = produtos.length + 1;
        const novoProduto = {
            id, nome, categoria, quantidade, preco: parseFloat(preco.toFixed(2)) 
        };
        produtos.push(novoProduto);

        fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));
        console.log("\nProduto adicionado com sucesso!");
        console.log(novoProduto);
    
}

module.exports = addProduto;