let internal = 100;
let external = 400;
let up = false;
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;

var gifMaker = new CCapture({
	framerate: 60,
	verbose: true,
	format: 'gif',
	workersPath: './',
});

function setup() {
	createCanvas(200, 200);
	gifMaker.start();
	gifMaker.capture(document.getElementById('defaultCanvas0'));
}

function draw() {
	background(255);
	strokeWeight(0.5);
	translate(width / 2, height / 2);
	for (let angle = 0; angle < 360; angle += 1) {
		let n = map(noise(xoff, yoff, zoff), 0, 1, -500, 500);
		let ax = n + external * sin(angle);
		let ay = n + external * cos(angle);
		let bx = n + internal * sin(angle);
		let by = n + internal * cos(angle);
		line(ax, ay, bx, by);
		xoff += 0.0001;
		yoff += 0.0001;
	}
	zoff += 0.0001;
	gifMaker.capture(document.getElementById('defaultCanvas0'));
	if (frameCount === 10) {
		gifMaker.stop();
		gifMaker.save();
	}
}
