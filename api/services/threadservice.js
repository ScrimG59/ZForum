const pool = require('../data/connection')

const getAllThreads = async () => {
    let result = await pool.query('SELECT * FROM "Threads"')
    return result.rows
}

const getThreadById = async (id) => {
    let result = await pool.query('SELECT * FROM "Threads" WHERE "Id" = $1', [id])
    return result.rows[0]
}

module.exports = {
    getAllThreads: getAllThreads,
    getThreadById: getThreadById
}