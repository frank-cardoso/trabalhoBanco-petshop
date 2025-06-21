const pool = require('./db');
const readline = require('readline-sync');

async function listarAgendamentos() {
  try {
    const res = await pool.query(`
      SELECT a.id_agendamento, an.nome AS animal, c.nome AS cliente, s.nome AS servico,
             f.nome AS funcionario, a.data_hora, a.status, a.observacoes
      FROM Agendamentos a
      JOIN Animais an ON a.id_animal = an.id_animal
      JOIN Clientes c ON an.id_cliente = c.id_cliente
      JOIN Servicos s ON a.id_servico = s.id_servico
      LEFT JOIN Funcionarios f ON a.id_funcionario = f.id_funcionario
      ORDER BY a.data_hora
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Erro ao listar agendamentos:', err.message);
  }
}

async function existeAnimal(id_animal) {
  const res = await pool.query('SELECT 1 FROM Animais WHERE id_animal = $1', [id_animal]);
  return res.rowCount > 0;
}

async function existeServico(id_servico) {
  const res = await pool.query('SELECT 1 FROM Servicos WHERE id_servico = $1', [id_servico]);
  return res.rowCount > 0;
}

async function existeFuncionario(id_funcionario) {
  if (id_funcionario === null) return true; // funcionário pode ser null
  const res = await pool.query('SELECT 1 FROM Funcionarios WHERE id_funcionario = $1', [id_funcionario]);
  return res.rowCount > 0;
}


async function adicionarAgendamento() {
  try {
    const id_animal = readline.questionInt('ID do animal: ');
    const id_servico = readline.questionInt('ID do serviço: ');
    const id_funcionario = readline.questionInt('ID do funcionário (0 para nenhum): ');
    const data_hora_str = readline.question('Data e hora (YYYY-MM-DD HH:mm:ss): ');
    const status = readline.question('Status (Agendado, Concluído, Cancelado): ');
    const observacoes = readline.question('Observações: ');

    const id_func = id_funcionario === 0 ? null : id_funcionario;

    if (!(await existeAnimal(id_animal))) {
      console.log(`Animal com ID ${id_animal} não existe.`);
      return;
    }
    if (!(await existeServico(id_servico))) {
      console.log(`Serviço com ID ${id_servico} não existe.`);
      return;
    }
    if (!(await existeFuncionario(id_func))) {
      console.log(`Funcionário com ID ${id_func} não existe.`);
      return;
    }

    await pool.query(
      `INSERT INTO Agendamentos (id_animal, id_servico, id_funcionario, data_hora, status, observacoes)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_animal, id_servico, id_func, data_hora_str, status, observacoes]
    );

    console.log('Agendamento adicionado com sucesso!');
  } catch (err) {
    console.error('Erro ao adicionar agendamento:', err.message);
  }
}

async function atualizarAgendamento() {
  try {
    const id = readline.questionInt('ID do agendamento a atualizar: ');
    const id_animal = readline.questionInt('Novo ID do animal: ');
    const id_servico = readline.questionInt('Novo ID do serviço: ');
    const id_funcionario = readline.questionInt('Novo ID do funcionário (0 para nenhum): ');
    const data_hora_str = readline.question('Nova data e hora (YYYY-MM-DD HH:mm:ss): ');
    const status = readline.question('Novo status (Agendado, Concluído, Cancelado): ');
    const observacoes = readline.question('Novas observações: ');

    const id_func = id_funcionario === 0 ? null : id_funcionario;

    if (!(await existeAnimal(id_animal))) {
      console.log(`Animal com ID ${id_animal} não existe.`);
      return;
    }
    if (!(await existeServico(id_servico))) {
      console.log(`Serviço com ID ${id_servico} não existe.`);
      return;
    }
    if (!(await existeFuncionario(id_func))) {
      console.log(`Funcionário com ID ${id_func} não existe.`);
      return;
    }

    await pool.query(
      `UPDATE Agendamentos
       SET id_animal=$1, id_servico=$2, id_funcionario=$3, data_hora=$4, status=$5, observacoes=$6
       WHERE id_agendamento=$7`,
      [id_animal, id_servico, id_func, data_hora_str, status, observacoes, id]
    );

    console.log('Agendamento atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar agendamento:', err.message);
  }
}

async function removerAgendamento() {
  try {
    const id = readline.questionInt('ID do agendamento a remover: ');
    await pool.query('DELETE FROM Agendamentos WHERE id_agendamento=$1', [id]);
    console.log('Agendamento removido com sucesso!');
  } catch (err) {
    console.error('Erro ao remover agendamento:', err.message);
  }
}

async function menu() {
  while (true) {
    console.log('\n=== MENU AGENDAMENTOS ===');
    console.log('1 - Listar Agendamentos');
    console.log('2 - Adicionar Agendamento');
    console.log('3 - Atualizar Agendamento');
    console.log('4 - Remover Agendamento');
    console.log('0 - Voltar');

    const opcao = readline.questionInt('Escolha uma opção: ');
    switch (opcao) {
      case 1: await listarAgendamentos(); break;
      case 2: await adicionarAgendamento(); break;
      case 3: await atualizarAgendamento(); break;
      case 4: await removerAgendamento(); break;
      case 0: return;
      default: console.log('Opção inválida.');
    }
  }
}

module.exports = {
  listarAgendamentos,
  adicionarAgendamento,
  atualizarAgendamento,
  removerAgendamento,
  menu
};
