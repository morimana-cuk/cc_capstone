const Joi = require("joi/lib")
const {login, register, forget_password, update_password} = require('../controller/authcontroller') 
const { validate } = require("uuid")
const { GetAllReport,  GetFilteredReports, UpdateStatusReport } = require("../controller/reportcontroller")
const upload_laporan = require("../controller/upload_imagecontroller")

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
        path:'/laporan/filter/{type}/{value}',
        handler: GetFilteredReports,
    },
    {
        method:'POST',
        path:'/upload',
        handler:upload_laporan,
        options:{
            payload:{
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 10 * 1024 * 1024, // 10MB
            }
        }
    },
    {
        method:"POST",
        path:"/UpdateStatus",
        handler:UpdateStatusReport
    }
     // {
    //     method:'GET',
    //     path:'/laporan/filter/{kota}/{kecamatan}/{desa?}',
    //     handler: GetFilteredReports,
    // },
    // {
    //     method:'GET', 
    //     path:'/laporan/filter/kota/{kota}',
    //     handler:GetFilteredReportsKota,
    // },
    // {
    //     method:'GET',
    //     path:'/laporan/filter/kecamatan/{kecamatan}',
    //     handler:GetFilteredReportsKecamatan,
    // },
    // {
    //     method:'GET',
    //     path:'/laporan/filter/desa/{desa}',
    //     handler:GetFilteredReportsDesa,
    // }
    // {
    //     method:'GET',
    //     path:'/laporan/filter/{desa}',
    //     handler:,
    // }
    
]

module.exports = routes