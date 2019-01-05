import ml5 from 'ml5';

class ImageClassifier {
    constructor(video) {
        this.featureExtractor = ml5.featureExtractor('MobileNet', () => {
            document.getElementById("status").textContent = 'MobileNet model loaded!!';
        });

        this.classifier = this.featureExtractor.classification(video, () => {
            document.getElementById("status").textContent = 'Video Ready!!';
        })

        this.totalLoss = 0;
    }

    addImage(label) {
        this.classifier.addImage(label);
    }

    train() {
        this.classifier.train(lossValue => {
            if(lossValue) {
                this.totalLoss = lossValue;
                console.log(`Total loss is ${this.totalLoss}`);
            } else {
                console.log(`Done!! ${this.totalLoss}`);
            }

        });
    }

    predict() {
        this.classifier.classify((err, label) => {
            if (err) {
                console.error(err);
            } else {
                console.log(label);
            }
        });
    }
}

export default ImageClassifier;