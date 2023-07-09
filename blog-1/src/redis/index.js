const { createClient } = require('redis')

const client = createClient()

client.on('error', err => console.log('redis error', err))

// 连接redis
!(async function() {
    await client.connect()
})()

async function set(key, val) {
    await client.set(key, val)
}

async function get(key) {
    try {
        let val = await client.get(key)
        return val
    } catch (error) {
        throw error        
    }
    
}

module.exports = {
    set,
    get,
}