const tf = require('@tensorflow/tfjs-node');
const FileType = require('file-type');

async function PrediksiKlasifikasi(model, imageBuffer) {
    const type = await FileType.fromBuffer(imageBuffer);
    if (!type) {
        throw new Error('Gambar tidak valid atau format tidak didukung');
    }

    // Decode image based on its type
    let tensor;
    if (type.ext === 'png') {
        tensor = tf.node.decodePng(imageBuffer);
    } else if (type.ext === 'jpeg' || type.ext === 'jpg') {
        tensor = tf.node.decodeJpeg(imageBuffer);
    } else {
        throw new Error('Format gambar tidak didukung');
    }

    // Preprocess the image tensor
    tensor = tf.image.resizeNearestNeighbor(tensor, [300, 300]).expandDims().toInt();
    console.log(tensor);

    // Debugging: Check shape and dtype
    console.log('Tensor Shape:', tensor.shape);
    console.log('Tensor Dtype:', tensor.dtype);

    // Perform prediction using executeAsync
    const prediction = await model.executeAsync(tensor);
    console.log(prediction)
    // const score1 = await prediction[0].dataSync();
    const score2 = await prediction[1].dataSync();
    // const score3 = await prediction[2].dataSync();
    // const score5 = await prediction[5].dataSync();
    const score6 = await prediction[6].dataSync();
    // console.log('index ke 5')
    // console.log(score5)
    console.log('index ke 7 adalah nilai label')
    console.log(score6)

    // console.log(score1)
    console.log('confidance score',score2)
    // console.log(score3)

    const classes = ['','lubang','retak','tambalan']

    // const maxscore = Math.max(...score6)

    const maxIndex = score6[0] 
    const confidenceScore = score2[0] * 100 
    const label = classes[maxIndex]  
    // Debugging: Log scores
    
    // Find the index of the maximum score
    
    // Debugging: Log label and confidence score
    // console.log('Scores:', score);
    // console.log("max score",maxscore)
    console.log('Max Index:', maxIndex);
    console.log('Label:', label);
    console.log('Confidence Score:', confidenceScore);

    return  label ;
}

module.exports = PrediksiKlasifikasi;