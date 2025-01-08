const readline = require('readline-sync');
const path = require('path');
const fs = require('fs');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function updateProduto() {
    console.log("\n=== Atualizar Produto ===");

    try {
        const data = fs.readFileSync(produtosPath, 'utf8');
        const produtos = JSON.parse(data);

        if (produtos.length === 0) {
            console.log("Nenhum produto cadastrado para atualizar.");
            return;
        }

        const id = readline.questionInt("Digite o ID do produto que deseja atualizar: ");
        const produto = produtos.find(p => p.id === id);

        if (!produto) {
            console.log("Produto não encontrado. Certifique-se de digitar um ID válido.");
            return;
        }
        console.log(
            `Produto selecionado: 
            Nome: ${produto.nome}, 
            Categoria: ${produto.categoria}, 
            Quantidade: ${produto.quantidade}, 
            Preço: R$ ${produto.preco.toFixed(2)}`);

        console.log("\nEscolha o campo que deseja atualizar:");
        console.log("1. Nome");
        console.log("2. Categoria");
        console.log("3. Quantidade");
        console.log("4. Preço");
        console.log("0. Cancelar");

        const escolha = readline.questionInt("\nDigite sua escolha: ");

        switch (escolha) {
            case 1:
                const novoNome = readline.question("Digite o novo nome do produto: ");
                produto.nome = novoNome;
                break;
            case 2:
                const novaCategoria = readline.question("Digite a nova categoria do produto: ");
                produto.categoria = novaCategoria;
                break;
            case 3:
                const novaQuantidade = readline.questionInt("Digite a nova quantidade em estoque: ");
                produto.quantidade = novaQuantidade;
                break;
            case 4:
                const novoPreco = readline.questionFloat("Digite o novo preço do produto: ");
                produto.preco = parseFloat(novoPreco.toFixed(2));
                break;
            case 0:
                console.log("Atualização cancelada.");
                break;

            default:
                console.log("Opção inválida.");
                break;
        }

        fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));
        console.log("\nProduto atualizado com sucesso!");
        console.log(produto);

    } catch (error) {
        console.error("Erro ao atualizar o produto:", error.message);
    }
}

module.exports = updateProduto;