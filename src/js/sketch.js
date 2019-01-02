const sketch = p5 => {

    p5.setup = () => {
        p5.createCanvas(200, 200);
    };

    p5.draw = () => {
        p5.background(0);
        p5.ellipse(p5.width/2, p5.height/2, 100, 100);
    };
    
}

export default sketch;