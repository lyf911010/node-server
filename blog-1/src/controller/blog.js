const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'xxx',
            content: 'xxxxxxxxx',
            createTime: new Date(),
            author: 'zhangsan'
        },
        {
            id: 2,
            title: 'xxx',
            content: 'xxxxxxxxx',
            createTime: new Date(),
            author: 'lisi'
        }
    ]
}

module.exports = {
    getList
}