-- Criação Base Tabelas :))))

CREATE TABLE Clientes (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco VARCHAR(200)
);

CREATE TABLE Racas (
    id_raca SERIAL PRIMARY KEY,
    especie VARCHAR(50) NOT NULL,
    nome_raca VARCHAR(50) NOT NULL
);

CREATE TABLE Animais (
    id_animal SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    id_cliente INT NOT NULL,
    id_raca INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_raca) REFERENCES Racas(id_raca)
);

CREATE TABLE Tipos_Servico (
    id_tipo_servico SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE Servicos (
    id_servico SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    id_tipo_servico INT,
    FOREIGN KEY (id_tipo_servico) REFERENCES Tipos_Servico(id_tipo_servico)
);

CREATE TABLE Funcionarios (
    id_funcionario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    telefone VARCHAR(20)
);

CREATE TABLE Agendamentos (
    id_agendamento SERIAL PRIMARY KEY,
    id_animal INT NOT NULL,
    id_servico INT NOT NULL,
    id_funcionario INT,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'Agendado' CHECK (status IN ('Agendado', 'Concluído', 'Cancelado')),
    observacoes TEXT,
    FOREIGN KEY (id_animal) REFERENCES Animais(id_animal),
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico),
    FOREIGN KEY (id_funcionario) REFERENCES Funcionarios(id_funcionario)
);

CREATE TABLE Consultas (
    id_consulta SERIAL PRIMARY KEY,
    id_agendamento INT NOT NULL,
    diagnostico TEXT,
    receita TEXT,
    observacoes TEXT,
    FOREIGN KEY (id_agendamento) REFERENCES Agendamentos(id_agendamento)
);

CREATE TABLE Exames (
    id_exame SERIAL PRIMARY KEY,
    id_agendamento INT NOT NULL,
    tipo_exame VARCHAR(100) NOT NULL,
    resultado TEXT,
    data_resultado TIMESTAMP,
    FOREIGN KEY (id_agendamento) REFERENCES Agendamentos(id_agendamento)
);

CREATE TABLE Precos (
    id_preco SERIAL PRIMARY KEY,
    id_servico INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    data_inicio TIMESTAMP NOT NULL DEFAULT NOW(),
    data_fim TIMESTAMP,
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico)
);

-- Inserts :) 

-- Tabela Clientes
INSERT INTO Clientes (id_cliente, nome, telefone, email, endereco) VALUES
(1, 'Ana Souza', '11999999991', 'ana@gmail.com', 'Rua A, 123'),
(2, 'Carlos Silva', '21999999992', 'carlos@gmail.com', 'Rua B, 456'),
(3, 'Beatriz Costa', '31999999993', 'beatriz@gmail.com', 'Rua C, 789'),
(4, 'Fernando Lima', '41999999994', 'fernando@gmail.com', 'Rua D, 321'),
(5, 'Juliana Rocha', '51999999995', 'juliana@gmail.com', 'Rua E, 654'),
(6, 'Marcos Andrade', '61999999996', 'marcos@gmail.com', 'Rua F, 987'),
(7, 'Paula Nunes', '71999999997', 'paula@gmail.com', 'Rua G, 147'),
(8, 'Rafael Gomes', '81999999998', 'rafael@gmail.com', 'Rua H, 258'),
(9, 'Tatiane Oliveira', '91999999999', 'tatiane@gmail.com', 'Rua I, 369'),
(10, 'Vinicius Mendes', '11999999990', 'vinicius@gmail.com', 'Rua J, 741');

-- Tabela Raças
INSERT INTO Racas (especie, nome_raca) VALUES
('Cão', 'Labrador Retriever'),
('Cão', 'Bulldog Francês'),
('Cão', 'Poodle'),
('Gato', 'Siamês'),
('Gato', 'Persa'),
('Gato', 'Maine Coon'),
('Cão', 'Golden Retriever'),
('Cão', 'Beagle'),
('Gato', 'Sphynx'),
('Cão', 'Shih Tzu');

-- Tabela Animais 
INSERT INTO Animais (nome, idade, id_cliente, id_raca) VALUES
('Toby', 3, 1, 1),
('Luna', 2, 2, 4),
('Bob', 5, 3, 7),
('Mia', 4, 4, 5),
('Thor', 1, 5, 2),
('Nina', 7, 6, 6),
('Max', 6, 7, 3),
('Lola', 2, 8, 8),
('Simba', 3, 9, 9),
('Chico', 4, 10, 10);

-- Tabela Tipos Servicos

INSERT INTO Tipos_Servico (nome, descricao) VALUES
('Consulta', 'Atendimento veterinário para avaliação do animal'),
('Exame', 'Procedimentos laboratoriais e diagnósticos'),
('Vacinação', 'Aplicação de vacinas para prevenção de doenças'),
('Banho e Tosa', 'Serviços de higiene e estética'),
('Cirurgia', 'Procedimentos cirúrgicos veterinários'),
('Atendimento de Emergência', 'Atendimento imediato e emergencial'),
('Check-up', 'Avaliação completa do estado de saúde'),
('Terapia', 'Tratamentos e fisioterapia'),
('Dentista Veterinário', 'Cuidados odontológicos para pets'),
('Consulta Online', 'Atendimento remoto via videoconferência');

-- Tabela Serviços

INSERT INTO Servicos (nome, descricao, preco, id_tipo_servico) VALUES
('Consulta Geral', 'Avaliação clínica completa', 150.00, 1),
('Hemograma Completo', 'Exame laboratorial de sangue', 120.00, 2),
('Vacina Antirrábica', 'Vacina para prevenção da raiva', 80.00, 3),
('Banho Completo', 'Banho e tosa básica', 90.00, 4),
('Cirurgia de Castração', 'Procedimento cirúrgico', 500.00, 5),
('Atendimento Emergencial', 'Atendimento 24h para emergências', 200.00, 6),
('Check-up Anual', 'Exame físico e laboratorial completo', 300.00, 7),
('Fisioterapia', 'Tratamento fisioterápico para recuperação', 180.00, 8),
('Limpeza Dental', 'Tratamento odontológico', 220.00, 9),
('Consulta Online', 'Consulta veterinária via internet', 100.00, 10);

-- Tabela Funcionarios 

INSERT INTO Funcionarios (nome, cargo, telefone) VALUES
('Marcos Silva', 'Veterinário', '11987654322'),
('Patricia Alves', 'Técnica em Veterinária', '21987654323'),
('Roberto Dias', 'Atendente', '31987654324'),
('Fernanda Souza', 'Veterinária', '41987654325'),
('Lucas Pereira', 'Auxiliar', '51987654326'),
('Joana Martins', 'Recepcionista', '61987654327'),
('Ricardo Gomes', 'Veterinário', '71987654328'),
('Amanda Lima', 'Tosadora', '81987654329'),
('Carlos Henrique', 'Técnico de Laboratório', '91987654330'),
('Sonia Rocha', 'Veterinária', '11987654331');

-- Tabela Agendamentos 

INSERT INTO Agendamentos (id_animal, id_servico, id_funcionario, data_hora, status, observacoes) VALUES
(1, 1, 1, '2025-06-10 10:00:00', 'Agendado', 'Primeira consulta do animal'),
(2, 2, 3, '2025-06-11 14:30:00', 'Concluído', 'Exame de rotina'),
(3, 3, 2, '2025-06-12 09:00:00', 'Cancelado', 'Vacinação adiada'),
(4, 4, 8, '2025-06-13 15:00:00', 'Agendado', 'Banho completo agendado'),
(5, 5, 1, '2025-06-14 08:30:00', 'Concluído', 'Castração realizada'),
(6, 6, 7, '2025-06-15 20:00:00', 'Agendado', 'Atendimento emergencial'),
(7, 7, 4, '2025-06-16 11:00:00', 'Agendado', 'Check-up anual'),
(8, 8, 2, '2025-06-17 14:00:00', 'Agendado', 'Sessão de fisioterapia'),
(9, 9, 9, '2025-06-18 13:30:00', 'Concluído', 'Limpeza dental'),
(10, 10, 10, '2025-06-19 16:00:00', 'Agendado', 'Consulta online agendada');


-- VIEW 01
CREATE OR REPLACE VIEW view_agendamentos_completos AS
SELECT
    a.id_agendamento,
    cl.nome AS cliente,
    an.nome AS animal,
    s.nome AS servico,
    f.nome AS funcionario,
    a.data_hora,
    a.status
FROM Agendamentos a
JOIN Animais an ON a.id_animal = an.id_animal
JOIN Clientes cl ON an.id_cliente = cl.id_cliente
JOIN Servicos s ON a.id_servico = s.id_servico
LEFT JOIN Funcionarios f ON a.id_funcionario = f.id_funcionario;

SELECT * FROM view_agendamentos_completos;

-- Vai facilitar consultas completas sobre agendamentos com todos dados em uma só visualização

-- VIEW 02
CREATE OR REPLACE VIEW view_animais_por_cliente AS
SELECT
    c.nome AS cliente,
    a.nome AS animal,
    a.idade,
    r.nome_raca,
    r.especie
FROM Animais a
JOIN Clientes c ON a.id_cliente = c.id_cliente
JOIN Racas r ON a.id_raca = r.id_raca;

SELECT * FROM view_animais_por_cliente;

-- Oferece uma listagem dos animais e seus respectivos clientes, além de facilitar a visualização dos dados, daria para criar um relatorio por exemplo ou atendimento

-- VIEW 03

CREATE OR REPLACE VIEW view_servicos_com_precos AS
SELECT
    s.nome AS servico,
    t.nome AS tipo,
    s.preco
FROM Servicos s
JOIN Tipos_Servico t ON s.id_tipo_servico = t.id_tipo_servico;

SELECT * FROM view_servicos_com_precos;

-- Agrupa serviços, tipos e preços, é bom para exibição em sistemas ou dashboards

-- FUNÇÕES / PROCEDURES 01
CREATE OR REPLACE FUNCTION calcula_total_agendamentos_cliente(p_id_cliente INT)
RETURNS INT AS $$
DECLARE
    total INT;
BEGIN
    SELECT COUNT(*) INTO total
    FROM Agendamentos a
    JOIN Animais an ON a.id_animal = an.id_animal
    WHERE an.id_cliente = p_id_cliente;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

SELECT calcula_total_agendamentos_cliente(1);

-- Vai permitir obter o numero total dee agendamentos de um cliente útil para relatórios e acompanhamento do histórico de atendimentos.


-- FUNÇÕES / PROCEDURES 02 
CREATE OR REPLACE PROCEDURE cadastrar_novo_animal(
    nome VARCHAR,
    idade INT,
    id_cliente INT,
    id_raca INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO animais (nome, idade, id_cliente, id_raca)
    VALUES (nome, idade, id_cliente, id_raca);
END;
$$;

CALL cadastrar_novo_animal('Bolt', 2, 1, 3);
SELECT * FROM animais;
	
-- Facilitação no processo de cadastro do animal

-- FUNÇÕES / PROCEDURES 03 
CREATE OR REPLACE PROCEDURE atualizar_status_agendamento(
    p_id_agendamento INT,
    p_novo_status TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE agendamentos
    SET status = p_novo_status
    WHERE id_agendamento = p_id_agendamento;
END;
$$;

CALL atualizar_status_agendamento(3, 'Agendado');
SELECT * FROM agendamentos;

-- Melhor controle na atualização de status, também garantindo a integridade com a lógica

-- TRIGGER 01
CREATE OR REPLACE FUNCTION log_novo_preco()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Precos (id_servico, preco, data_inicio)
    VALUES (NEW.id_servico, NEW.preco, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_preco_log
AFTER UPDATE OF preco ON Servicos
FOR EACH ROW
WHEN (OLD.preco IS DISTINCT FROM NEW.preco)
EXECUTE FUNCTION log_novo_preco();

-- Teste
UPDATE Servicos
SET preco = preco + 10
WHERE id_servico = 1;

SELECT p.*, s.nome, s.descricao
FROM Precos p
JOIN Servicos s ON p.id_servico = s.id_servico
ORDER BY p.data_inicio DESC;

-- Log para atualização de preço, garante que seja armazenados automaticamente no historico, por exemplo se quiser voltar para o preco anterior.

-- Indices 

CREATE INDEX idx_agendamentos_id_animal ON Agendamentos(id_animal);

-- Melhora o desempenho em consultas que filtram ou fazem JOIN por id_animal, por exemplo:
SELECT * FROM Agendamentos WHERE id_animal = 5;

CREATE INDEX idx_animais_id_cliente ON Animais(id_cliente);

-- Otimiza consultas que buscam animais de um cliente específico, ou JOINs com a tabela Clientes:
SELECT * FROM Animais WHERE id_cliente = 2;

CREATE INDEX idx_agendamentos_data_hora ON Agendamentos(data_hora);

-- Acelera buscas por data/hora, úteis em relatórios, listagens por agenda, ou consultas como:
SELECT * FROM Agendamentos WHERE data_hora >= '2025-06-10';

EXPLAIN ANALYZE SELECT * FROM Agendamentos WHERE id_animal = 5;
