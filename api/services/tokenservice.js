const pool = require('../data/connection')

const addRefreshToken = async (refreshToken) => {
    let result = await pool.query('INSERT INTO "RefreshTokens" VALUES ($1) RETURNING "Token"', [refreshToken])
    return result.rows[0].Token
}

const deleteRefreshToken = async(refreshToken) => {
    let result = await pool.query('DELETE FROM "RefreshTokens" WHERE "Token" = $1', [refreshToken])
    return result.rows[0]
}

const getRefreshToken = async (refreshToken) => {
    let result = await pool.query('SELECT * FROM "RefreshTokens" WHERE "Token" = $1', [refreshToken])
    return result.rows[0].Token
}

module.exports = {
    addRefreshToken,
    deleteRefreshToken,
    getRefreshToken
}