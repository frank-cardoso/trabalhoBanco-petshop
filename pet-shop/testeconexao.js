const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexão bem-sucedida! Horário atual:', res.rows[0]);
  } catch (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } finally {
    pool.end();
  }
})();