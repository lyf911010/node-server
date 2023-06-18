const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    if (method === 'GET' && req.path === '/api/blog/list') {
        const { author = '', keyword = ''} = req.query
        const list = getList(author, keyword)
        return new SuccessModel(list)
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: 'blog detail'
        }
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: 'blog new'
        }
    }

    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'blog update'
        }
    }

    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: 'blog del'
        }
    }
}

module.exports = handleBlogRouter