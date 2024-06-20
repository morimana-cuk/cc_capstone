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
    const score = await prediction[0].dataSync();

    const classes = ['lubang','tamabalan','retak']

    const maxscore = Math.max(...score)
    const maxIndex = score.indexOf(maxscore) 
    const confidenceScore = maxscore * 100 
    const label = classes[maxIndex]  
    // Debugging: Log scores
    
    // Find the index of the maximum score
    
    // Debugging: Log label and confidence score
    console.log('Scores:', score);
    console.log("max score",maxscore)
    console.log('Max Index:', maxIndex);
    console.log('Label:', label);
    console.log('Confidence Score:', confidenceScore);

    return { confidenceScore, label };
}

module.exports = PrediksiKlasifikasi;