const pool = require('../data/connection')

const getAllUsers = async () => {
    let result = await pool.query('SELECT * FROM "Users"')
    return result.rows

    /*return pool.query('SELECT * FROM \"Users\"').then((result) => {
        return result.rows
    })*/
}

const getUserOfThread = async (userId) => {
    let result = await pool.query('SELECT * FROM "Users" WHERE "Id" = $1', [userId])

    return result.rows[0]
}

const addUser =  async (user) => {
    const result = await pool.query('INSERT INTO "Users"("Forename", "Lastname", "Email", "Password") VALUES ($1, $2, $3, $4) RETURNING "Id"', 
    [user.Forename, user.Lastname, user.Email, user.Password])
    return result.rows[0].Id
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserOfThread: getUserOfThread,
    addUser: addUser
}