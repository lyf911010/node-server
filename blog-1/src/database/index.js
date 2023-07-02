const { MYSQL_CONFIG } = require('../config/db')
const mysql = require('mysql')

const co = mysql.createConnection(MYSQL_CONFIG )

co.connect();

function exec(sql) {
    return new Promise((resolve, reject) => {
        co.query(sql, (err,res) => {
            if (err) {
                reject(err)
                return
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = {
    exec
}