const tf = require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');

async function loadModel() {
    const MODEL_URL = process.env.MODEL_URL;
    if (!MODEL_URL) {
        throw new Error('MODEL_URL is not defined in the environment variables.');
    }

    const controller = new AbortController();
    const timeout = 300000; // 5 minutes
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            console.log(`Fetching model from: ${MODEL_URL}`);
            const response = await fetch(MODEL_URL, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Response received. Loading model...');
            const model = await tf.loadGraphModel(MODEL_URL);
            console.log('Model loaded successfully.');
            return model;
        } catch (error) {
            if (error.name === 'AbortError' || error.code === 'UND_ERR_CONNECT_TIMEOUT') {
                console.warn(`Attempt ${attempt + 1} failed. Retrying...`);
                attempt++;
            } else {
                console.error('Error loading model:', error);
                throw error;
            }
        }
    }
    throw new Error('Failed to load model after multiple attempts');
}

module.exports = loadModel;
