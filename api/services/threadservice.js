const pool = require('../data/connection')

const getAllThreads = async () => {
    let result = await pool.query('SELECT * FROM \"Threads\"')
    return result.rows
}

module.exports = {
    getAllThreads: getAllThreads
}