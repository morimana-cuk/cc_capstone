const {User} = require('../models/user')
const {Laporan} = require('../models/laporan')


const GetAllReport  = async (request, h)=>{
    try {
        const AllReport = await Laporan.findAll({ 
            where: { status: 'rusak' }, 
            include: { model: User, attributes: ['nama_user'] } 
        });
        const formattedReports = AllReport.map(report => {
            return {
                id_laporan: report.id_laporan,
                id_user: report.id_user,
                tanggal: report.tanggal,
                kota: report.kota,
                desa: report.desa,
                kecamatan: report.kecamatan,
                nama_jalan: report.nama_jalan,
                keterangan_user: report.keterangan_user,
                path_foto_laporan: report.path_foto_laporan,
                longitude: report.longitude,
                latitude: report.latitude,
                status: report.status,
                keterangan_ml: report.keterangan_ml,
                user: report.user.nama_user  // Flatten the user object
            }
        });
        return h.response({
            status: true,
            message: "berhasil",
            data: formattedReports
        }).code(200);
    } catch (error) {
        console.log('error saat mengambil semua data', error);
        return h.response({
            status: false,
            message: "gagal menampilkan semua data"
        }).code(500);
    }
}

const GetFilteredReports = async (request, h) => { // Deklarasi fungsi asinkron bernama GetFilteredReports dengan dua parameter: request dan h
    try { // Mulai blok try untuk menangani eksekusi kode utama
        const { type, value } = request.params; // Mendestrukturisasi objek params dari objek request untuk mendapatkan nilai type dan value
        console.log('Type:', type); // Log untuk memeriksa nilai type
        console.log('Value:', value); // Log untuk memeriksa nilai value

        let filter = { status: 'rusak' }; // Inisialisasi objek filter dengan filter default status 'rusak'

        if (type === 'kota') filter.kota = value; // Jika tipe filter adalah 'kota', tambahkan filter untuk kota dengan nilai yang diterima dari parameter
        if (type === 'kecamatan') filter.kecamatan = value; // Jika tipe filter adalah 'kecamatan', tambahkan filter untuk kecamatan dengan nilai yang diterima dari parameter
        if (type === 'desa') filter.desa = value; // Jika tipe filter adalah 'desa', tambahkan filter untuk desa dengan nilai yang diterima dari parameter

        const reports = await Laporan.findAll({ where: filter}); // Mencari laporan-laporan yang sesuai dengan filter yang telah dibuat sebelumnya menggunakan model Laporan
        console.log('report', reports)
        if (reports.length === 0) { // Jika tidak ada laporan yang cocok dengan filter
            return h.response({ // Kembalikan tanggapan dengan status false dan pesan 'gagal'
                status: false,
                message: 'gagal',
            }).code(404); // Menggunakan kode status 404 untuk Not Found
        }

        return h.response({ // Jika laporan-laporan telah ditemukan
            status: true,
            message: 'berhasil',
            data: reports // Kembalikan tanggapan dengan status true, pesan 'berhasil', dan data laporan yang cocok
        }).code(200); // Menggunakan kode status 200 untuk OK
    } catch (error) { // Menangkap dan menangani kesalahan yang mungkin terjadi saat menjalankan operasi di dalam blok try
        console.log('error saat sedang mengambil laporan dengan filter', error); // Cetak pesan kesalahan ke konsol
        return h.response({ // Kembalikan tanggapan dengan status false dan pesan 'gagal'
            status: false,
            message: 'gagal',
        }).code(500); // Menggunakan kode status 500 untuk Internal Server Error
    }
};

const UpdateStatusReport = async (request, h) => {
    const { id_laporan, status } = request.payload;
    try {
        const report = await Laporan.findOne({ where: { id_laporan } });
        if (!report) {
            return h.response({
                status: false,
                message: "Laporan tidak ditemukan"
            }).code(400);
        }

        // Update status laporan
        report.status = status;
        await report.save();

        return h.response({
            status: true,
            message: "Status berhasil diubah",
            data: report
        }).code(200);
    } catch (error) {
        console.error('Error saat mengupdate status:', error);
        return h.response({
            status: false,
            message: "Gagal mengupdate status"
        }).code(500);
    }
};

// const GetFilteredReports = async(request,h)=>{
// try {
//     const {kota,kecamatan,desa} = request.params

//     let filter = {}
//     if(kota)filter.kota =kota
//     if(kecamatan)filter.kecamatan=kecamatan
//     if (desa)filter.desa = desa

//     const report = filter 
//     ? await Laporan.findAll({where:filter, status:'rusak' })
//     :await Laporan.findAll({where:{status:'rusak'}})
//     return h.response({
//         status:true,
//         message:'berhasil',
//         data:report
//     }).code(200)
// } catch (error) {
//     console.log('error saat sedang mengambil laporan dengna filter ', error)
//     return h.response({
//         status:false,
//         message:'gagal',
//     }).code(500)
// }


// }

// const GetFilteredReports = async (request, h) => {
//     try {
//         const { kota, kecamatan, desa } = request.query;
//         let filter = {};

//         if (kota) filter.kota = kota;
//         if (kecamatan) filter.kecamatan = kecamatan;
//         if (desa) filter.desa = desa;

//         const reports = await Laporan.findAll({ where: { ...filter, status: 'rusak' } });

//         return h.response({
//             status: true,
//             message: 'berhasil',
//             data: reports
//         }).code(200);
//     } catch (error) {
//         console.log('error saat sedang mengambil laporan dengan filter', error);
//         return h.response({
//             status: false,
//             message: 'gagal',
//         }).code(500);
//     }
// };

// const GetFilteredReportsKota = async(request, h)=>{
//     try {
//         const {kota} = request.params
//         let filter={}
//         if(kota)filter.kota=kota
    
//         const report = filter
//         ? await Laporan.findAll({where:filter, status:'rusak' })
//         :await Laporan.findAll({where:{status:'rusak'}})
//         return h.response({
//             status:true,
//             message:'berhasil',
//             data:report
//         }).code(200)   
//     } catch (error) {
//         console.log('error saat sedang mengambil laporan dengan filter kota',error)
//         return h.response({
//             status:false,
//             message:'gagal',
//         }).code(500)
//     }
// }

// const GetFilteredReportsKecamatan = async(request, h)=>{
//     try {
//         const {kecamatan} = request.params
//         let filter={}
//         if(kecamatan)filter.kecamatan=kecamatan
    
//         const report = filter
//         ? await Laporan.findAll({where:filter, status:'rusak' })
//         :await Laporan.findAll({where:{status:'rusak'}})
//         return h.response({
//             status:true,
//             message:'berhasil',
//             data:report
//         }).code(200)   
//     } catch (error) {
//         console.log('error saat sedang mengambil laporan dengan filter kecamatan',error)
//         return h.response({
//             status:false,
//             message:'gagal',
//         }).code(500)
//     }
// }

// const GetFilteredReportsDesa = async(request, h)=>{
//     try {
//         const {Desa} = request.params
//         let filter={}
//         if(Desa)filter.Desa=Desa
    
//         const report = filter
//         ? await Laporan.findAll({where:filter, status:'rusak' })
//         :await Laporan.findAll({where:{status:'rusak'}})
//         return h.response({
//             status:true,
//             message:'berhasil',
//             data:report
//         }).code(200)   
//     } catch (error) {
//         console.log('error saat sedang mengambil laporan dengan filter Desa',error)
//         return h.response({
//             status:false,
//             message:'gagal',
//         }).code(500)
//     }
// }
module.exports = {GetAllReport, GetFilteredReports,UpdateStatusReport}