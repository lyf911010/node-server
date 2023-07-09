const qs = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const SESSION_DATA = {}

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

    req.cookie = {}
    const cookies = req.headers.cookie || ''
    cookies.split(';').forEach(item => {
        if (!item) return
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[i].trim()
        req.cookie[key] = val
    });

    let needSetCookie = false
    let userId = req.cookie.userId
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
         userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }

    req.session = SESSION_DATA[userId]

    // handle post data
    getPostData(req).then(data => {
        req.body = data
        
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            blogData.then(data => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(data)
                )
            })
            return
        }
    
        const userData = handleUserRouter(req, res)
        if (userData) {
            userData.then(data => {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
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