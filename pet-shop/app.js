const readline = require('readline-sync');
const clienteCtrl = require('./clienteController');
const animalCtrl = require('./animalController');
const servicoCtrl = require('./servicoController');
const agendamentoCtrl = require('./agendamentoController');

async function menu() {
  while (true) {
    console.log(`
=== MENU PRINCIPAL ===
1 - Clientes
2 - Animais
3 - Serviços
4 - Agendamentos
0 - Sair
`);
    const opcao = readline.questionInt('Escolha o módulo: ');
    switch (opcao) {
      case 1: await clienteCtrl.menu(); break;
      case 2: await animalCtrl.menu(); break;
      case 3: await servicoCtrl.menu(); break;
      case 4: await agendamentoCtrl.menu(); break;
      case 0: process.exit();
      default: console.log('Opção inválida');
    }
  }
}
menu();