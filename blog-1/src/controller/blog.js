const { exec } = require('../database/index')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (data) => {
    const title = data.title
    const content = data.content
    const author = data.author
    const createTime = Date.now()

    const sql =  `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}');`
    return exec(sql).then(data => {
        console.log('data', data)
        return {
            id: data.insertId
        }
    })
}

const updateBlog = (id, data) => {
    const title = data.title
    const content = data.content

    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
    return exec(sql).then(data => {
        if (data.affectedRows) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(data => {
        console.log('del data', data)
        if (data.affectedRows) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}