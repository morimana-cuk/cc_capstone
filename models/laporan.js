const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database')
const {User} = require('./user')

const Laporan = sequelize.define("laporan", {
    id_laporan:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    id_user:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:'user',
            key:'id'
        }
    },
    tanggal:{
        type:DataTypes.DATE,
        allowNull:false
    },
    kota:{
        type:DataTypes.STRING,
        allowNull:false
    },
    desa:{
        type:DataTypes.STRING,
        allowNull:false
    },
    kecamatan:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nama_jalan:{
        type:DataTypes.STRING,
        allowNull:false
    },
    keterangan:{
        type:DataTypes.STRING,
        allowNull:true
    },
    path_foto_laporan:{
        type:DataTypes.STRING,
        allowNull:false
    },
    longitude:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    latitude:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('diperbaiki','rusak'),
        defaultValue:'rusak',
        allowNull:false
    }
},{
        // Konfigurasikan opsi tambahan
        tableName: 'laporan', // Tentukan nama tabel yang digunakan oleh model
        timestamps: false // Set timestamps menjadi false jika tidak menggunakan timestamps pada tabel
})

User.hasMany(Laporan,{foreignKey:'id_user'})
Laporan.belongsTo(User,{foreignKey:'id_user'})

module.exports = {Laporan}