const env = process.env.NODE_ENV

let MYSQL_CONFIG = {}

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456789',
        port: 3306,
        database: 'blog-v1'
    }
}

module.exports = {
    MYSQL_CONFIG
}