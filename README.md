# Grupo : Frank Cardoso, Lara Reck, Isabela Madeira

# 💼 PetShop – Sistema de Gerenciamento Veterinário

Este é um sistema de gerenciamento para um Pet Shop, com funcionalidades como cadastro de clientes, animais, serviços e agendamentos. O projeto utiliza **Node.js** com acesso a banco de dados **PostgreSQL** e interface de linha de comando via `readline-sync`.

---

## 🧱 Tecnologias Utilizadas

- Node.js
- PostgreSQL
- readline-sync
- SQL (procedures, views, triggers)

---

- ## 🗃️ Estrutura do Banco de Dados

O banco contém tabelas principais como:

- **Clientes**
- **Animais**
- **Raças**
- **Serviços**
- **Tipos de Serviço**
- **Funcionários**
- **Agendamentos**
- **Consultas**
- **Exames**
- **Preços**

---

## 🧭 Modelo Físico do Banco de Dados

Abaixo está o diagrama relacional representando as tabelas e seus relacionamentos:

![Modelo Físico do Banco de Dados](https://github.com/user-attachments/assets/92b9ed24-e95a-40a1-96b4-d8d32771e2ee)

---

## 📊 Views Criadas

- `view_agendamentos_completos`
- `view_animais_por_cliente`
- `view_servicos_com_precos`

---

## ⚙️ Procedures e Funções

- `calcula_total_agendamentos_cliente(p_id_cliente)`
- `cadastrar_novo_animal(...)`
- `atualizar_status_agendamento(...)`

---

## 🔔 Triggers

- Trigger de histórico de preço: grava log automaticamente na tabela `Precos` sempre que um serviço tem seu preço alterado.

---

## 📦 Estrutura do Projeto

```bash
pet-shop/
├── app.js
  banco/
    ├── banco.sql
├── db.js
├── clienteController.js
├── animalController.js
├── servicoController.js
├── agendamentoController.js
├── README.md
```
---

## ▶️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/frank-cardoso/trabalhoBanco-petshop.git
cd trabalhoBanco-petshop
```

### 2. Instale dependências

```bash
npm install
```

### 3. Configure o banco

```bash
Crie as tabelas no PostgreSQL usando os scripts .sql ou os CREATE TABLE no código.
```

### 4. Execute o projeto

```bash
node app.js
```

🧪 Funcionalidades
Cada módulo (clientes, animais, serviços, agendamentos) permite:

Listar

Adicionar

Atualizar

Remover


