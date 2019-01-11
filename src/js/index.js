if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import ImageClassifier from './classes/ImageClassifier';
import createVideo from './createVideo';
import '../css/style.css';

const video = createVideo('videoElement');
const buttons = Array.from(document.querySelectorAll('button'));
let imgClassifier = new ImageClassifier(video);

const status = document.getElementById("status");

document.getElementById('addA').addEventListener('click', event => {
    imgClassifier.sample('Class_A', event.target.id);
});

document.getElementById('addB').addEventListener('click', event => {
    imgClassifier.sample('Class_B', event.target.id);
});

document.getElementById('train').addEventListener('click', event => {
    imgClassifier.train();
});

document.getElementById('run').addEventListener('click', event => {
    imgClassifier.predict();
});

document.getElementById('save').addEventListener('click', event => {
    imgClassifier.save();
});

document.getElementById('clear').addEventListener('click', event => {
    buttons.map(btn => btn.classList.add('disabled'));
    imgClassifier = new ImageClassifier(video);
});