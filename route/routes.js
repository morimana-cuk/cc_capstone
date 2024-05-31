const Joi = require("joi/lib")
const {login, register} = require('../controller/authcontroller') 

const routes =[
    {
        method:'POST',
        path:'/login',
        handler: login,
        options:{
            validate :{
                payload:Joi.object({
                    email:Joi.string().email().required(),
                    password:Joi.string().required()
                })
            }
        }
    },
    {
        method:'POST',
        path:'/register',
        handler:register,
        options:{
            validate:{
                payload:Joi.object({
                    username:Joi.string().required(),
                    email:Joi.string().email().required(),
                    password:Joi.string().required()
                })
            }
        }
    }
]

module.exports = routes