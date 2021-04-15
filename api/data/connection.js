const Pool = require("pg").Pool
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ZForum_dev',
    password: '68589bmm',
    port: 5432
})

module.exports = db;