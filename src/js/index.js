if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import ImageClassifier from './classes/ImageClassifier';
import createVideo from './createVideo';
import '../css/style.css';

const video = createVideo('videoElement');
const imgClassifier = new ImageClassifier(video);

let sampler = null;
let predictor = null;
const interval = 50;

const sample = label => {
    if(!sampler) {
        console.log(`Sampling ${label}.`);
        let numSamples = 0;
        sampler = setInterval(() => { 
            imgClassifier.addImage(`${label}`) 
            numSamples++;
            console.log(`${label}: ${numSamples} samples collected.`);
        }, interval);
    } else {
        clearInterval(sampler);
        sampler = null;
        console.log(`Done sampling ${label}.`)
    }
}

const run = () => {
    if (!predictor) {
        console.log(`Classificator started...`)
        predictor = setInterval(() => {
            imgClassifier.predict()
        }, interval);
    } else {
        clearInterval(predictor);
        predictor = null;
        console.log(`Classificator stopped.`)
    }
}

document.getElementById('addA').addEventListener('click', () => {
    sample('Class_A');
});


document.getElementById('addB').addEventListener('click', event => {
    sample('Class_B');
});

document.getElementById('train').addEventListener('click', event => {
    imgClassifier.train();
});

document.getElementById('run').addEventListener('click', event => {
    run();
});
