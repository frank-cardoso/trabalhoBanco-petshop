const pool = require('./db');
const readline = require('readline-sync');

async function listarAnimais() {
  try {
    const res = await pool.query(`
      SELECT a.id_animal, a.nome, a.idade, c.nome AS cliente, r.nome_raca, r.especie
      FROM Animais a
      JOIN Clientes c ON a.id_cliente = c.id_cliente
      JOIN Racas r ON a.id_raca = r.id_raca
      ORDER BY a.id_animal
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Erro ao listar animais:', err.message);
  }
}

async function existeCliente(id_cliente) {
  const res = await pool.query('SELECT 1 FROM Clientes WHERE id_cliente = $1', [id_cliente]);
  return res.rowCount > 0;
}

async function existeRaca(id_raca) {
  const res = await pool.query('SELECT 1 FROM Racas WHERE id_raca = $1', [id_raca]);
  return res.rowCount > 0;
}


async function adicionarAnimal() {
  try {
    const nome = readline.question('Nome do animal: ');
    const idade = readline.questionInt('Idade: ');
    const id_cliente = readline.questionInt('ID do cliente: ');
    const id_raca = readline.questionInt('ID da raça: ');

     if (!(await existeCliente(id_cliente))) {
      console.log(`Cliente com ID ${id_cliente} não existe.`);
      return;
    }
    if (!(await existeRaca(id_raca))) {
      console.log(`Raça com ID ${id_raca} não existe.`);
      return;
    }

    await pool.query(
      'INSERT INTO Animais (nome, idade, id_cliente, id_raca) VALUES ($1, $2, $3, $4)',
      [nome, idade, id_cliente, id_raca]
    );
    console.log('Animal adicionado com sucesso!');
  } catch (err) {
    console.error('Erro ao adicionar animal:', err.message);
  }
}

async function atualizarAnimal() {
  try {
    const id = readline.questionInt('ID do animal a atualizar: ');
    const nome = readline.question('Novo nome: ');
    const idade = readline.questionInt('Nova idade: ');
    const id_cliente = readline.questionInt('Novo ID do cliente: ');
    const id_raca = readline.questionInt('Novo ID da raça: ');

      if (!(await existeCliente(id_cliente))) {
      console.log(`Cliente com ID ${id_cliente} não existe.`);
      return;
    }
    if (!(await existeRaca(id_raca))) {
      console.log(`Raça com ID ${id_raca} não existe.`);
      return;
    }

    await pool.query(
      'UPDATE Animais SET nome=$1, idade=$2, id_cliente=$3, id_raca=$4 WHERE id_animal=$5',
      [nome, idade, id_cliente, id_raca, id]
    );
    console.log('Animal atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar animal:', err.message);
  }
}

async function removerAnimal() {
  try {
    const id = readline.questionInt('ID do animal a remover: ');
    await pool.query('DELETE FROM Animais WHERE id_animal=$1', [id]);
    console.log('Animal removido com sucesso!');
  } catch (err) {
    console.error('Erro ao remover animal:', err.message);
  }
}

async function menu() {
  while (true) {
    console.log('\n=== MENU ANIMAIS ===');
    console.log('1 - Listar Animais');
    console.log('2 - Adicionar Animal');
    console.log('3 - Atualizar Animal');
    console.log('4 - Remover Animal');
    console.log('0 - Voltar');

    const opcao = readline.questionInt('Escolha uma opção: ');
    switch (opcao) {
      case 1: await listarAnimais(); break;
      case 2: await adicionarAnimal(); break;
      case 3: await atualizarAnimal(); break;
      case 4: await removerAnimal(); break;
      case 0: return;
      default: console.log('Opção inválida.');
    }
  }
}

module.exports = {
  listarAnimais,
  adicionarAnimal,
  atualizarAnimal,
  removerAnimal,
  menu
};