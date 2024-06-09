const Joi = require("joi/lib")
const {login, register, forget_password, update_password} = require('../controller/authcontroller') 
const { validate } = require("uuid")
const { GetAllReport,  GetFilteredReports } = require("../controller/reportcontroller")

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
    },
    {
        method:'POST',
        path:'/update_password',
        handler: update_password,
        options:{
            validate:({
                payload:Joi.object({
                    email:Joi.string().email().required(),
                    old_password:Joi.string().required(),
                    new_password:Joi.string().required()
                })
            })
        }
    },
    {
        method: 'GET',
        path: '/laporan/all',
        handler: GetAllReport,
    },
    {
        method:'GET',
        path:'/laporan/filter/{kota}/{kecamatan}/{desa?}',
        handler: GetFilteredReports,
    }
    
]

module.exports = routes