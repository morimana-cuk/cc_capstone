const {User} = require('../models/user')
const {Laporan} = require('../models/laporan')


const GetAllReport  = async (request, h)=>{
    try {
        const AllReport = await Laporan.findAll({ 
            where: { status: 'rusak' }, 
            include: [{ model: User, attributes: ['nama_user'] }] 
        });
        return h.response({
            status: true,
            message: "berhasil",
            data: AllReport
        }).code(200);
    } catch (error) {
        console.log('error saat mengambil semua data', error);
        return h.response({
            status: false,
            message: "gagal menampilkan semua data"
        }).code(500);
    }
}

const GetFilteredReports = async(request,h)=>{
try {
    const {kota,kecamatan,desa} = request.params

    let filter = {}
    if(kota)filter.kota =kota
    if(kecamatan)filter.kecamatan=kecamatan
    if (desa)filter.desa = desa

    const report = filter 
    ? await Laporan.findAll({where:filter, status:'rusak' })
    :await Laporan.findAll({where:{status:'rusak'}})
    return h.response({
        status:true,
        message:'berhasil',
        data:report
    }).code(200)
} catch (error) {
    console.log('error saat sedang mengambil laporan dengna filter ', error)
    return h.response({
        status:false,
        message:'gagal',
    }).code(500)
}


}


module.exports = {GetAllReport, GetFilteredReports}