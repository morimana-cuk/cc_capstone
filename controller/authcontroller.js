const Bcrypt = require('bcrypt')
const {User} = require('../models/user')
const {v4: uuidv4} = require('uuid');


const login = async (request, h) =>{
    const {email, password} = request.payload;
    try {
        const user = await User.findOne({where:{email:email}})
    if (!user) {
        return h.response({
            message:"invalid email or password"
        }).code(401)
    }
    const isvalid = await Bcrypt.compare(password, user.password)
    if (!isvalid) {
        return h.response({
            message:"invalid email or password"
        }).code(401)
    }

    return h.response({
        message:"login success",
        user:{
            id:user.id,
            nama_user:user.nama_user,
            email:user.email,
            password:user.password
        }
    })
    } catch (error) {
        console.log('login error', error)
        return h.response({
            message:"server error"
        }).code(500)
    }
    
}


const register = async(request, h)=>{
    const { email,username, password} = request.payload;
    try {
        const existinguser =await User.findOne({where:{email}})
    if (existinguser) {
        return h.response({
            message:"email sudah terdaftar"
        }).code(400)
    }
    
    const hashedPassword = await Bcrypt.hash(password, 12)
    const iduser = uuidv4()

    console.log('Creating User with:', {
        id: iduser,
        nama_user: username,
        email,
        password: hashedPassword
    });

   const newuser =  await User.create({
        id:iduser,
        nama_user:username,
        email,
        password:hashedPassword
    })
    console.log('User created:', newuser);

    return h.response({
        status:true,
        message:"user berhasil terdaftar"
    }).code(201)

    } catch (error) {
        console.error('Error during registration:', error);
        return h.response({
            status: false,
            message: "Terjadi kesalahan server"
        }).code(500);
    }
    
}
module.exports = {login, register}