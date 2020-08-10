let gifCapture = new CCapture( {
	framerate: 60,
	format: 'gif',
	workersPath: './js/',
	verbose: true
} );

function setup(){
	sketch = createCanvas(100,100)
	canvas = sketch.canvas;

}

function draw(){
	if (frameCount === 1) gifCapture.start()
	background(255)
	ellipse(frameCount%100,frameCount%100,frameCount%100)
	gifCapture.capture(canvas)
	if (frameCount === 20) {
		gifCapture.stop()
		gifCapture.save()
	}
}