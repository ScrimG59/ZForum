const pool = require('../data/connection')


// gets the posts from a certain thread
const getPostsbyThreadId = async (threadId) => {
    const result = await pool.query('SELECT * FROM "Posts" WHERE "Thread_Id" = $1', [threadId])
    return result.rows
}

// gets the ten latest posts of the whole forum
const getLatestPosts = async () => {
    const result = await pool.query('SELECT * FROM "Posts" ORDER BY "CreationDate" DESC LIMIT 10')
    return result.rows
}

const addPost = async (post) => {
    const result = await pool.query('INSERT INTO "Posts"("Content", "User_Id", "Thread_Id", "CreationDate") VALUES ($1, $2, $3, $4) RETURNING "Id"', 
                                    [post.Content, post.UserId, post.ThreadId, post.CreationDate])
    return result.rows[0].Id
}

module.exports = {
    getPostsbyThreadId: getPostsbyThreadId,
    getLatestPosts: getLatestPosts,
    addPost: addPost
}