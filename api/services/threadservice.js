const pool = require('../data/connection')

const getAllThreads = async () => {
    let result = await pool.query('SELECT * FROM "Threads"')
    return result.rows
}

const getThreadById = async (id) => {
    let result = await pool.query('SELECT * FROM "Threads" WHERE "Id" = $1', [id])
    return result.rows[0]
}

const addThread = async(thread) => {
    let result = await pool.query('INSERT INTO "Threads"("Title", "User_Id", "Content", "CreationDate") VALUES ($1, $2, $3, $4) RETURNING "Id"', 
                [thread.Title, thread.UserId, thread.Content, thread.CreationDate]);
    return result.rows[0].Id;
}

module.exports = {
    getAllThreads: getAllThreads,
    getThreadById: getThreadById,
    addThread: addThread
}