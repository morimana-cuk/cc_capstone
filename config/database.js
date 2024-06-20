require('dotenv').config();
const {Sequelize } = require('sequelize')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    database: process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    logging: (msg) => console.log(msg),
});



const tesconnection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(error)
        console.log('tidak terhubung dengan database')
        console.log('DATABASE_PASSWORD:', process.env.DB_PASSWORD);
        console.log('DATABASE_USER:', process.env.DB_USER);
        console.log('DATABASE_INSTANCE_CONNECTION_NAME:', process.env.INSTANCE_CONNECTION_NAME);
        console.log('DATABASE_name:', process.env.DB_NAME);
        console.log('host: ',process.env.DB_HOST)



        console.log(error)
    }
}
tesconnection()

module.exports = {sequelize}