const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    if (method === 'GET' && req.path === '/api/blog/list') {
        const { author = '', keyword = ''} = req.query
        const result = getList(author, keyword)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        return getDetail(id).then(data => {
            return new SuccessModel(data) 
        })
    }

    if (method === 'POST' && req.path === '/api/blog/new') {
        let data = req.body
        data.author = 'leon'
        return newBlog(data).then(rs => {
            return new SuccessModel(rs)
        })
    }

    if (method === 'POST' && req.path === '/api/blog/update') {
        const data = req.body
        const id = req.query.id
        return updateBlog(id, data).then(rs => {
            if (rs) {
                return new SuccessModel()
            } else {
                return new ErrorModel('失败')
            }
        })
        
    }

    if (method === 'POST' && req.path === '/api/blog/del') {
        const id = req.query.id
        const author = 'leon'
        return delBlog(id, author).then(rs => {
            if (rs) {
                return new SuccessModel()
            } else {
                return new ErrorModel('失败')
            }
        })
    }
}

module.exports = handleBlogRouter