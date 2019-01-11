import ml5 from 'ml5';

const status = document.getElementById("status");
const buttons = Array.from(document.querySelectorAll('button'));

class ImageClassifier {
    constructor(video) {
        this.modelIsReady = false;
        this.videoIsReady = false;
        this.hasTrainedModel = false;

        this.featureExtractor = ml5.featureExtractor('MobileNet', () => {
            status.textContent = 'MobileNet model loaded!!';
            this.modelIsReady = true;
            this.checkStatus();
        });

        this.classifier = this.featureExtractor.classification(video, () => {
            status.textContent = 'Video Ready!!';
            this.videoIsReady = true;
            this.checkStatus();
        })

        this.totalLoss = 0;
        this.sampler = null;
        this.predictor = null;
        this.interval = 50;
    }

    checkStatus() {
        if(this.modelIsReady && this.videoIsReady) {
            buttons.map(btn => {
                if (btn.id !== 'run') {
                    btn.classList.remove('disabled');
                }
            });
            status.textContent = 'Ready!!';
        }
    }

    addImage(label) {
        this.classifier.addImage(label);
    }

    sample(label, buttonId) {
        // deactivate all other buttons
        toggleButtons(buttonId, this.hasTrainedModel? '' : 'run');

        if(!this[label]) {
            this[label] = 0;
        }
        if (!this.sampler) {
            status.textContent = `Sampling ${label}.`;
            this.sampler = setInterval(() => {
                this.addImage(`${label}`)
                this[label]++;
                status.textContent = `${label}: ${this[label]} samples collected.`;
            }, this.interval);
        } else {
            clearInterval(this.sampler);
            this.sampler = null;
            status.textContent = `Done sampling ${label}.`;
        }
    }

    train() {
        if(this.classifier.hasAnyTrainedClass) {

            buttons.map(btn => btn.classList.add('disabled'));
            document.getElementById('train').classList.add('loading');
            
            status.textContent = `Training...`;
            this.classifier.train(lossValue => {
                if(lossValue) {
                    this.totalLoss = lossValue;
                    status.textContent = `Total loss is ${this.totalLoss}`;
                } else {
                    status.textContent = `Done!! Total loss is ${this.totalLoss}`;
                    this.hasTrainedModel = true;

                    buttons.map(btn => btn.classList.remove('disabled'));
                    document.getElementById('train').classList.remove('loading');
                }
            });
        } else {
            status.textContent = `Requires examples before training.`;
        }
    }

    predict() {
        toggleButtons(event.target.id);

        if (!this.predictor) {
            status.textContent = `Classificator started...`;
            this.predictor = setInterval(() => {
                this.classifier.classify((err, label) => {
                    if (err) {
                        console.error(err);
                    } else {
                        status.textContent = `Predicting... Object is: ${label}`;
                    }
                });
            }, this.interval);
        } else {
            clearInterval(this.predictor);
            this.predictor = null;
            status.textContent = `Classificator stopped!`;
        }
    }

    save() {
        const saveStatus = this.classifier.save();
        saveStatus.catch((err) => {
            status.textContent = `No model found`;
            console.error(err);
        });
    }
}

const toggleButtons = (...except) => {
    buttons.filter(btn => !except.includes(btn.id)).map(btn => {
        btn.classList.toggle('disabled');
    });
}

export default ImageClassifier;