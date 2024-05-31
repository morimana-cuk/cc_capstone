const Hapi = require('@hapi/hapi')
const routes = require('./route/routes')
require('dotenv').config();

const init = async ()=>{
    const server = Hapi.Server({
        port : 3000,
        host : 'localhost'
    })
    
    server.route(routes)
    
    await server.start()
console.log(`server sedang berjalan ${server.info.uri}`)

}

init()