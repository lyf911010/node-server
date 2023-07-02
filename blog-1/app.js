const qs = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            return resolve({})
        }
        if (req.headers['content-type'] !== 'application/json') {
            return resolve({})
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                return resolve({})
            }

            resolve(JSON.parse(postData))
        })
    })
}


const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    const path = url.split('?')[0]
    req.path = path

    req.query = qs.parse(url.split('?')[1])

    // handle post data
    getPostData(req).then(data => {
        req.body = data
        
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            blogData.then(data => {
                res.end(
                    JSON.stringify(data)
                )
            })
            return
        }
    
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(data => {
                res.end(
                    JSON.stringify(data)
                )
            })
            return
        }
    
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found")
        res.end()
    })
}  

module.exports = serverHandle