const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database')

const User = sequelize.define('user',{
    id: {
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
        unique:true
    },
    nama_user:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[5, 100]
        }
    },
    path_foto_profil:{
        type:DataTypes.STRING,
        allowNull:true,
    }
   
}, {
    // Konfigurasikan opsi tambahan
    tableName: 'user', // Tentukan nama tabel yang digunakan oleh model
    timestamps: false // Set timestamps menjadi false jika tidak menggunakan timestamps pada tabel
});


module.exports = {User}