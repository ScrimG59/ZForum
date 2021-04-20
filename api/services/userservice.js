const pool = require('../data/connection')

const getAllUsers = async () => {
    let result = await pool.query('SELECT * FROM "Users"')
    return result.rows

    /*return pool.query('SELECT * FROM \"Users\"').then((result) => {
        return result.rows
    })*/
}

const getUserById = async (userId) => {
    let result = await pool.query('SELECT * FROM "Users" WHERE "Id" = $1', [userId])

    return result.rows[0]
}

const addUser =  async (user) => {
    const result = await pool.query('INSERT INTO "Users"("Username", "Email", "Password") VALUES ($1, $2, $3) RETURNING "Id"', 
    [user.Username, user.Email, user.Password])
    return result.rows[0].Id
}

const deleteUser = async (userId) => {
    // if user gets delete, all threads and posts this user created have also to get deleted
    let result = await pool.query('DELETE FROM "Users" WHERE "Id" = $1 RETURNING "Id"', [userId])
    return result.rows[0].Id
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    addUser: addUser
}