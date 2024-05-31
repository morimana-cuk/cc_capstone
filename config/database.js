require('dotenv').config();
const {Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, "root", process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    database: process.env.DATABASE_NAME,
    logging: (msg) => console.log(msg),
});


const tesconnection = async()=>{
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('tidak terhubung dengan database')
        console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
        console.log('DATABASE_USER:', process.env.DATABASE_USER);
        console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
        console.log('DATABASE_name:', process.env.DATABASE_NAME);



        console.log(error)
    }
}
tesconnection()

module.exports = {sequelize}