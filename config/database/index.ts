import mysql2 from 'mysql2/promise'

const pool = mysql2.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 1
})

export default pool