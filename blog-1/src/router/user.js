const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel') 
 
 
 const handleUserRouter = (req, res) => {
    const method = req.method
    
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return loginCheck(username, password).then(data => {
            if (data.username) {
                return new SuccessModel()
            } else {
                return new ErrorModel('login fail')
            }
        })
       
    }
}

module.exports = handleUserRouter