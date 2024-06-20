const { Laporan } = require("../models/laporan");
const uploadImage = require("../service/storedata");
const PrediksiKlasifikasi = require("../service/PredictionService");

const upload_laporan = async (request, h) => {
    try {
        const { file } = request.payload;
        const { model } = request.server.app;
       

        // Get the prediction results
        const  label  = await PrediksiKlasifikasi(model, file._data);
        // console.log( {label} );
        console.log(label)
        const imageurl = await uploadImage(file); // Upload gambar dan dapatkan URL

        // Insert into database
        const laporan = await Laporan.create({
            id_laporan: Date.now().toString(),
            id_user: request.payload.id_user,
            tanggal: new Date(),
            kota: request.payload.kota,
            desa: request.payload.desa,
            kecamatan: request.payload.kecamatan,
            nama_jalan: request.payload.nama_jalan,
            keterangan_user: request.payload.keterangan_user,
            path_foto_laporan: imageurl,
            longitude: request.payload.longitude,
            latitude: request.payload.latitude,
            status: 'rusak',
            keterangan_ml: label // Set the ML label here
        });
        console.log(laporan)
        console.log('Laporan berhasil diunggah');
        return h.response(laporan).code(201);
    } catch (error) {
        console.error('Error uploading report:', error);
        return h.response({ error: 'Failed to upload report' }).code(500);
    }
};

module.exports = upload_laporan;
