const pool = require('./db');
const readline = require('readline-sync');

async function listarClientes() {
  try {
    const res = await pool.query('SELECT * FROM Clientes');
    console.table(res.rows);
  } catch (err) {
    console.error('Erro ao listar clientes:', err.message);
  }
}

async function adicionarCliente() {
  const nome = perguntarNomeValido('Nome: ');
  const telefone = readline.question('Telefone: ');
  const email = readline.question('Email: ');
  const endereco = readline.question('Endereço: '); 

  try {
    await pool.query(
      'INSERT INTO Clientes (nome, telefone, email, endereco) VALUES ($1, $2, $3, $4)',
      [nome, telefone, email, endereco]
    );
    console.log('Cliente adicionado com sucesso!');
  } catch (err) {
    console.error('Erro ao adicionar cliente:', err.message);
  }
}

async function atualizarCliente() {
  const id = readline.questionInt('ID do cliente a atualizar: ');
  const nome = readline.question('Novo nome: ');
  const telefone = readline.question('Novo telefone: ');
  const email = readline.question('Novo email: ');
  const endereco = readline.question('Novo endereço: ');

  try {
    await pool.query(
      'UPDATE Clientes SET nome=$1, telefone=$2, email=$3, endereco=$4 WHERE id_cliente=$5',
      [nome, telefone, email, endereco, id]
    );
    console.log('Cliente atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err.message);
  }
}

async function removerCliente() {
  const id = readline.questionInt('ID do cliente a remover: ');
  try {
    await pool.query('DELETE FROM Clientes WHERE id_cliente=$1', [id]);
    console.log('Cliente removido com sucesso!');
  } catch (err) {
    console.error('Erro ao remover cliente:', err.message);
  }
}

function validarNome(nome) {
  const re = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return re.test(nome.trim());
}

function perguntarNomeValido(promptText) {
  while (true) {
    const nome = readline.question(promptText);
    if (!nome.trim()) {
      console.log('Nome é obrigatório.');
      continue;
    }
    if (!validarNome(nome)) {
      console.log('Nome inválido. Não pode conter números ou caracteres especiais.');
      continue;
    }
    return nome;
  }
}

async function menu() {
  while (true) {
    console.log('\n=== MENU CLIENTES ===');
    console.log('1 - Listar Clientes');
    console.log('2 - Adicionar Cliente');
    console.log('3 - Atualizar Cliente');
    console.log('4 - Remover Cliente');
    console.log('0 - Voltar');

    const opcao = readline.questionInt('Escolha uma opção: ');
    switch (opcao) {
      case 1: await listarClientes(); break;
      case 2: await adicionarCliente(); break;
      case 3: await atualizarCliente(); break;
      case 4: await removerCliente(); break;
      case 0: return;
      default: console.log('Opção inválida.');
    }
  }
}


module.exports = {
  listarClientes,
  adicionarCliente,
  atualizarCliente,
  removerCliente,
  menu
};