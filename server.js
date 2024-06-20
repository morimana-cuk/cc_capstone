const Hapi = require('@hapi/hapi')
const routes = require('./route/routes')
require('dotenv').config();
const loadmodel = require('./service/loadmodel');

const init = async ()=>{
    const server = Hapi.Server({
        port : process.env.PORT || 3000,
        host : '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
            payload: {
                maxBytes: 10 * 1024 * 1024, // 10MB
                multipart: true
            }
        },
    })
    try {
        const model = await loadmodel();
        console.log('model berhasil di load')
        server.app.model = model;
    } catch (error) {
        console.error('Error loading model:', error);
        process.exit(1); // Exit the process with an error code
    }
    server.route(routes)
    
    await server.start()
console.log(`server sedang berjalan ${server.info.uri}`)

}

init()