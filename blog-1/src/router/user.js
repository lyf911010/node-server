const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel') 

const handleUserRouter = (req, res) => {
    const method = req.method
    
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return login(username, password).then(data => {
            if (data.username) {

                req.session.username = data.username
                req.session.realname = data.realname

                return new SuccessModel()
            } else {
                return new ErrorModel('login fail')
            }
        })
       
    }
}

module.exports = handleUserRouter