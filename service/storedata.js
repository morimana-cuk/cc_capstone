const {Storage} = require('@google-cloud/storage')
const path = require('path')

const storage = new Storage();

const bucketname = process.env.GCLOUD_STORAGE_BUCKET


const uploadImage = async(file)=>{
    const bucket = storage.bucket(bucketname)
    const gcsFileName = `${Date.now()}_${file.hapi.filename}`;
    const blob = bucket.file(gcsFileName)
    

    const stream = blob.createWriteStream({
        resumable:false
    })

    await new Promise((resolve, reject) => {
        stream.on('finish',resolve)
        stream.on('error',reject)
        stream.end(file._data)
    })

    const publicurl = `https://storage.googleapis.com/${bucketname}/${gcsFileName}`;
    return publicurl

}

module.exports=uploadImage
