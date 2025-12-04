const mysql = require('mysql2/promise');
require('dotenv').config();

//cadena de conexion a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//funcion que permite crear las tablas de la bd, en caso tal que estas no esten creadas
async function initDb() {
    try {
        const connection = await pool.getConnection();

        //crear tabla task en la bd si esta no esta creada
        await connection.query(`
            CREATE TABLE IF NOT EXISTS task (
                id_task BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255),
                state TINYINT(1) NOT NULL DEFAULT 0,
                created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_date DATETIME ON UPDATE CURRENT_TIMESTAMP NULL
            );   
        `);

        connection.release();
        console.log('Base de datos inicializada correctamente');
    } catch (err) {
        console.error('Error al inicializar la base de datos:', err);
    }
}

initDb();

module.exports = pool;