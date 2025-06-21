const pool = require('./db');
const readline = require('readline-sync');

async function listarServicos() {
  try {
    const res = await pool.query(`
      SELECT s.id_servico, s.nome, s.descricao, s.preco, t.nome AS tipo_servico
      FROM Servicos s
      LEFT JOIN Tipos_Servico t ON s.id_tipo_servico = t.id_tipo_servico
      ORDER BY s.id_servico
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Erro ao listar serviços:', err.message);
  }
}

async function existeTipoServico(id_tipo_servico) {
  const res = await pool.query('SELECT 1 FROM Tipos_Servico WHERE id_tipo_servico = $1', [id_tipo_servico]);
  return res.rowCount > 0;
}


async function adicionarServico() {
  try {
    const nome = readline.question('Nome do serviço: ');
    const descricao = readline.question('Descrição: ');
    const preco = readline.questionFloat('Preço: ');
    const id_tipo_servico = readline.questionInt('ID do tipo de serviço: ');
    
    if (!(await existeTipoServico(id_tipo_servico))) {
      console.log(`Tipo de serviço com ID ${id_tipo_servico} não existe.`);
      return;
    }

    await pool.query(
      'INSERT INTO Servicos (nome, descricao, preco, id_tipo_servico) VALUES ($1, $2, $3, $4)',
      [nome, descricao, preco, id_tipo_servico]
    );
    console.log('Serviço adicionado com sucesso!');
  } catch (err) {
    console.error('Erro ao adicionar serviço:', err.message);
  }
}

async function atualizarServico() {
  try {
    const id = readline.questionInt('ID do serviço a atualizar: ');
    const nome = readline.question('Novo nome: ');
    const descricao = readline.question('Nova descrição: ');
    const preco = readline.questionFloat('Novo preço: ');
    const id_tipo_servico = readline.questionInt('Novo ID do tipo de serviço: ');

      if (!(await existeTipoServico(id_tipo_servico))) {
      console.log(`Tipo de serviço com ID ${id_tipo_servico} não existe.`);
      return;
    }

    await pool.query(
      'UPDATE Servicos SET nome=$1, descricao=$2, preco=$3, id_tipo_servico=$4 WHERE id_servico=$5',
      [nome, descricao, preco, id_tipo_servico, id]
    );
    console.log('Serviço atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar serviço:', err.message);
  }
}

async function removerServico() {
  try {
    const id = readline.questionInt('ID do serviço a remover: ');
    await pool.query('DELETE FROM Servicos WHERE id_servico=$1', [id]);
    console.log('Serviço removido com sucesso!');
  } catch (err) {
    console.error('Erro ao remover serviço:', err.message);
  }
}

async function menu() {
  while (true) {
    console.log('\n=== MENU SERVIÇOS ===');
    console.log('1 - Listar Serviços');
    console.log('2 - Adicionar Serviço');
    console.log('3 - Atualizar Serviço');
    console.log('4 - Remover Serviço');
    console.log('0 - Voltar');

    const opcao = readline.questionInt('Escolha uma opção: ');
    switch (opcao) {
      case 1: await listarServicos(); break;
      case 2: await adicionarServico(); break;
      case 3: await atualizarServico(); break;
      case 4: await removerServico(); break;
      case 0: return;
      default: console.log('Opção inválida.');
    }
  }
}

module.exports = {
  listarServicos,
  adicionarServico,
  atualizarServico,
  removerServico,
  menu
};
